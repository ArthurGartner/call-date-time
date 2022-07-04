<template>
  <div class="date-selection-view">
    <div class="component-container d-flex">
      <div class="header">
        <div
          v-if="
            currentDay == curDateObject.date.getDate() &&
            currentMonth == curDateObject.date.getMonth() &&
            currentYear == curDateObject.date.getFullYear()
          "
        >
          <p>
            Today - {{ getMonthName(curDateObject.date.getMonth()) }}
            {{ curDateObject.date.getFullYear() }}
          </p>
        </div>
        <div v-else>
          <p>
            {{ getMonthName(curDateObject.date.getMonth()) }}
            {{ curDateObject.date.getFullYear() }}
          </p>
        </div>
      </div>
      <div class="content d-flex justify-content-between">
        <div class="date-image d-flex flex-column text-center align-middle">
          <div class="date-val d-flex flex-column">
            <div class="inline-block my-auto">
              {{ curDateObject.date.getDate() }}
            </div>
          </div>
          <div class="left-date"></div>
        </div>
        <div class="middle-content"></div>
        <div class="date-image d-flex flex-column text-center align-middle">
          <div class="date-val d-flex flex-column">
            <div class="inline-block my-auto">
              {{ curDateObject.date.getDate() }}
            </div>
          </div>
          <div class="left-date"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "date-selection",
  props: {
    curDateObject: Object,
  },
  data() {
    return {
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    loadDate(dateObject) {
      console.log(dateObject.date);
    },
    getMonthName(num) {
      const date = new Date();
      date.setMonth(num);
      const month = date.toLocaleString(undefined, { month: "long" });
      return month;
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
    background: var(--background-color-secondary);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header {
      background: var(--cal-highlight);
      height: 30px;
      padding-left: 20px;
      padding-right: 20px;
      font-weight: 600;
    }

    .content {
      position: relative;
      flex-grow: 1;
      .date-image {
        width: 80px;
        font-size: 2.7rem;
        position: relative;

        .middle-content {
          flex-grow: 1;
        }

        .date-val {
          z-index: 3;
          height: 100%;
          flex-grow: 1;
        }

        .left-date {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 4rem;
          height: 4rem;
          border: 3px solid var(--cal-highlight);
          border-radius: 2rem;
          z-index: 1;
        }
      }
    }
  }
}
</style>
