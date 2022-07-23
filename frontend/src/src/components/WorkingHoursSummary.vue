<template>
  <div class="working-hours-public-view">
    <div class="header d-flex">
      <i class="bi bi-calculator"></i>
      <h2>Working Time</h2>
    </div>
    <hr />
    <div class="info-section">
      <div v-if="dateObject1 && dateObject2">
        Hours in range: {{ getWorkingHoursInRange() }} hours
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Hours in month: {{ getWorkingHoursInMonth() }} hours
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Hours in days 1 to 15: {{ getWorkingHoursInFirstHalf() }} hours
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Hours in days 16 to {{ getDaysInMonth() }}:
        {{ getWorkingHoursInSecondHalf() }} hours
      </div>
      <div v-if="dateObject1 && !dateObject2">
        Hours until end of month: {{ getWorkingHoursUntilEndOfMonth() }} hours
      </div>
      <div v-if="dateObject1 && !dateObject2">
        Days until end of month: {{ getWorkingDaysUntilEndOfMonth() }} days
      </div>
      <div v-if="dateObject1 && !dateObject2">
        Holidays before end of month: {{ getHolidaysUntilEndOfMonth() }} days
      </div>
      <div v-if="dateObject1 && !dateObject2">
        Holiday hours before end of month:
        {{ getHolidayHoursUntilEndfOfMonth() }} days
      </div>
      <div v-if="dateObject1 && dateObject2">
        Days in range: {{ getWorkingDaysInRange() }} days
      </div>
      <div v-if="dateObject1 && dateObject2">
        Holidays in range: {{ getHolidaysInRange() }} days
      </div>
      <div v-if="dateObject1 && dateObject2">
        Holiday hours in range: {{ getHolidayHoursInRange() }} hours
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Days in month: {{ getWorkingDaysInMonth() }} days
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Days in days 1 to 15: {{ getWorkingDaysInFirstHalf() }} days
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Days in days 16 to {{ getDaysInMonth() }}:
        {{ getWorkingDaysInSecondHalf() }} days
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Holidays in month: {{ getHolidaysInMonth() }} days
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Holiday Hours in month: {{ getHolidayHoursInMonth() }} hours
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Working-Hours-Public-View",
  props: {
    dateObject1: Object,
    dateObject2: Object,
    viewingDate: Object,
    localCal: Object,
  },
  //Methods should be refractored into single js file.
  methods: {
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
    height: 2px;
    background-color: gray;
    opacity: 0.5;
  }

  .info-section {
    font-size: 1.2rem;
  }
}
</style>
