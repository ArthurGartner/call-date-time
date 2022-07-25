//Returns working days within month
function getWorkingDaysInMonth(localCal, dateObject) {
  let startDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    1
  );
  let endDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    getTotalDaysInMonth(dateObject)
  );

  let workingDays = 0;

  //Iterate through working days, saturday and sunday are not working days
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6) {
      workingDays++;
    }
  }

  return workingDays;
}

//Returns total working hours for month
function getWorkingHoursInMonth(localCal, dateObject, workingHoursPerDay) {
  return getWorkingDaysInMonth(localCal, dateObject) * workingHoursPerDay;
}

//Return int of days 1-15 that are working days, inclusive
function getWorkingDaysInFirstHalf(localCal, dateObject) {
  let startDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    1
  );
  let endDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    15
  );

  let workingDays = 0;

  //Iterate through working days, saturday and sunday are not working days
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6) {
      workingDays++;
    }
  }

  return workingDays;
}

//Return int of total working hours within first half of given date object month
function getWorkingHoursInFirstHalf(localCal, dateObject, workingHoursPerDay) {
  return getWorkingDaysInFirstHalf(localCal, dateObject) * workingHoursPerDay;
}

//Returns number of working dats in second half of month
function getWorkingDaysInSecondHalf(localCal, dateObject) {
  let startDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    16
  );
  let endDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    getTotalDaysInMonth(dateObject)
  );

  let workingDays = 0;

  //Iterate through working days, saturday and sunday are not working days
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6) {
      workingDays++;
    }
  }

  return workingDays;
}

function getWorkingHoursInSecondHalf(localCal, dateObject, workingHoursPerDay) {
  return getWorkingDaysInSecondHalf(localCal, dateObject) * workingHoursPerDay;
}

//Returns number of working days that exist until end of the month, inclusive
function getWorkingDaysInRestOfMonth(localCal, dateObject) {
  let startDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    dateObject.date.getDate()
  );
  let endDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    getTotalDaysInMonth(dateObject)
  );

  let workingDays = 0;

  //Iterate through working days, saturday and sunday are not working days
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6) {
      workingDays++;
    }
  }

  return workingDays;
}

//Return number of working hours in rest of the month
function getWorkingHoursInRestOfMonth(
  localCal,
  dateObject,
  workingHoursPerDay
) {
  return getWorkingDaysInRestOfMonth(localCal, dateObject) * workingHoursPerDay;
}

//Takes in date object and returns last day of previous month
function getTotalDaysInMonth(dateObject) {
  const date = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth() + 1,
    0
  );
  return date.getDate();
}

//Takes a localCal object and determines whether date given is a holiday
function isDateHoliday(localCal, date) {
  if (localCal.has(date.toISOString().substring(0, 10))) {
    if (localCal.get(date.toISOString().substring(0, 10)).isHoliday) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//Gets total number of holidays in month as found in localCal object. Holidays count if they are on a work day.
function getNumOfHolidaysInMonth(localCal, dateObject) {
  let startDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    1
  );
  let endDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    getTotalDaysInMonth(dateObject)
  );

  let numOfHolidays = 0;
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6 && isDateHoliday(localCal, d)) {
      numOfHolidays++;
    }
  }
  return numOfHolidays;
}

//Returns num of holidays in rest of the month, inclusive
function getNumOfHolidaysInRestOfMonth(localCal, dateObject) {
  let startDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    dateObject.date.getDate()
  );
  let endDate = new Date(
    dateObject.date.getFullYear(),
    dateObject.date.getMonth(),
    getTotalDaysInMonth(dateObject)
  );

  let numOfHolidays = 0;
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6 && isDateHoliday(localCal, d)) {
      numOfHolidays++;
    }
  }
  return numOfHolidays;
}

function getHolidayHoursOfRestOfMonth(
  localCal,
  dateObject,
  workingHoursPerDay
) {
  return (
    getNumOfHolidaysInRestOfMonth(localCal, dateObject) * workingHoursPerDay
  );
}

//Returns number of holiday hours in month
function getNumOfHolidayHoursInMonth(localCal, dateObject, workingHoursPerDay) {
  return getNumOfHolidaysInMonth(localCal, dateObject) * workingHoursPerDay;
}

//Convert month num to string, 0 = January
function getMonthName(monthNum) {
  const date = new Date();
  date.setMonth(monthNum);
  const month = date.toLocaleString(undefined, { month: "long" });
  return month;
}

//Returns valid working days within given date range
function getWorkingDaysInRange(localCal, dateObject1, dateObject2) {
  let startDate = new Date(dateObject1.date);
  let endDate = new Date(dateObject2.date);

  let workingDays = 0;
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6) {
      workingDays++;
    }
  }
  return workingDays;
}

//Returns working hours for given range
function getWorkingHoursInRange(
  localCal,
  dateObject1,
  dateObject2,
  workingHoursPerDay
) {
  return (
    getWorkingDaysInRange(localCal, dateObject1, dateObject2) *
    workingHoursPerDay
  );
}

//Function to get holidays in range that fall on working days
function getNumOfHolidaysInRange(localCal, dateObject1, dateObject2) {
  let startDate = new Date(dateObject1.date);
  let endDate = new Date(dateObject2.date);

  let numOfHolidays = 0;
  for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() != 0 && d.getDay() != 6 && isDateHoliday(localCal, d)) {
      numOfHolidays++;
    }
  }
  return numOfHolidays;
}

//Returns hours for holidays in range
function getNumOfHolidayHoursInRange(
  localCal,
  dateObject1,
  dateObject2,
  workingHoursPerDay
) {
  return (
    getNumOfHolidaysInRange(localCal, dateObject1, dateObject2) *
    workingHoursPerDay
  );
}

exports.getTotalDaysInMonth = getTotalDaysInMonth;
exports.getWorkingDaysInMonth = getWorkingDaysInMonth;
exports.getWorkingHoursInMonth = getWorkingHoursInMonth;
exports.getWorkingDaysInFirstHalf = getWorkingDaysInFirstHalf;
exports.getWorkingHoursInFirstHalf = getWorkingHoursInFirstHalf;
exports.getWorkingDaysInSecondHalf = getWorkingDaysInSecondHalf;
exports.getWorkingHoursInSecondHalf = getWorkingHoursInSecondHalf;
exports.getNumOfHolidaysInMonth = getNumOfHolidaysInMonth;
exports.getNumOfHolidayHoursInMonth = getNumOfHolidayHoursInMonth;
exports.getMonthName = getMonthName;
exports.getWorkingDaysInRestOfMonth = getWorkingDaysInRestOfMonth;
exports.getWorkingHoursInRestOfMonth = getWorkingHoursInRestOfMonth;
exports.getNumOfHolidaysInRestOfMonth = getNumOfHolidaysInRestOfMonth;
exports.getHolidayHoursOfRestOfMonth = getHolidayHoursOfRestOfMonth;
exports.getWorkingDaysInRange = getWorkingDaysInRange;
exports.getWorkingHoursInRange = getWorkingHoursInRange;
exports.getNumOfHolidaysInRange = getNumOfHolidaysInRange;
exports.getNumOfHolidayHoursInRange = getNumOfHolidayHoursInRange;
