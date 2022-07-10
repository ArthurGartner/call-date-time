<template>
  <div class="working-hours-public-view">
    <div class="header d-flex justify-content-between">
      <h2>Working Time</h2>
      <i class="bi bi-gear-fill"></i>
    </div>
    <hr />
    <div class="info-section">
      <div v-if="dateObject1 && dateObject2">
        In range: {{ getWorkingHoursInRange() }}
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
        Hours until end of month: {{ getWorkingHoursUntilEndOfMonth() }}
      </div>
      <div v-if="dateObject1 && !dateObject2">
        Days until end of month: {{ getWorkingDaysUntilEndOfMonth() }}
      </div>
      <div v-if="dateObject1 && dateObject2">
        Working days in range: {{ getWorkingDaysInRange() }}
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Working days in month: {{ getWorkingDaysInMonth() }} days
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Working days in days 1 to 15: {{ getWorkingDaysInFirstHalf() }} days
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Working days in days 16 to {{ getDaysInMonth() }}:
        {{ getWorkingDaysInSecondHalf() }} days
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
  },
  methods: {
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
        if (d.getDay() != 0 && d.getDay() != 6) {
          workingDays++;
        }
      }
      return workingDays;
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
        if (d.getDay() != 0 && d.getDay() != 6) {
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
        if (d.getDay() != 0 && d.getDay() != 6) {
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
        if (d.getDay() != 0 && d.getDay() != 6) {
          workingDays++;
        }
      }
      return workingDays;
    },
    getWorkingHoursUntilEndOfMonth() {
      return this.getWorkingDaysUntilEndOfMonth() * 8;
    },
    getWorkingHoursInMonth() {
      return this.getWorkingDaysInMonth() * 8;
    },
    getWorkingDaysInRange() {
      let startDate = new Date(this.dateObject1.date);
      let endDate = new Date(this.dateObject2.date);

      let workingDays = 0;
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6) {
          workingDays++;
        }
      }
      return workingDays;
    },
    getWorkingHoursInRange() {
      return this.getWorkingDaysInRange() * 8;
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
      color: var(--text-primary-color);
    }
    i {
      font-size: 1.5rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.25s;

      @media (hover: hover) {
        &:hover {
          color: var(--text-primary-color);
        }
      }
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
