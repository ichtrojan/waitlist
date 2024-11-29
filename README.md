# Waitlist (Notion)

This is a Vercel lambda function to collect waitlist emails to store in a notion database

## Get your Notion Keys

<img width="1436" alt="create integration" src="https://github.com/user-attachments/assets/74870f3b-d4e6-4e87-96f6-e97aa47097e2">

To get your Notion keys, head over to the [integrations page](https://www.notion.so/profile/integrations) and create a new integration

## Duplicate template

[![Duplicate Template](https://img.shields.io/badge/Duplicate_Template-blue?style=for-the-badge&logo=notion)](https://thenothing.notion.site/14daf7b5b54180ce8feecf873c62452d?v=14daf7b5b541816d9521000c0f735703&pvs=4)

Duplicate this template and head over [here](https://developers.notion.com/reference/retrieve-a-database) to know how to get your Database ID.

## Connect integration

<img width="1443" alt="connect integration" src="https://github.com/user-attachments/assets/4fcc4581-b554-4268-be19-d565471c34ff">

Once duplicated, connect your database to the integration you created earlier. Read more [here](https://developers.notion.com/docs/create-a-notion-integration#give-your-integration-page-permissions)

## Deploy to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/ichtrojan/waitlist)

>**NOTE ⚠️** </br>
> Don't forget to set you `NOTION_API_KEY` and `NOTION_DATABASE_ID` in your `.env` file when running locally 
> or in your project setting when running on vercel cloud
