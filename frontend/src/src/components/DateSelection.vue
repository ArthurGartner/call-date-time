<template>
  <div class="date-selection-view">
    <div class="component-container d-flex">
      <div class="header d-flex justify-content-between">
        <div class="left-header">
          <DateSelectionHeader :dateObject="dateObject1" />
        </div>
        <div class="right-header">
          <DateSelectionHeader :dateObject="dateObject2" />
        </div>
      </div>
      <!-- Section for bottom, info portion of date selection component -->
      <div class="content d-flex justify-content-between">
        <DateSelectionIcon :dateObject="dateObject1" />
        <div class="middle-content mx-auto my-auto">
          <div v-if="!dateObject1" class=".noselection">
            <h3 class="text-center">No dates selected</h3>
            <p class="text-center">Select a date from the calendar</p>
          </div>
          <div v-if="dateObject1 && dateObject2" class="range-stats">
            <div>Total Hours: {{ calculateRangeInHours() }}</div>
            <div>Total Days: {{ calculateRangeInDays() }}</div>
            <div>Total Weekends: {{ calculateRangeInWeekends() }}</div>
          </div>
        </div>
        <DateSelectionIcon :dateObject="dateObject2" />
      </div>
    </div>
  </div>
</template>
<script>
import DateSelectionHeader from "./DateSelectionHeader.vue";
import DateSelectionIcon from "./DateSelectionDateIcon.vue";
export default {
  name: "date-selection",
  props: {
    dateObject1: Object,
    dateObject2: Object,
  },
  components: {
    DateSelectionHeader,
    DateSelectionIcon,
  },
  data() {
    return {
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    //Return the number of days that make up the range
    calculateRangeInDays() {
      if (this.dateObject1 && this.dateObject2) {
        let delta =
          this.dateObject2.date.getTime() - this.dateObject1.date.getTime();
        //Need to add one since we are treating start and end dates as inclusive.
        return Math.ceil(delta / (1000 * 3600 * 24)) + 1;
      }
    },
    calculateRangeInHours() {
      if (this.dateObject1 && this.dateObject2) {
        let delta =
          this.dateObject2.date.getTime() - this.dateObject1.date.getTime();
        //Need to add one since we are treating start and end dates as inclusive.
        return Math.ceil(delta / (1000 * 3600)) + 24;
      }
    },
    calculateRangeInWeekends() {
      let weekends = 0;
      for (
        var d = new Date(this.dateObject1.date);
        d <= this.dateObject2.date;
        d.setDate(d.getDate() + 1)
      ) {
        if (d.getDay() == 0 || d.getDay() == 6) {
          weekends++;
        }
      }

      return weekends / 2;
    },
  },
};
</script>
<style lang="scss" scoped>
.date-selection-view {
  .component-container {
    position: relative;
    height: 120px;
    width: 100%;
    background: var(--item-background);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header {
      background: linear-gradient(
        180deg,
        var(--cal-highlight-top) 0%,
        var(--cal-highlight-bottom) 100%
      );
      height: 30px;
      padding-left: 20px;
      padding-right: 20px;
      font-weight: 600;
    }

    .content {
      position: relative;
      flex-grow: 1;

      .middle-content {
        margin: 0px;

        .range-stats {
          font-size: 1rem;
        }

        h3 {
          margin-bottom: 0px;
        }

        p {
          color: var(--text-muted);
        }
      }
    }
  }
}
</style>
