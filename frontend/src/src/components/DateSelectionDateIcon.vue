<template>
  <div class="date-container">
    <div
      @click="$emit('date-clicked')"
      @mouseup.right="showDayEditToggle"
      @contextmenu.prevent
      v-if="this.dateObject"
      class="date-image d-flex flex-column text-center align-middle"
    >
      <div class="date-val d-flex flex-column">
        <div
          :class="[
            'inline-block',
            'my-auto',
            this.dateObject?.isCurDay
              ? 'current-date-text'
              : 'not-current-date-text',
          ]"
        >
          {{ this.dateObject?.date.getDate() }}
        </div>
      </div>
      <div
        :class="[
          'date-background',
          this.dateObject.isCurDay ? 'current-date' : 'not-current-date',
        ]"
      ></div>
    </div>
    <DayEdit
      :dateObject="dateObject"
      class="day-edit-menu"
      @close-menu="showDayEditToggle"
      :open="openEditMenu"
    />
  </div>
</template>
<script>
import DayEdit from "./DayEdit.vue";
export default {
  name: "date-selection-date-icon",
  props: {
    dateObject: Object,
  },
  components: {
    DayEdit,
  },
  mounted() {
    let self = this;
    window.onload = function () {
      var MenuToggle = document.getElementsByClassName("date-container")[0];
      MenuToggle.style["-webkit-user-select"] = "none";
      MenuToggle.addEventListener("touchstart", Vanish);
      MenuToggle.addEventListener("touchend", VanishClear);
      var timer;
      function Vanish() {
        timer = setTimeout(function () {
          self.openEditMenu = true;
        }, 500);
      }
      function VanishClear() {
        clearTimeout(timer);
      }
    };
  },
  data() {
    return {
      openEditMenu: false,
    };
  },
  methods: {
    showDayEditToggle() {
      this.openEditMenu = !this.openEditMenu;
    },
    closeMenu() {
      this.openEditMenu = false;
    },
  },
};
</script>
<style scoped lang="scss">
.hide {
  display: none;
}
.day-edit-menu {
  top: 10px;
  left: 80px;
}

.date-container {
  display: flex;
  flex-direction: column;
}

.date-image {
  width: 80px;
  font-size: 2.7rem;
  position: relative;
  margin: auto;
  cursor: pointer;

  .date-val {
    z-index: 3;
    height: 100%;
    flex-grow: 1;
    color: var(--text-primary-color-inverse);
    // user-select: none;
    // -moz-user-select: none;
  }

  .date-background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    z-index: 1;
  }
}

.not-current-date {
  background: var(--cal-highlight-top);
  background: linear-gradient(
    180deg,
    var(--cal-selected-top) 0%,
    var(--cal-selected-bottom) 100%
  );
}
.current-date {
  background: linear-gradient(
    180deg,
    var(--cal-highlight-top) 0%,
    var(--cal-highlight-bottom) 100%
  );
}

.current-date-text {
  color: var(--text-primary-color);
}

.not-current-date-text {
  color: var(--text-primary-color-inverse);
}
</style>
