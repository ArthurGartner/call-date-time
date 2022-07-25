<template>
  <div class="day-edit-container">
    <div class="header">
      <div class="date-text">{{ dateObject?.date.toDateString() }}</div>
      <div class="close-icon">
        <i class="bi bi-x" />
      </div>
    </div>
    <div class="content mt-2">
      <div class="hour-options">
        <div class="label">Work Hours:</div>
        <div class="hour-select"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DayEdit",
  props: {
    dateObject: Object,
  },
};
</script>
<style lang="scss" scoped>
.day-edit-container {
  position: absolute;
  height: 400px;
  width: 200px;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.1);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  z-index: 10;
  padding: 5px;

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;

    .close-icon {
      position: relative;
      width: 1rem;
      cursor: pointer;

      .bi {
        position: absolute;
        font-size: 2rem;
        right: -5px;
        top: -10px;
        margin-top: 0px;
      }
    }
  }

  .content {
    font-size: 1.1rem;
  }
}
</style>
