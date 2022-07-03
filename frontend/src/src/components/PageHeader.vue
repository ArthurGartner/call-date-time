<template>
  <div class="title-group">
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <div class="subtitle">
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Page-Header",
  props: {
    title: String,
    subtitle: String,
  },
};
</script>
<style scoped lang="scss">
.title-group {
  padding-top: 20px;
  color: var(--text-primary-color);

  .subtitle {
    color: var(--text-muted);
  }
}
</style>
