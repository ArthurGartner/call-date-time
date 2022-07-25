<template>
  <div class="calendar">
    <div class="cal-nav">
      <h2 class="d-inline-block">{{ selectedYear }}</h2>
      <CalViewToggle :items="['Monthly', 'Yearly']" />
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
            <h2 class="my-auto">{{ getMonthName(selectedMonth) }}</h2>
          </div>
          <CalBtn @btn-click="nextMonth" class="next-month-btn my-auto mx-3" />
        </div>
        <div class="days-of-week">
          <!-- //Should be cleaned up -->
          <div v-for="(day, index) in days" :key="index">
            <p style="margin: 0px">{{ day }}</p>
          </div>
        </div>
      </div>
      <div class="days-view">
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
            <div
              v-if="dateObject.isEvent"
              :class="[
                'date-event',
                dateObject.isHoliday ? 'is-holiday' : 'is-event',
              ]"
            ></div>
            <div v-if="dateObject.isFirst" class="first-date"></div>
            <div v-if="dateObject.isSecond" class="second-date"></div>
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
            <div v-if="dateObject.isBetween" class="inbetween-date"></div>

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
import { localWorkingCalInit } from "@/logic/calendar";
import CalViewToggle from "./CalViewToggle.vue";
export default {
  name: "Calendar-Component",
  components: {
    CalBtn,
    CalViewToggle,
  },
  beforeMount() {
    //Load variable with localCal Map
    this.localCal = localWorkingCalInit();
  },
  props: {
    dateChanged: Object,
  },
  watch: {
    //Watch the datechanged property and update view when property is changed
    dateChanged: function (val) {
      //Update selected year and month to show calendar
      this.selectedYear = val.date.getFullYear();
      this.selectedMonth = val.date.getMonth();
      this.updateDateArray(this.selectedMonth, this.selectedYear);
    },
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
      localCal: null,
    };
  },
  mounted() {
    this.updateDateArrayCurrentSelection();
    this.$emit("local-cal", this.localCal);
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
      this.updateDateArray(this.selectedMonth, this.selectedYear);
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
          isFirst: false,
          isSecond: false,
          isCurDay: false,
          isBetween: false,
          isEvent: false,
          eventName: "",
          isHoliday: false,
        };

        //Check if date in dateObject is an Event according to passed Calendar
        if (
          this.localCal.has(
            customDateObject.date.toISOString().substring(0, 10)
          )
        ) {
          customDateObject.isEvent = true;
          customDateObject.eventName = this.localCal.get(
            customDateObject.date.toISOString().substring(0, 10)
          ).eventName;
          customDateObject.isHoliday = this.localCal.get(
            customDateObject.date.toISOString().substring(0, 10)
          ).isHoliday;
        }

        //Determine if this date is one of selected dates
        if (
          customDateObject.date.getTime() ===
            this.selectedDateObject1?.date.getTime() ||
          customDateObject.date.getTime() ===
            this.selectedDateObject2?.date.getTime()
        ) {
          customDateObject.isSelected = true;

          //Ineffecient way of getting which end of date range current object is at. Need to refractor.
          if (this.selectedDateObject1 && this.selectedDateObject2) {
            if (
              customDateObject.date.getTime() ===
              this.selectedDateObject1?.date.getTime()
            ) {
              if (
                this.selectedDateObject1?.date.getTime() <
                this.selectedDateObject2?.date.getTime()
              ) {
                customDateObject.isFirst = true;
              } else {
                customDateObject.isSecond = true;
              }
            } else {
              if (
                this.selectedDateObject2?.date.getTime() <
                this.selectedDateObject1?.date.getTime()
              ) {
                customDateObject.isFirst = true;
              } else {
                customDateObject.isSecond = true;
              }
            }
          }
        } else {
          //Check if date falls between 2 selected dates IF there are two dates selected
          if (this.selectedDateObject1 && this.selectedDateObject2) {
            if (
              (customDateObject.date > this.selectedDateObject1.date &&
                customDateObject.date < this.selectedDateObject2.date) ||
              (customDateObject.date < this.selectedDateObject1.date &&
                customDateObject.date > this.selectedDateObject2.date)
            ) {
              customDateObject.isBetween = true;
            }
          }
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

      //Update date objects array
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

      //Create temp date object to send to hour summary to indicate current month view
      let newDate = new Date(this.selectedYear, this.selectedMonth, 1);
      let newDateObject = {
        date: newDate,
      };
      this.$emit("new-month", newDateObject);
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

      //Create temp date object to send to hour summary to indicate current month view
      let newDate = {
        date: new Date(this.selectedYear, this.selectedMonth, 1),
      };
      this.$emit("new-month", newDate);
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
  .cal-nav {
    display: flex;
    justify-content: space-between;
    h2 {
      font-weight: 500;
    }
  }
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
      background: var(--cal-highlight-top);
      background: linear-gradient(
        180deg,
        var(--cal-highlight-top) 0%,
        var(--cal-highlight-bottom) 100%
      );
      height: auto;
      padding-top: 5px;
      padding-bottom: 5px;

      .days-of-week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
      }
    }

    .days-view {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

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
            background: var(--cal-highlight-top);
            background: linear-gradient(
              180deg,
              var(--cal-highlight-top) 0%,
              var(--cal-highlight-bottom) 100%
            );
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
            background: var(--cal-highlight-top);
            background: linear-gradient(
              180deg,
              var(--cal-selected-top) 0%,
              var(--cal-selected-bottom) 100%
            );
            border-radius: 1rem;
          }

          .inbetween-date {
            position: absolute;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            height: 1.8rem;
            background: var(--cal-highlight-top);
            background: linear-gradient(
              180deg,
              var(--cal-selected-top) 0%,
              var(--cal-selected-bottom) 100%
            );
            opacity: 10%;
          }
          .date-event {
            position: absolute;
            height: 0.3rem;
            width: 0.3rem;
            border-radius: 0.3rem;
            left: 0;
            right: 0;
            margin: auto;
            top: 15%;
            z-index: 3;
          }

          .is-holiday {
            background: var(--cal-holiday);
          }

          .is-event {
            background: var(--cal-event);
          }
          .first-date {
            position: absolute;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: 0;
            width: 50%;
            height: 1.8rem;
            background: var(--cal-highlight-top);
            background: linear-gradient(
              180deg,
              var(--cal-selected-top) 0%,
              var(--cal-selected-bottom) 100%
            );
            opacity: 10%;
          }
          .second-date {
            position: absolute;
            left: 0;
            right: 0;
            margin-left: 0;
            margin-right: auto;
            width: 50%;
            height: 1.8rem;
            background: var(--cal-highlight-top);
            background: linear-gradient(
              180deg,
              var(--cal-selected-top) 0%,
              var(--cal-selected-bottom) 100%
            );
            opacity: 10%;
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
        background: var(--cal-highlight-top);
        background: linear-gradient(
          180deg,
          var(--cal-highlight-top) 0%,
          var(--cal-highlight-bottom) 100%
        );
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
        background: var(--cal-highlight-top);
        background: linear-gradient(
          180deg,
          var(--cal-selected-top) 0%,
          var(--cal-selected-bottom) 100%
        );
        border-radius: 1rem;
      }
    }
  }
}
</style>
