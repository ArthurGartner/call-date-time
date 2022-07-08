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
        <div class="calendar-container">
          <Calendar @date-add="dateAdd" @date-remove="dateRemove" />
        </div>
        <DateSelection
          class="mt-3"
          :dateObject1="dateObject1"
          :dateObject2="dateObject2"
        />
      </div>
      <WorkingHours class="mt-3" />
    </div>
  </div>
</template>
<script>
import Calendar from "../components/Calendar.vue";
import PageHeader from "../components/PageHeader.vue";
import DateSelection from "../components/DateSelection.vue";
import WorkingHours from "../components/WorkingHoursSummary.vue";
export default {
  name: "WorkingHoursPublic-Page",
  components: {
    Calendar,
    PageHeader,
    DateSelection,
    WorkingHours,
  },
  data() {
    return {
      dateObject1: null,
      dateObject2: null,
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
    },
    dateRemove(dateObject) {
      if (this.dateObject1?.date.getTime() === dateObject?.date.getTime()) {
        this.dateObject1 = null;
      } else {
        this.dateObject2 = null;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.workinghoursview {
  height: 100%;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
}
</style>
