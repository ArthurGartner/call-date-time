<template>
  <div class="title-group">
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <div class="subtitle">
      <p class="mb-1">{{ subtitle }}</p>
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
  padding-top: 5px;
  color: var(--text-primary-color);

  .title {
    h2 {
      margin: 0px;
    }
  }
  .subtitle {
    color: var(--text-muted);

    p {
      font-size: 0.9rem;
      margin: 0px;
    }
  }
}
</style>
