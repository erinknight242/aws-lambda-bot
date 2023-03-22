const { random, timeOfDay } = require('../utils/utils');

const helloRegex = /hello/i;
const whoRegex = /who are you?/i;

module.exports = (app) => {
  app.message(helloRegex, async ({ message, say }) => {
    const greetings = [
      `Hey there <@${message.user}>!`,
      `Good ${timeOfDay()}, <@${message.user}>!`,
      'Howdy!',
    ];

    await say(greetings[random(greetings.length)]);
  });

  app.message(whoRegex, async ({ say }) => {
    const botType = process.env.NODE_ENV !== 'development' ? 'AWS bot' : 'local bot';
    await say(botType);
  });
};
