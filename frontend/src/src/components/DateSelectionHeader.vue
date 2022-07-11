<template>
  <div class="date-select-header">
    <div v-if="this.dateObject">
      <div v-if="this.dateObject?.isCurDay">
        <p>
          Today - {{ getMonthName(dateObject?.date.getMonth()) }}
          {{ dateObject?.date.getFullYear() }}
        </p>
      </div>
      <div v-else>
        <p>
          {{ getMonthName(dateObject?.date.getMonth()) }}
          {{ dateObject?.date.getFullYear() }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "date-selection-header",
  props: {
    dateObject: Object,
  },
  methods: {
    loadDate(dateObject) {
      console.log(dateObject.date);
    },
    getMonthName(num) {
      const date = new Date();
      date.setMonth(num);
      const month = date.toLocaleString(undefined, { month: "long" });
      return month;
    },
  },
};
</script>
