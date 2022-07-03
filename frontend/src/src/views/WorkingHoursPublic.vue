<template>
  <div class="workinghoursview">
    <div class="container">
      <PageHeader
        title="Calculate working hours"
        subtitle="Use the interactive calendar to help calculate working hours for various durations."
      />
      <div class="calendar-container">
        <Calendar class="mx-auto" />
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from "../components/Calendar.vue";
import PageHeader from "../components/PageHeader.vue";
export default {
  name: "WorkingHoursPublic-Page",
  components: {
    Calendar,
    PageHeader,
  },
};
</script>
<style scoped lang="scss">
.workinghoursview {
  height: 100%;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);

  .container {
    .calendar-container {
    }
  }
}
</style>
