<template>
  <div class="nav-container">
    <div class="container">
      <div class="full-view">
        <div class="nav-link-list">
          <NavBarLink name="Homepage" link="/" />
          <NavBarLink name="About" link="about" />
          <NavBarLink name="Working Hours" link="workinghours" />
        </div>
        <div class="user-options"><NavBarUser /></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarLink from "./NavBarLink.vue";
import NavBarUser from "./NavBarUser.vue";
export default {
  name: "NavBar",
  components: {
    NavBarLink,
    NavBarUser,
  },
};
</script>
<style scoped lang="scss">
.nav-container {
  position: fixed;
  height: 70px;
  width: 100%;
  .container {
    height: 100%;
    .full-view {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .nav-link-list {
        height: 100%;
        display: flex;
        align-items: flex-end;
      }
      .user-options {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
