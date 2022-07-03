<template>
  <div class="btn-container" @click="onClick()">
    <div v-if="type == 'prev'">
      <i class="bi bi-caret-left-fill"></i>
    </div>
    <div v-else>
      <i class="bi bi-caret-right-fill"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "CalBtn",
  props: {
    type: String,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>
<style scoped lang="scss">
.btn-container {
  height: 40px;
  width: 40px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 1.8rem;
  transition: all 0.25s;
  cursor: pointer;
  i {
    margin: auto;
  }

  &:hover {
    background: var(--background-color-secondary);
    color: #d33e2a;
  }
}
</style>
>
