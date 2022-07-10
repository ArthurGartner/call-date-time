<template>
  <div class="working-hours-public-view">
    <div class="header d-flex justify-content-between">
      <h2>Working Hours</h2>
      <i class="bi bi-gear-fill"></i>
    </div>
    <hr />
    <div class="info-section">
      <div v-if="dateObject1 && dateObject2">
        Working hours in range: {{ getWorkingHoursInRange() }}
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Working hours in month: {{ getWorkingHoursInMonth() }} hours
      </div>
      <div v-if="dateObject1 && !dateObject2">
        Working hours in selected week: N/A
      </div>
      <div v-if="dateObject1 && dateObject2">
        Working days in range: {{ getWorkingDaysInRange() }}
      </div>
      <div v-if="!dateObject1 && !dateObject2">
        Working days in month: {{ getWorkingDaysInMonth() }}
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
    getWorkingDaysInMonth() {
      let dateSelected;
      if (this.viewingDate) {
        dateSelected = this.viewingDate;
      } else {
        dateSelected = new Date();
      }

      let daysInMonth = this.getDaysInMonth(
        dateSelected.getFullYear(),
        dateSelected.getMonth()
      );
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
    getDaysInMonth(year, month) {
      //months use 0 index. January == 0
      const date = new Date(year, month + 1, 0);
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
