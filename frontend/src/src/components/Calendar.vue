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
          <CalBtn
            @btn-click="prevMonth"
            type="prev"
            class="prev-month-btn my-auto mx-3"
          />
          <div class="month">
            <h1>{{ getMonthName(selectedMonth) }}</h1>
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
    },
    //Decrements instance of month. Does not need parameters.
    prevMonth() {
      if (this.selectedMonth < 1) {
        this.selectedYear--;
        this.selectedMonth = 11;
      } else {
        this.selectedMonth--;
      }
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
.calendar {
  .main-cal-view {
    position: relative;
    max-height: 500px;
    max-width: 500px;
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

@media only screen and (max-width: 576px) {
  .calendar {
    background: green;

    .cal-nav {
      h1 {
        font-size: 1.2rem;
      }
    }

    .main-cal-view {
      height: auto;
      width: auto;
      .cal-header {
        .header-container {
          h1 {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 576px) {
  .calendar {
    .cal-nav {
      font-size: 0.2rem;
    }

    .main-cal-view {
      height: 400px;
      width: 400px;

      .cal-header {
        .header-container {
          .month {
            font-size: 0.5rem;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 767px) {
  .calendar {
    .main-cal-view {
      height: 450px;
      width: 450px;
    }
  }
}
@media only screen and (min-width: 991px) {
  .calendar {
    .main-cal-view {
      height: 400px;
      width: 400px;
    }
  }
}
@media only screen and (min-width: 1199px) {
  .calendar {
    .main-cal-view {
      height: 450px;
      width: 450px;
    }
  }
}
@media only screen and (min-width: 1399px) {
  .calendar {
    .main-cal-view {
      height: 500px;
      width: 500px;
    }
  }
}
</style>
