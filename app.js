const { App, AwsLambdaReceiver } = require('@slack/bolt');
const cycleInfo = require('./src/scripts/cycleInfo');
const hello = require('./src/scripts/hello');
const magic8 = require('./src/scripts/magic8');
const whereIs = require('./src/scripts/whereIs');

/* 
This sample slack application uses SocketMode
For the companion getting started setup guide, 
see: https://slack.dev/bolt-js/tutorial/getting-started 
*/


const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');

  cycleInfo(app);
  hello(app);
  magic8(app);
  whereIs(app);
})();

module.exports.handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
}