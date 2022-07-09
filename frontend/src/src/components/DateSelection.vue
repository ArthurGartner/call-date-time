<template>
  <div class="date-selection-view">
    <div class="component-container d-flex">
      <div class="header d-flex justify-content-between">
        <div class="left-header">
          <DateSelectionHeader :dateObject="date1" />
        </div>
        <div class="right-header">
          <DateSelectionHeader :dateObject="date2" />
        </div>
      </div>
      <!-- Section for bottom, info portion of date selection component -->
      <div class="content d-flex justify-content-between">
        <DateSelectionIcon :dateObject="date1" />
        <div class="middle-content mx-auto my-auto">
          <div v-if="!date1" class=".noselection">
            <h3 class="text-center">No dates selected</h3>
            <p class="text-center">Select a date from the calendar</p>
          </div>
        </div>
        <DateSelectionIcon :dateObject="date2" />
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
  watch: {
    $props: {
      handler: function (val) {
        if (val.dateObject1 && val.dateObject2) {
          if (val.dateObject1.date < val.dateObject2.date) {
            this.date1 = this.dateObject1;
            this.date2 = this.dateObject2;
          } else {
            this.date2 = this.dateObject1;
            this.date1 = this.dateObject2;
          }
        } else if (val.dateObject1) {
          this.date1 = this.dateObject1;
          this.date2 = null;
        } else {
          this.date1 = null;
          this.date2 = null;
        }

        console.log("watch", val.dateObject1);
      },
      deep: true,
    },
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
      date1: null,
      date2: null,
    };
  },
  methods: {
    loadDate(dateObject) {
      console.log(dateObject.date);
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
