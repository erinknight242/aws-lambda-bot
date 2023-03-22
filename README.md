# aws-lambda-bot

Slack chat bot running on Node, built using the Slack Bolt javascript framework

## Development

### Prerequisites
- If you haven't already, install serverless with `npm install -g serverless`
- If you don't have ngrok, install with `choco install ngrok`


### Local Development

To run the bot locally, first clone the repo, then set the following environment variables:
- SLACK_BOT_TOKEN - this is found in the Slack API under OAuth & Permissions
- SLACK_SIGNING_SECRET - this is found in the Slack API under Signing Secret

#### Setting local env vars on Mac

On the terminal from the app's root directory once you have found the appropriate values, run:
`export SLACK_BOT_TOKEN=xoxb-tokenvalue`

`export SLACK_SIGNING_SECRET=signingsecretvalue`

#### Setting local env vars on Windows
On the terminal from the app's root directory once you have found the appropriate values, run:
`set SLACK_BOT_TOKEN=xoxb-tokenvalue`

`set SLACK_SIGNING_SECRET=signingsecretvalue`

### Running locally

It's recommended that you use [VS Code](https://code.visualstudio.com/) during local development.This will let you use [Prettier](https://prettier.io/) to keep formatting and syntax consistent when you save a file.

You can take advantage of a local development server (with hot reloading) to avoid restarting the app for every change:

```sh
# Don't use npm! Only use yarn: https://yarnpkg.com/en/
yarn install
serverless offline --noPrependStageInUrl
```

In a different admin console, run `ngrok http 3000`

Copy the ngrok local URL (looks like https://123-123-123.ngrok.io) and update the slack bot request and event URLs at api.slack.com
- Interactivity & Shortcuts > Request URL - paste the ngrok URL and save
- Event Subscriptions > Request URL - paste the {ngrok URL}/slack/events and save

#### Adding a new script
To add a new script/function to the bot, create a new script in the `src/scripts` folder. Then, in `app.js`, add a call to your new function to pass the app object into it.
