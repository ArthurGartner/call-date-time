<template>
  <div class="user-nav-view">
    <div class="not-logged-in">
      <CustomButton text="Sign Up" size="medium" color="purple" />
      <CustomButton text="Login" size="medium" color="blue" />
    </div>
  </div>
</template>
<script>
import CustomButton from "./Button.vue";
export default {
  name: "NavBarUserLinks",
  components: {
    CustomButton,
  },
};
</script>
<style lang="scss" scoped>
.user-nav-view {
  height: 100%;
  .not-logged-in {
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
}
</style>
