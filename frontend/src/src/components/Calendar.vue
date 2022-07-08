<template>
  <div class="calendar">
    <div class="cal-nav text-center">
      <h1 class="d-inline-block">{{ selectedYear }}</h1>
    </div>
    <div class="main-cal-view">
      <div class="cal-header text-center">
        <div
          class="header-container text-center d-flex justify-content-between align-content-center"
        >
          <CalBtn
            @btn-click="prevMonth"
            type="prev"
            class="prev-month-btn my-auto mx-3"
          />
          <div class="month">
            <h1 class="my-auto">{{ getMonthName(selectedMonth) }}</h1>
          </div>
          <CalBtn @btn-click="nextMonth" class="next-month-btn my-auto mx-3" />
        </div>
      </div>
      <div class="days-view">
        <div class="days-of-week">
          <!-- //Should be cleaned up -->
          <div v-for="(day, index) in days" :key="index">
            <p>{{ day }}</p>
          </div>
        </div>
        <div class="individual-days">
          <div
            @click="prevMonth"
            class="prev-month-days"
            v-for="day in startDay(selectedMonth, selectedYear)"
            :key="day"
          >
            <p>
              {{
                getPrevMonthTrailing(selectedMonth, selectedYear) -
                startDay(selectedMonth, selectedYear) +
                day
              }}
            </p>
          </div>
          <div
            @click="dayClicked(dateObject)"
            :class="[
              'individual-day',
              dateObject.isCurDay ? 'current-day' : 'not-current-day',
            ]"
            v-for="dateObject in curMonthDateObjects"
            :key="dateObject.date.getDate()"
          >
            <!-- display for when current day is selected -->
            <div
              class="curday"
              v-if="dateObject.isSelected && dateObject.isCurDay"
            ></div>
            <!-- Display for days other than current day when selected -->
            <div
              v-if="dateObject.isSelected && !dateObject.isCurDay"
              class="selected-day"
            ></div>
            <div class="day-selection" />
            <p
              :class="[
                dateObject.isSelected && !dateObject.isCurDay
                  ? 'inverse-color'
                  : '',
                dateObject.isCurDay && dateObject.isSelected
                  ? 'selected-date-text-color'
                  : '',
              ]"
            >
              {{ dateObject.date.getDate() }}
            </p>
          </div>
          <div
            @click="nextMonth"
            class="next-month-days"
            v-for="date in getNextMonthLeading(selectedMonth, selectedYear)"
            :key="date"
          >
            <p>{{ date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CalBtn from "./CalBtn.vue";
export default {
  name: "Calendar-Component",
  components: {
    CalBtn,
  },
  data() {
    return {
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      curMonthDateObjects: [],
      selectedDateObject1: null,
      selectedDateObject2: null,
      pullBucket1: true,
    };
  },
  mounted() {
    this.updateDateArrayCurrentSelection();
  },
  methods: {
    //Handle date click
    dayClicked(dateObject) {
      //Toggle isSelected attribute for dateObject
      dateObject.isSelected = !dateObject.isSelected;

      //Add or remove from tracking
      if (dateObject.isSelected) {
        //Check which holding variable is up next for new date object assignment
        if (this.pullBucket1) {
          //Check to see if variable is already assigned. If so remove.
          if (this.selectedDateObject1) {
            this.selectedDateObject1.isSelected = false;
            this.$emit("date-remove", this.selectedDateObject1);
          }
          this.selectedDateObject1 = dateObject;
        } else {
          if (this.selectedDateObject2) {
            this.selectedDateObject2.isSelected = false;
            this.$emit("date-remove", this.selectedDateObject2);
          }

          this.selectedDateObject2 = dateObject;
        }
        this.$emit("date-add", dateObject);
        this.pullBucket1 = !this.pullBucket1;
      } else {
        if (
          this.selectedDateObject1?.date.getTime() ===
          dateObject?.date.getTime()
        ) {
          this.selectedDateObject1 = null;
          this.pullBucket1 = true;
        } else {
          this.selectedDateObject2 = null;
          this.pullBucket1 = false;
        }

        this.$emit("date-remove", dateObject);
      }

      //Need to analyze this
      this.updateDateArrayCurrentSelection();
    },
    updateDateArrayCurrentSelection() {
      this.updateDateArray(this.currentMonth, this.currentYear);
    },
    //Load days for current selected month into array and returns array of date objects
    updateDateArray(month, year) {
      let daysInMonth = this.getDaysInMonth(year, month);
      let startDate = new Date(year, month, 1);
      let endDate = new Date(year, month, daysInMonth);

      //Clean array

      let localArray = [];

      //Iterate through, saving each day to array. Build custom date object
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        let customDateObject = {
          date: new Date(d),
          info: "",
          isSelected: false,
          isCurDay: false,
        };

        //Determine if this date is one of selected dates
        if (
          customDateObject.date.getTime() ===
            this.selectedDateObject1?.date.getTime() ||
          customDateObject.date.getTime() ===
            this.selectedDateObject2?.date.getTime()
        ) {
          customDateObject.isSelected = true;
        }

        //Evaluate whether this date is the current date according to client time
        if (
          this.currentDay == customDateObject.date.getDate() &&
          this.currentMonth == customDateObject.date.getMonth() &&
          this.currentYear == customDateObject.date.getFullYear()
        ) {
          customDateObject.isCurDay = true;
        }

        localArray.push(customDateObject);
      }

      this.curMonthDateObjects = localArray;
    },
    getDaysInMonth(year, month) {
      //months use 0 index. January == 0
      const date = new Date(year, month + 1, 0);
      return date.getDate();
    },
    //Returns month name from num, use index == 0
    getMonthName(num) {
      const date = new Date();
      date.setMonth(num);
      const month = date.toLocaleString(undefined, { month: "long" });
      return month;
    },
    //Takes num of month, starting at 0
    startDay(numOfMonth, numOfYear) {
      const date = new Date(numOfYear, numOfMonth, 1);
      return date.getDay();
    },
    //Increments instance of month. Does not need parameters.
    nextMonth() {
      //Ensure that month value resets when month == 11 (December)
      if (this.selectedMonth > 10) {
        this.selectedYear++;
        this.selectedMonth = 0;
      } else {
        this.selectedMonth++;
      }

      this.updateDateArray(this.selectedMonth, this.selectedYear);
    },
    //Decrements instance of month. Does not need parameters.
    prevMonth() {
      if (this.selectedMonth < 1) {
        this.selectedYear--;
        this.selectedMonth = 11;
      } else {
        this.selectedMonth--;
      }
      this.updateDateArray(this.selectedMonth, this.selectedYear);
    },
    getPrevMonthTrailing(numOfMonth, numOfYear) {
      let prevMonthVal = numOfMonth;
      let yearVal = numOfYear;

      if (prevMonthVal < 1) {
        yearVal--;
        prevMonthVal = 11;
      } else {
        prevMonthVal--;
      }

      let prevMonthDays = this.getDaysInMonth(yearVal, prevMonthVal);
      return prevMonthDays;
    },
    getNextMonthLeading(numOfMonth, numOfYear) {
      let currentMonthStartDay = this.startDay(numOfMonth, numOfYear);
      let currentDaysInMonth = this.getDaysInMonth(numOfYear, numOfMonth);
      let result = 7 - ((currentMonthStartDay + (currentDaysInMonth % 7)) % 7);
      return result;
    },
  },
};
</script>
<style scoped lang="scss">
.test {
  background: rgba(128, 128, 128, 0.25);
}

.current-day {
  color: var(--cal-highlight);
}

.selected-date-text-color {
  color: var(--text-primary-color);
}

.calendar {
  width: 100%;
  .main-cal-view {
    position: relative;
    height: 300px;
    width: 100%;
    background: var(--item-background);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .cal-header {
      background: var(--cal-highlight);
      height: auto;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .days-view {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .days-of-week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        background: var(--cal-highlight);
      }

      .individual-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        height: 100%;

        .prev-month-days {
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          color: var(--text-muted);

          p {
            margin: 0;
            //top: 50%;
            //padding: 10px;
            z-index: 2;
          }
        }

        .next-month-days {
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          color: var(--text-muted);

          p {
            margin: 0;
            //top: 50%;
            //padding: 10px;
            z-index: 2;
          }
        }

        .individual-day {
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;

          .curday {
            position: absolute;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: 2rem;
            height: 2rem;
            background: var(--cal-highlight);
            border-radius: 1rem;
          }

          .selected-day {
            position: absolute;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: 2rem;
            height: 2rem;
            background: var(--text-primary-color);
            border-radius: 1rem;
          }

          p {
            margin: 0;
            //top: 50%;
            //padding: 10px;
            z-index: 2;
          }
        }
      }
    }
  }
}

.inverse-color {
  color: var(--text-primary-color-inverse);
}

@media (hover: hover) {
  .current-day {
    &:hover {
      color: var(--text-primary-color);

      .day-selection {
        position: absolute;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 2rem;
        height: 2rem;
        background: var(--cal-highlight);
        border-radius: 1rem;
      }
    }
  }

  .not-current-day {
    &:hover {
      color: var(--text-primary-color-inverse);

      .day-selection {
        position: absolute;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 2rem;
        height: 2rem;
        background: var(--text-primary-color);
        border-radius: 1rem;
      }
    }
  }
}
</style>
