import {VercelRequest, VercelResponse} from '@vercel/node';
import {Client} from '@notionhq/client';

const notion = new Client({auth: process.env.NOTION_API_KEY});
const databaseId = process.env.NOTION_DATABASE_ID as string;

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({message: 'Only POST requests are allowed'});
        return;
    }

    if (!req.body || typeof req.body !== 'object') {
        res.status(400).json({ message: 'invalid or missing request body'});
        return;
    }

    const {email}: { email?: string } = req.body;

    if (!email) {
        res.status(400).json({message: 'email is required.'});
        return;
    }

    const {isEmail} = require('validator');

    if (!isEmail(email)) {
        res.status(400).json({message: 'invalid email address.'});
        return;
    }

    const disposableDomains = require('disposable-email-domains');
    const isDisposableEmail = (email: string): boolean => {
        const domain = email.split('@')[1];
        return disposableDomains.includes(domain);
    };

    if (isDisposableEmail(email)) {
        res.status(400).json({message: 'disposable email addresses are not allowed.'});
    }

    try {
        const existingEntries = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Email',
                email: {equals: email},
            },
        });

        if (existingEntries.results.length > 0) {
            res.status(409).json({message: 'email already exists in the waitlist.'});
            return;
        }

        const ipAddress = req.headers['x-forwarded-for']?.toString()?.split(',')[0]?.trim() || req.connection.remoteAddress || 'Unknown IP';

        await notion.pages.create({
            parent: {database_id: databaseId},
            properties: {
                Title: {
                    title: [
                        {
                            text: { content: `${email} added to waitlist from ${ipAddress}` },
                        },
                    ],
                },
                Email: {email},
                'Date Added': {date: {start: new Date().toISOString()}},
            },
        });

        res.status(201).json({message: 'added to the waitlist successfully.'});
    } catch (error) {
        console.error('error adding to Notion:', error);
        res.status(500).json({message: 'failed to add to the waitlist.'});
    }
};
