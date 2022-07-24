<template>
  <div class="working-hours-public-view">
    <div class="header d-flex">
      <i class="bi bi-calculator"></i>
      <h2>Working Time</h2>
    </div>
    <hr />
    <div class="calc-section">
      <div class="row">
        <div class="col">
          <TimeCalcSummary
            icon="bi bi-clock-fill"
            title="Hours"
            :stats="hourStats"
          />
        </div>
        <div class="col">
          <TimeCalcSummary
            icon="bi bi-brightness-alt-high-fill"
            title="Days"
            :stats="dayStats"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6">
          <TimeCalcSummary :stats="holidayHourStats" />
        </div>
        <div class="col-6">
          <TimeCalcSummary
            icon="fa-solid fa-umbrella-beach"
            title="Holidays"
            :stats="holidayStats"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TimeCalcSummary from "./TimeCalcSummary.vue";
const workingHours = require("../logic/workingHours");
export default {
  name: "Working-Hours-Public-View",
  components: {
    TimeCalcSummary,
  },
  props: {
    dateObject1: Object,
    dateObject2: Object,
    viewingDate: Object,
    localCal: Object,
  },
  watch: {
    //Viewing date represents the current month that is being viewed.
    //Used to pull stats when there is no selection made.
    viewingDate: function () {
      this.updateStats();
    },
    dateObject1: function () {
      this.updateStats();
    },
    dateObject2: function () {
      this.updateStats();
    },
    localCal: function () {
      this.updateStats();
    },
  },
  data() {
    return {
      hourStats: null,
      dayStats: null,
      holidayStats: null,
      holidayHourStats: null,
    };
  },
  mounted() {
    this.updateStats();
  },
  //Methods should be refractored into single js file.
  methods: {
    convertStatsObject(label, sublabel, value) {
      return {
        label: label,
        sublabel: sublabel,
        value: value,
      };
    },
    updateStats() {
      const workingHoursInDay = 8;
      this.dayStats = null;
      this.hourStats = null;
      this.holidayStats = null;
      this.holidayHourStats = null;
      let newDayStats = [];
      let newHourStats = [];
      let newHolidayStats = [];
      let newHolidayHourStats = [];
      if (this.localCal) {
        //If neither date objects exist then viewing date is used
        if (!this.dateObject1 && !this.dateObject2) {
          newDayStats.push(
            this.convertStatsObject(
              "Month Total:",
              "Not including holidays",
              workingHours.getWorkingDaysInMonth(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() }
              )
            )
          );

          newDayStats.push(
            this.convertStatsObject(
              "Month First Half:",
              "Days 1 to 15 (inclusive)",
              workingHours.getWorkingDaysInFirstHalf(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() }
              )
            )
          );

          newDayStats.push(
            this.convertStatsObject(
              "Month Second Half:",
              `Days 16 to ${workingHours.getTotalDaysInMonth(
                this.viewingDate ? this.viewingDate : { date: new Date() }
              )} (inclusive)`,
              workingHours.getWorkingDaysInSecondHalf(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() }
              )
            )
          );

          newHourStats.push(
            this.convertStatsObject(
              "Month Total:",
              "Not including holidays",
              workingHours.getWorkingHoursInMonth(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() },
                workingHoursInDay
              )
            )
          );

          newHourStats.push(
            this.convertStatsObject(
              "Month First Half:",
              "Days 1 to 15 (inclusive)",
              workingHours.getWorkingHoursInFirstHalf(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() },
                workingHoursInDay
              )
            )
          );
          newHourStats.push(
            this.convertStatsObject(
              "Month Second Half:",
              `Days 16 to ${workingHours.getTotalDaysInMonth(
                this.viewingDate ? this.viewingDate : { date: new Date() }
              )} (inclusive)`,
              workingHours.getWorkingHoursInSecondHalf(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() },
                workingHoursInDay
              )
            )
          );

          newHolidayStats.push(
            this.convertStatsObject(
              "Month Total:",
              "",
              workingHours.getNumOfHolidaysInMonth(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() }
              )
            )
          );

          newHolidayHourStats.push(
            this.convertStatsObject(
              "Month Holiday Total:",
              "",
              workingHours.getNumOfHolidayHoursInMonth(
                this.localCal,
                this.viewingDate ? this.viewingDate : { date: new Date() },
                workingHoursInDay
              )
            )
          );
        } else if (this.dateObject1 && !this.dateObject2) {
          const viewDate = this.viewingDate
            ? this.viewingDate
            : { date: new Date() };
          newDayStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Viewing Month - ${workingHours.getMonthName(
                viewDate.date.getMonth()
              )} ${viewDate.date.getFullYear()}`,
              workingHours.getWorkingDaysInMonth(this.localCal, viewDate)
            )
          );

          newDayStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Selected Month - ${workingHours.getMonthName(
                this.dateObject1.date.getMonth()
              )} ${this.dateObject1.date.getFullYear()}`,
              workingHours.getWorkingDaysInMonth(
                this.localCal,
                this.dateObject1
              )
            )
          );

          newDayStats.push(
            this.convertStatsObject(
              "Rest of Month:",
              `Days ${this.dateObject1.date.getDate()} to ${workingHours.getTotalDaysInMonth(
                this.dateObject1
              )} (inclusive)`,
              workingHours.getWorkingDaysInRestOfMonth(
                this.localCal,
                this.dateObject1
              )
            )
          );

          newHourStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Viewing Month - ${workingHours.getMonthName(
                viewDate.date.getMonth()
              )} ${viewDate.date.getFullYear()}`,
              workingHours.getWorkingHoursInMonth(
                this.localCal,
                viewDate,
                workingHoursInDay
              )
            )
          );

          newHourStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Selected Month - ${workingHours.getMonthName(
                this.dateObject1.date.getMonth()
              )} ${this.dateObject1.date.getFullYear()}`,
              workingHours.getWorkingHoursInMonth(
                this.localCal,
                this.dateObject1,
                workingHoursInDay
              )
            )
          );

          newHourStats.push(
            this.convertStatsObject(
              "Rest of Month:",
              `Days ${this.dateObject1.date.getDate()} to ${workingHours.getTotalDaysInMonth(
                this.dateObject1
              )} (inclusive)`,
              workingHours.getWorkingHoursInRestOfMonth(
                this.localCal,
                this.dateObject1,
                workingHoursInDay
              )
            )
          );

          newHolidayStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Viewing Month - ${workingHours.getMonthName(
                viewDate.date.getMonth()
              )} ${viewDate.date.getFullYear()}`,
              workingHours.getNumOfHolidaysInMonth(this.localCal, viewDate)
            )
          );

          newHolidayStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Selected Month - ${workingHours.getMonthName(
                this.dateObject1.date.getMonth()
              )} ${this.dateObject1.date.getFullYear()}`,
              workingHours.getNumOfHolidaysInMonth(
                this.localCal,
                this.dateObject1
              )
            )
          );

          newHolidayStats.push(
            this.convertStatsObject(
              "Rest of Month:",
              `Days ${this.dateObject1.date.getDate()} to ${workingHours.getTotalDaysInMonth(
                this.dateObject1
              )} (inclusive)`,
              workingHours.getNumOfHolidaysInRestOfMonth(
                this.localCal,
                this.dateObject1
              )
            )
          );

          newHolidayHourStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Viewing Month - ${workingHours.getMonthName(
                viewDate.date.getMonth()
              )} ${viewDate.date.getFullYear()}`,
              workingHours.getNumOfHolidayHoursInMonth(
                this.localCal,
                viewDate,
                workingHoursInDay
              )
            )
          );

          newHolidayHourStats.push(
            this.convertStatsObject(
              "Month Total:",
              `Selected Month - ${workingHours.getMonthName(
                this.dateObject1.date.getMonth()
              )} ${this.dateObject1.date.getFullYear()}`,
              workingHours.getNumOfHolidayHoursInMonth(
                this.localCal,
                this.dateObject1,
                workingHoursInDay
              )
            )
          );

          newHolidayHourStats.push(
            this.convertStatsObject(
              "Rest of Month:",
              `Days ${this.dateObject1.date.getDate()} to ${workingHours.getTotalDaysInMonth(
                this.dateObject1
              )} (inclusive)`,
              workingHours.getHolidayHoursOfRestOfMonth(
                this.localCal,
                this.dateObject1,
                workingHoursInDay
              )
            )
          );
        }
      }
      this.dayStats = newDayStats;
      this.hourStats = newHourStats;
      this.holidayStats = newHolidayStats;
      this.holidayHourStats = newHolidayHourStats;
    },
    isDateHoliday(date) {
      if (this.localCal.has(date.toISOString().substring(0, 10))) {
        if (this.localCal.get(date.toISOString().substring(0, 10)).isHoliday) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    //Method that returns working days for entire month. If no month has been selected yet then the default month is
    //the current month as read by the client
    getWorkingDaysInMonth() {
      let dateSelected;
      if (this.viewingDate) {
        dateSelected = this.viewingDate;
      } else {
        dateSelected = new Date();
      }

      let daysInMonth = this.getDaysInMonth();
      let startDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        1
      );
      let endDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        daysInMonth
      );

      let workingDays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && !this.isDateHoliday(d)) {
          workingDays++;
        }
      }
      return workingDays;
    },
    getHolidaysInMonth() {
      let dateSelected;
      if (this.viewingDate) {
        dateSelected = this.viewingDate;
      } else {
        dateSelected = new Date();
      }

      let daysInMonth = this.getDaysInMonth();
      let startDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        1
      );
      let endDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        daysInMonth
      );

      let holidays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && this.isDateHoliday(d)) {
          holidays++;
        }
      }
      return holidays;
    },
    getHolidayHoursInMonth() {
      return this.getHolidaysInMonth() * 8;
    },
    getWorkingDaysInFirstHalf() {
      let dateSelected;
      if (this.viewingDate) {
        dateSelected = this.viewingDate;
      } else {
        dateSelected = new Date();
      }

      let startDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        1
      );
      let endDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        15
      );

      let workingDays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && !this.isDateHoliday(d)) {
          workingDays++;
        }
      }
      return workingDays;
    },
    getWorkingHoursInFirstHalf() {
      return this.getWorkingDaysInFirstHalf() * 8;
    },
    getWorkingDaysInSecondHalf() {
      let dateSelected;
      if (this.viewingDate) {
        dateSelected = this.viewingDate;
      } else {
        dateSelected = new Date();
      }

      let daysInMonth = this.getDaysInMonth();
      let startDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        16
      );
      let endDate = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth(),
        daysInMonth
      );

      let workingDays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && !this.isDateHoliday(d)) {
          workingDays++;
        }
      }
      return workingDays;
    },
    getWorkingHoursInSecondHalf() {
      return this.getWorkingDaysInSecondHalf() * 8;
    },
    //Takes selected date and returns working days from date to end of month. Inclusive
    getWorkingDaysUntilEndOfMonth() {
      const date = new Date(
        this.dateObject1.date.getFullYear(),
        this.dateObject1.date.getMonth() + 1,
        0
      );
      let daysInMonth = date.getDate();
      let startDate = new Date(this.dateObject1.date);
      let endDate = new Date(
        this.dateObject1.date.getFullYear(),
        this.dateObject1.date.getMonth(),
        daysInMonth
      );

      let workingDays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && !this.isDateHoliday(d)) {
          workingDays++;
        }
      }
      return workingDays;
    },
    getWorkingHoursUntilEndOfMonth() {
      return this.getWorkingDaysUntilEndOfMonth() * 8;
    },
    getHolidaysUntilEndOfMonth() {
      const date = new Date(
        this.dateObject1.date.getFullYear(),
        this.dateObject1.date.getMonth() + 1,
        0
      );
      let daysInMonth = date.getDate();
      let startDate = new Date(this.dateObject1.date);
      let endDate = new Date(
        this.dateObject1.date.getFullYear(),
        this.dateObject1.date.getMonth(),
        daysInMonth
      );

      let holidays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && this.isDateHoliday(d)) {
          holidays++;
        }
      }
      return holidays;
    },
    getHolidayHoursUntilEndfOfMonth() {
      return this.getHolidaysUntilEndOfMonth() * 8;
    },
    getWorkingHoursInMonth() {
      return this.getWorkingDaysInMonth() * 8;
    },
    getWorkingDaysInRange() {
      let startDate = new Date(this.dateObject1.date);
      let endDate = new Date(this.dateObject2.date);

      let workingDays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && !this.isDateHoliday(d)) {
          workingDays++;
        }
      }
      return workingDays;
    },
    getWorkingHoursInRange() {
      return this.getWorkingDaysInRange() * 8;
    },
    getHolidaysInRange() {
      let startDate = new Date(this.dateObject1.date);
      let endDate = new Date(this.dateObject2.date);

      let holidays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6 && this.isDateHoliday(d)) {
          holidays++;
        }
      }
      return holidays;
    },
    getHolidayHoursInRange() {
      return this.getHolidaysInRange() * 8;
    },
    getDaysInMonth() {
      let dateSelected;
      if (this.viewingDate) {
        dateSelected = this.viewingDate;
      } else {
        dateSelected = new Date();
      }
      //Using month + 1 with day as 0 looks ar previous months last day, so this is valid equation
      const date = new Date(
        dateSelected.getFullYear(),
        dateSelected.getMonth() + 1,
        0
      );
      return date.getDate();
    },
  },
};
</script>
<style scoped lang="scss">
.working-hours-public-view {
  .header {
    h2 {
      padding-top: 3px;
      color: var(--text-primary-color);
    }
    i {
      margin-right: 5px;
      font-size: 1.5rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.25s;
    }
  }
  hr {
    width: 100%;
    margin-top: -5px;
    margin-bottom: 5px;
    height: 2px;
    background-color: gray;
    opacity: 0.5;
  }

  .info-section {
    font-size: 1.2rem;
  }
}
</style>
