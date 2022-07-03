<template>
  <div class="workinghoursview">
    <div class="container">
      <Calendar />
    </div>
  </div>
</template>
<script>
import Calendar from "../components/Calendar.vue";
export default {
  name: "WorkingHoursPublic-Page",
  components: {
    Calendar,
  },
};
</script>
<style scoped>
.workinghoursview {
  height: 100%;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
}
</style>
