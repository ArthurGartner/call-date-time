<template>
  <div class="toggle-view-container">
    <div
      :class="[item == currentSelection ? 'selected' : '', 'toggle-option-btn']"
      :key="item"
      @click="itemClicked(item)"
      v-for="item in items"
    >
      {{ item }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ViewToggle",
  props: {
    items: Array,
  },
  data() {
    return {
      currentSelection: this.items[0],
    };
  },
  methods: {
    itemClicked(item) {
      this.currentSelection = item;
    },
  },
};
</script>
<style lang="scss" scoped>
.toggle-view-container {
  height: fit-content;
  display: flex;
  .toggle-option-btn {
    padding: 0px 3px;
    color: var(--text-primary-color);
    height: 100%;
    font-size: 1.2rem;
    font-weight: 500;
    transition: all 0.1s linear;
    cursor: pointer;
  }

  .toggle-option-btn:not(.selected) {
    background: var(--background-color-primary);
    color: var(--primary-blue);
  }

  .selected {
    background: var(--primary-blue);
    color: var(--background-color-primary);
    border-radius: 5px;
  }
}
</style>
