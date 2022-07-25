<template>
  <div class="date-stats">
    <div class="stats-header">
      <div class="icon-container">
        <i :class="icon"></i>
      </div>
      <div class="stats-name">{{ title }}</div>
    </div>
    <div class="stats-values">
      <div :key="stat" v-for="stat in stats">
        <div class="stat-row">
          <div class="labels">
            <div :class="[stat.type == 'total' ? 'main-total' : '', 'label']">
              {{ stat.label }}
            </div>
            <div class="sublabel">{{ stat.sublabel }}</div>
          </div>
          <div
            :class="[stat.type == 'total' ? 'main-total' : '', 'stat-values']"
          >
            {{ stat.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StatsInfo",
  props: {
    icon: String,
    title: String,
    stats: Object,
  },
};
</script>
<style lang="scss" scoped>
.date-stats {
  .stats-header {
    display: flex;
    font-size: 1.2rem;
    font-weight: 500;
    font-size: 1.3rem;
    .icon-container {
      width: 30px;
    }
    i {
      padding-right: 10px;
      margin-bottom: 0px;
    }
  }
}

.stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 400;
  .labels {
    .sublabel {
      font-size: 0.7rem;
      color: var(--text-muted);
      margin-top: -6px;
      font-weight: 500;
    }
  }
  .main-total {
    font-weight: 800;
  }
}

hr {
  width: 100%;
  margin-top: 0px;
  height: 2px;
  background-color: gray;
  opacity: 0.5;
}
</style>
