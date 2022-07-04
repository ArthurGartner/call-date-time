<template>
  <div class="workinghoursview">
    <div class="container">
      <div class="row">
        <PageHeader
          title="Calculate working hours"
          subtitle="Use the interactive calendar to help calculate working hours for various durations."
        />
      </div>
      <div class="row">
        <div class="calendar-container">
          <Calendar @date-clicked="dateClicked" />
        </div>
        <DateSelection class="mt-3" :curDateObject="curDateObject" />
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
      curDateObject: { date: new Date() },
    };
  },
  methods: {
    dateClicked(dateObject) {
      this.curDateObject = dateObject;
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
