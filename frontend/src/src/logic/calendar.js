const data = require("./dates.json");
const curUSFederalHolidays = require("./federalHolidays");
//Loads working calendar for local storage
function localWorkingCalInit() {
  //Check if working cal in local storage exists

  //If not found then call api to load initial events
  //Assume API call would happen here... returns json

  return buildNewLocalCal(data.dates);
}

//Input string should follow format "XXXX-XX-XX" Returns converted date object
function convertDateStringToDate(dateString) {
  let stringArray = dateString.split("-");
  let newDate = new Date(
    parseInt(stringArray[0]),
    parseInt(stringArray[1], 10) - 1,
    parseInt(stringArray[2])
  );
  return newDate;
}

//Check whether two dates are the same, disregards time
function isSameDay(date1, date2) {
  if (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
}

//Builds new calendar from passed in events
function buildNewLocalCal(passedEvents) {
  const newCal = new Map();

  passedEvents.forEach((event) => {
    let dateObject = {
      eventName: event.name,
      eventDate: convertDateStringToDate(event.date),
      isHoliday: isFederalHoliday(event.name),
    };

    newCal.set(
      convertDateStringToDate(event.date).toISOString().substring(0, 10),
      dateObject
    );
  });

  return newCal;
}

//Determines whether event name is a federal holiday
function isFederalHoliday(eventName) {
  let parseName = eventName.replace(" (substitute)", "");
  if (curUSFederalHolidays.curUSFederalHolidays.includes(parseName)) {
    return true;
  } else {
    return false;
  }
}

exports.localWorkingCalInit = localWorkingCalInit;
exports.isSameDay = isSameDay;
