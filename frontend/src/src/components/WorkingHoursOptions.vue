<template>
  <div class="working-hours-options">
    <div class="header">
      <h2>Options</h2>
      <hr />
    </div>
  </div>
</template>
<script>
export default {
  name: "Working-Hours-Options",
};
</script>
<style scoped lang="scss">
.working-hours-options {
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
