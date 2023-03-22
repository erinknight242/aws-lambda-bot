/**
 * Returns a random integer (zero-indexed)
 * @param  {Number} range Random number will be generated between 0 and range - 1. Defaults to 10.
 * @return {Number}       The random number
 */
const random = (range = 10) => {
  return Math.floor(Math.random() * range);
};

/**
 * Returns a string representing the time of day (morning | afternoon | evening)
 * @param {string} timeString Date.toLocaleTimeString formatted to a 2-digit hour
 * @returns {string}          The time of day
 */
const timeOfDay = (timeString = new Date().toLocaleTimeString([], { hour: '2-digit' })) => {
  const timeArray = timeString.split(' ');
  let hour = parseInt(timeArray[0]);
  if (timeArray.length === 2 && timeArray[1] === 'PM' && hour < 12) {
    hour += 12;
  }
  let timeOfDay = 'morning';

  if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon';
  } else if (hour > 17) {
    timeOfDay = 'evening';
  }

  return timeOfDay;
};

/**
 * Returns the text of the slack message after a mention
 * @param message    The message object from Slack
 * @returns {string} The text string of the message
 */
const getText = (message) => {
  return message.blocks[0].elements[0].elements[1].text?.trim();
};

module.exports = { random, timeOfDay, getText };