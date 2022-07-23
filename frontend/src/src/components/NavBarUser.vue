<template>
  <div class="user-nav-view">
    <div class="not-logged-in">
      <CustomButton
        class="d-none d-md-block"
        text="Sign Up"
        size="medium"
        color="purple"
      />
      <CustomButton
        class="d-none d-md-block"
        text="Login"
        size="medium"
        color="blue"
      />
      <div class="acc-btn">
        <i class="d-md-none bi bi-person-circle"></i>
      </div>
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
    .acc-btn {
      height: 100%;
      font-size: 35px;
      color: var(--primary-blue);
      display: flex;
      align-items: flex-end;
      transition: all 0.1s linear;
      cursor: pointer;

      &:hover {
        color: var(--text-primary);
      }
      .bi {
        margin-bottom: -10px;
      }
    }
  }
}
</style>
