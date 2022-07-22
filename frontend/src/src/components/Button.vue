<template>
  <div :class="[color, 'btn-container']">
    <div v-if="size == 'medium'">
      <h5 class="medium">{{ text }}</h5>
    </div>
  </div>
</template>
<script>
export default {
  name: "BtnObj",
  props: {
    text: String,
    type: String,
    shape: String,
    size: String,
    color: String,
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  margin-left: 10px;
  border-radius: 8px;
  color: white;
  transition: all 0.1s linear;
  cursor: pointer;
  &:hover {
    background: var(--background-color-primary);
  }
  .medium {
    margin: 0px;
    padding: 5px;
  }
}

.blue {
  background: var(--primary-blue);
  border: 3px var(--primary-blue) solid;
  &:hover {
    color: var(--primary-blue);
  }
}

.purple {
  background: var(--primary-purple);
  border: 3px var(--primary-purple) solid;
  &:hover {
    color: var(--primary-purple);
  }
}
</style>
