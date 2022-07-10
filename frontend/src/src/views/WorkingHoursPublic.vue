<template>
  <div class="workinghoursview">
    <div class="container">
      <div class="row">
        <PageHeader
          title="Working Hours"
          subtitle="Calculate working hours within custom ranges."
        />
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="calendar-container">
            <Calendar
              @date-add="dateAdd"
              @date-remove="dateRemove"
              @new-month="newMonth"
            />
          </div>
          <DateSelection
            class="mt-3"
            :dateObject1="dateArray[0]"
            :dateObject2="dateArray[1]"
          />
        </div>
        <div class="col-md-6">
          <WorkingHours
            class="mt-3 mt-md-0 working-hours"
            :dateObject1="dateArray[0]"
            :dateObject2="dateArray[1]"
            :viewingDate="viewingDate"
          />
          <Options class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from "../components/Calendar.vue";
import PageHeader from "../components/PageHeader.vue";
import DateSelection from "../components/DateSelection.vue";
import WorkingHours from "../components/WorkingHoursSummary.vue";
import Options from "../components/WorkingHoursOptions.vue";
export default {
  name: "WorkingHoursPublic-Page",
  components: {
    Calendar,
    PageHeader,
    DateSelection,
    WorkingHours,
    Options,
  },
  data() {
    return {
      dateObject1: null,
      dateObject2: null,
      dateArray: [null, null],
      viewingDate: null,
    };
  },
  methods: {
    //Find open slot to put passed date
    dateAdd(dateObject) {
      if (this.dateObject1) {
        this.dateObject2 = dateObject;
      } else {
        this.dateObject1 = dateObject;
      }
      this.sortDates();
    },
    dateRemove(dateObject) {
      if (this.dateObject1?.date.getTime() === dateObject?.date.getTime()) {
        this.dateObject1 = null;
      } else {
        this.dateObject2 = null;
      }
      this.sortDates();
    },
    sortDates() {
      this.dateArray = [this.dateObject1, this.dateObject2];
      this.dateArray.sort(this.compareDateObjects);
    },
    compareDateObjects(a, b) {
      if (a && !b) {
        return -1;
      } else if (!a && b) {
        return 1;
      } else if (a && b) {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      }

      return 0;
    },
    newMonth(monthData) {
      this.viewingDate = monthData;
    },
  },
};
</script>
<style scoped lang="scss">
.workinghoursview {
  height: 100%;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);

  .working-hours {
    @media (min-width: 768px) {
      height: 40vh;
    }
  }
}
</style>
