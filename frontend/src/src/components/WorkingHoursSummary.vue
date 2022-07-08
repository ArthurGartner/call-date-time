<template>
  <div class="working-hours-public-view">
    <div class="header">
      <h2>Working Hours</h2>
      <hr />
    </div>
  </div>
</template>
<script>
export default {
  name: "Working-Hours-Public-View",
};
</script>
<style scoped lang="scss">
.working-hours-public-view {
  height: 300px;
  .header {
    h2 {
      color: var(--text-primary-color);
    }
    hr {
      width: 100%;
      margin-top: -5px;
      height: 2px;
      background-color: gray;
      opacity: 0.5;
    }
  }
}
</style>
