<template>
  <div class="calendar">
    <div class="cal-nav text-center">
      <h1>{{ selectedYear }}</h1>
    </div>
    <div class="main-cal-view">
      <div class="cal-header text-center">
        <div
          class="header-container text-center d-flex justify-content-between align-content-center"
        >
          <CalBtn @btn-click="prevMonth" type="prev" class="my-auto mx-3" />
          <div class="month">
            <h1>{{ getMonthName(selectedMonth) }}</h1>
          </div>
          <CalBtn @btn-click="nextMonth" class="my-auto mx-3" />
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
            v-for="day in startDay(selectedMonth)"
            :key="day"
          >
            <p>
              {{ getPrevMonthTrailing() - startDay(selectedMonth) + day }}
            </p>
          </div>
          <div
            class="individual-day"
            v-for="date in getDaysInMonth(selectedYear, selectedMonth)"
            :key="date"
          >
            <div class="day-selection" />
            <p>{{ date }}</p>
          </div>
          <div
            @click="nextMonth"
            class="next-month-days"
            v-for="date in getNextMonthLeading()"
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
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  methods: {
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
    startDay(num) {
      const date = new Date(this.selectedYear, num, 1);
      return date.getDay();
    },
    nextMonth() {
      //Ensure that month value resets when month == 11 (December)
      if (this.selectedMonth > 10) {
        this.selectedYear++;
        this.selectedMonth = 0;
      } else {
        this.selectedMonth++;
      }
    },
    prevMonth() {
      if (this.selectedMonth < 1) {
        this.selectedYear--;
        this.selectedMonth = 11;
      } else {
        this.selectedMonth--;
      }
    },
    getPrevMonthTrailing() {
      let prevMonthVal = this.selectedMonth;
      let yearVal = this.selectedYear;

      if (this.selectedMonth < 1) {
        yearVal--;
        prevMonthVal = 11;
      } else {
        prevMonthVal--;
      }

      let prevMonthDays = this.getDaysInMonth(yearVal, prevMonthVal);
      return prevMonthDays;
    },
    getNextMonthLeading() {
      let currentMonthStartDay = this.startDay(this.selectedMonth);
      let currentDaysInMonth = this.getDaysInMonth(
        this.selectedYear,
        this.selectedMonth
      );
      let result = 7 - ((currentMonthStartDay + (currentDaysInMonth % 7)) % 7);
      return result;
    },
  },
};
</script>
<style scoped lang="scss">
.calendar {
  height: 500px;
  width: 500px;

  .main-cal-view {
    position: relative;
    height: 500px;
    width: 500px;
    background: var(--background-color-secondary);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .cal-header {
      background: #d33e2a;
      height: auto;
      width: 100%;
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
        background: #d33e2a;
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
            top: 50%;
            padding: 10px;
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
            top: 50%;
            padding: 10px;
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
          &:hover {
            .day-selection {
              position: absolute;
              left: 0;
              right: 0;
              margin-left: auto;
              margin-right: auto;
              width: 2rem;
              height: 2rem;
              background: #d33e2a;
              border-radius: 1rem;
            }
          }

          p {
            margin: 0;
            top: 50%;
            padding: 10px;
            z-index: 2;
          }
        }
      }
    }
  }
}
</style>
