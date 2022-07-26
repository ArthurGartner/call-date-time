<template>
  <div :class="[open ? '' : 'hide', 'day-edit-container']">
    <div class="header">
      <div class="date-text">{{ dateObject?.date.toDateString() }}</div>
      <div class="close-icon" @click="$emit('close-menu')">
        <i class="bi bi-x" />
      </div>
    </div>
    <div class="content mt-2">
      <div class="hour-options">
        <div class="label">Work Hours:</div>
        <div class="hour-select"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DayEdit",
  props: {
    dateObject: Object,
    open: Boolean,
  },
  mounted() {
    const menu = document.querySelector(".day-edit-container");

    let self = this;

    //Close account menu on click outside menu and toggle button
    document.addEventListener("click", function (event) {
      if (!menu.classList.contains("hide") && !menu.contains(event.target)) {
        self.$emit("close-menu");
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.hide {
  display: none;
}
.day-edit-container {
  position: absolute;
  height: auto;
  min-width: 200px;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.1);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  z-index: 10;
  padding: 5px;

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;

    .close-icon {
      position: relative;
      width: 1rem;
      cursor: pointer;

      .bi {
        position: absolute;
        font-size: 2rem;
        right: -5px;
        top: -10px;
        margin-top: 0px;
        transition: color 0.1s linear;

        @media (hover: hover) {
          &:hover {
            color: var(--primary-red);
          }
        }
      }
    }
  }

  .content {
    font-size: 1.1rem;
  }
}
</style>
