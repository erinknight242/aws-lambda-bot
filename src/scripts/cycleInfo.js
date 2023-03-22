// Ideally, move this to notion so it can be maintained by PMs outside of code
const tempData = () => {
  return [
    { name: 'Build Cycle 1', startDate: '10/17/22', endDate: '12/2/22' },
    { name: 'Cycle 1 Cool Down', startDate: '12/5/22', endDate: '1/6/23' },
    { name: 'Build Cycle 2', startDate: '1/9/23', endDate: '2/17/23' },
    { name: 'Cycle 2 Cool Down', startDate: '2/20/23', endDate: '3/10/23' },
    { name: 'Build Cycle 3', startDate: '3/13/23', endDate: '4/21/23' },
    { name: 'Cycle 3 Cool Down', startDate: '4/24/23', endDate: '5/5/23' },
  ];
};

module.exports = (app) => {
  // Handle the slash command for /cycle [with an optional future date]
  app.command('/cycle', async ({ command, ack, say }) => {
    try {
      await ack();
      say(cycleInfoReply(command.text));
    } catch (error) {
      console.error(error);
    }
  });

  app.message(/cycle status/i, async ({ say }) => {
    const date = new Date().setHours(0, 0, 0, 0);
    const output = cycleStatusReply(date);
    say(output);
  });

  app.event('app_mention', async ({ event, say }) => {
    try {
      // Bot name tagged with the word cycle, respond with the cycle description (as long as they didn't say cycle status)
      if (event.text.search(/cycle(?! status)/gi) > -1) {
        say(cycleInfoReply(''));
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const cycleStatusReply = (date) => {
  const cycleDates = getDateBounds(date);
  let output = '';
  if (cycleDates.left === null) {
    // before the calendar starts
    output = "Build cycles haven't started yet";
  } else if (cycleDates.right === null && cycleDates.left === tempData().length - 1) {
    // after the calendar ends
    output = "Build cycles haven't been defined for today's date";
  } else if (cycleDates.left !== cycleDates.right) {
    // on a weekend between build cycles
    output = `Enjoy your weekend! ${tempData()[cycleDates.left + 1].name} will start on ${
      tempData()[cycleDates.left + 1].startDate
    }`;
  } else {
    // in a normal build cycle
    const cycleEndDate = new Date(tempData()[cycleDates.right].endDate).setHours(0, 0, 0, 0);
    if (cycleEndDate === date) {
      output = `It's the last day of the cycle! ${
        tempData()[cycleDates.left + 1].name
      } will start on ${tempData()[cycleDates.left + 1].startDate}`;
    } else {
      const businessDays = getWeekdaysCount(date, cycleEndDate);
      output = `${businessDays} work days left in ${tempData()[cycleDates.right].name}`;
    }
  }
  return output;
};

const cycleInfoReply = (string) => {
  let date;
  let output = '';
  const today = new Date().setHours(0, 0, 0, 0);
  if (string !== '') {
    const displayToday = new Date(string);
    date = new Date(string).setHours(0, 0, 0, 0);
    output = `On ${displayToday.toLocaleDateString()}, we `;
    if (date > today) {
      output += 'will be in ';
    } else if (date < today) {
      output += 'were in ';
    } else {
      output += 'are in ';
    }
  } else {
    date = today;
    output = `We are in `;
  }

  const cycleDates = getDateBounds(date);

  if (cycleDates.left === null) {
    // before the calendar starts
    output += 'the before times.';
  } else if (cycleDates.right === null && cycleDates.left === tempData().length - 1) {
    // after the calendar ends
    output += 'undefined territory.';
  } else if (cycleDates.left !== cycleDates.right) {
    // on a weekend between build cycles
    output += `between build cycles. ${tempData()[cycleDates.left + 1].name} will start on ${
      tempData()[cycleDates.left + 1].startDate
    }`;
  } else {
    // in a normal build cycle
    output += `${tempData()[cycleDates.left].name} until ${tempData()[cycleDates.left].endDate}`;
  }

  return output;
};

const getWeekdaysCount = (startDateString, endDateString) => {
  let count = 0;
  const curDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

const getDateBounds = (date) => {
  let left = null;
  let right = null;
  for (let i = 0; i < tempData().length; i++) {
    const checkStart = new Date(tempData()[i].startDate).setHours(0, 0, 0, 0);
    const checkEnd = new Date(tempData()[i].endDate).setHours(0, 0, 0, 0);
    if (checkStart > date) {
      break;
    }
    if (checkStart <= date) {
      left = i;
    }
    if (checkEnd >= date) {
      right = i;
    }
  }
  return {
    left,
    right,
  };
};
