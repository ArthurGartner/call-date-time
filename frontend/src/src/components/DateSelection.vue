<template>
  <div class="date-selection-view">
    <div class="component-container d-flex">
      <div class="header d-flex justify-content-between">
        <!-- Section for left header, shows date and year for selection -->
        <div class="left-header">
          <!-- Check if this dateobject exists -->
          <div v-if="dateObject1">
            <div
              v-if="
                currentDay == this.dateObject1?.date.getDate() &&
                currentMonth == dateObject1?.date.getMonth() &&
                currentYear == dateObject1?.date.getFullYear()
              "
            >
              <p>
                Today - {{ getMonthName(dateObject1?.date.getMonth()) }}
                {{ dateObject1?.date.getFullYear() }}
              </p>
            </div>
            <div v-else>
              <p>
                {{ getMonthName(dateObject1?.date.getMonth()) }}
                {{ dateObject1?.date.getFullYear() }}
              </p>
            </div>
          </div>
        </div>
        <div class="right-header">
          <!-- Check if dateobject exists for second variable -->
          <div v-if="dateObject2">
            <p>
              {{ getMonthName(dateObject2?.date.getMonth()) }}
              {{ dateObject2?.date.getFullYear() }}
            </p>
          </div>
        </div>
      </div>
      <!-- Section for bottom, info portion of date selection component -->
      <div class="content d-flex justify-content-between">
        <div
          v-if="dateObject1"
          class="date-image d-flex flex-column text-center align-middle"
        >
          <div class="date-val d-flex flex-column">
            <div
              :class="[
                'inline-block',
                'my-auto',
                dateObject1.isCurDay
                  ? 'current-date-text'
                  : 'not-current-date-text',
              ]"
            >
              {{ dateObject1?.date.getDate() }}
            </div>
          </div>
          <div
            :class="[
              'date-background',
              dateObject1.isCurDay ? 'current-date' : 'not-current-date',
            ]"
          ></div>
        </div>
        <div class="middle-content mx-auto my-auto">
          <div v-if="!dateObject1" class=".noselection">
            <h3>No dates selected</h3>
            <p class="text-center">Select a date above</p>
          </div>
        </div>
        <div
          v-if="dateObject2"
          class="date-image d-flex flex-column text-center align-middle"
        >
          <div class="date-val d-flex flex-column">
            <div
              :class="[
                'inline-block',
                'my-auto',
                dateObject2.isCurDay
                  ? 'current-date-text'
                  : 'not-current-date-text',
              ]"
            >
              {{ dateObject2?.date.getDate() }}
            </div>
          </div>
          <div
            :class="[
              'date-background',
              dateObject2.isCurDay ? 'current-date' : 'not-current-date',
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "date-selection",
  props: {
    dateObject1: Object,
    dateObject2: Object,
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
.not-current-date {
  background: var(--text-primary-color);
}
.current-date {
  background: var(--cal-highlight);
}

.current-date-text {
  color: var(--text-primary-color);
}

.not-current-date-text {
  color: var(--text-primary-color-inverse);
}
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

        .date-val {
          z-index: 3;
          height: 100%;
          flex-grow: 1;
          color: var(--text-primary-color-inverse);
        }

        .date-background {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 4rem;
          height: 4rem;
          border-radius: 2rem;
          z-index: 1;
        }
      }

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
