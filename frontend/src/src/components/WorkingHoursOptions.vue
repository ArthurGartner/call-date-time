<template>
  <div id="calendar-options" class="working-hours-options">
    <div class="header d-flex">
      <i class="bi bi-gear-fill"></i>
      <h2>Options</h2>
    </div>
    <hr />
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
      padding-top: 3px;
      color: var(--text-primary-color);
    }
    i {
      margin-right: 5px;
      font-size: 1.5rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.25s;
    }
  }
  hr {
    width: 100%;
    margin-top: -5px;
    height: 2px;
    background-color: gray;
    opacity: 0.5;
  }
}
</style>
