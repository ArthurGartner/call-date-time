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
  background: rgb(76, 162, 255);
  background: linear-gradient(
    180deg,
    rgba(76, 162, 255, 1) 0%,
    rgba(25, 100, 176, 1) 100%
  );
  border-radius: 25px;
  color: #fff;
}
</style>
