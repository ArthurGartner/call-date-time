//Returns working days within month
function getWorkingDaysInMonth(dateObject) {
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
function getWorkingHoursInMonth(dateObject, workingHoursPerDay) {
  return getWorkingDaysInMonth(dateObject) * workingHoursPerDay;
}

//Return int of days 1-15 that are working days, inclusive
function getWorkingDaysInFirstHalf(dateObject) {
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
function getWorkingHoursInFirstHalf(dateObject, workingHoursPerDay) {
  return getWorkingDaysInFirstHalf(dateObject) * workingHoursPerDay;
}

//Returns number of working dats in second half of month
function getWorkingDaysInSecondHalf(dateObject) {
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

function getWorkingHoursInSecondHalf(dateObject, workingHoursPerDay) {
  return getWorkingDaysInSecondHalf(dateObject) * workingHoursPerDay;
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

//Returns number of holiday hours in month
function getNumOfHolidayHoursInMonth(localCal, dateObject, workingHoursPerDay) {
  return getNumOfHolidaysInMonth(localCal, dateObject) * workingHoursPerDay;
}

//Function that returns the
// function getWorkingDaysUntilEndOfMonth(dateObject) {}

exports.getTotalDaysInMonth = getTotalDaysInMonth;
exports.getWorkingDaysInMonth = getWorkingDaysInMonth;
exports.getWorkingHoursInMonth = getWorkingHoursInMonth;
exports.getWorkingDaysInFirstHalf = getWorkingDaysInFirstHalf;
exports.getWorkingHoursInFirstHalf = getWorkingHoursInFirstHalf;
exports.getWorkingDaysInSecondHalf = getWorkingDaysInSecondHalf;
exports.getWorkingHoursInSecondHalf = getWorkingHoursInSecondHalf;
exports.getNumOfHolidaysInMonth = getNumOfHolidaysInMonth;
exports.getNumOfHolidayHoursInMonth = getNumOfHolidayHoursInMonth;
