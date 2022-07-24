<template>
  <div class="link-btn-container">
    <p class="text-center pt-2 pb-2">{{ text }}</p>
  </div>
</template>
<script>
export default {
  name: "LinkBtn",
  props: {
    text: String,
  },
};
</script>
<style lang="scss" scoped>
.link-btn-container {
  width: 100%;
  background: #0a84ff;
  border-radius: 25px;
  color: #fff;
}
</style>
