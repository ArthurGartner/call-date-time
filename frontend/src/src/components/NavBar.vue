<template>
  <div class="nav-container">
    <div class="container">
      <div class="view">
        <div class="nav-link-list">
          <NavBarLink class="nav-link" name="Homepage" link="/" />
          <NavBarLink class="nav-link" name="About" link="about" />
          <NavBarLink
            class="nav-link"
            name="Working Hours"
            link="workinghours"
          />
        </div>
        <div class="ham-menu">
          <HamIcon class="ham-menu-icon" />
        </div>
        <div class="user-options"><NavBarUser /></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarLink from "./NavBarLink.vue";
import NavBarUser from "./NavBarUser.vue";
import HamIcon from "./HamIcon.vue";
export default {
  name: "NavBar",
  components: {
    NavBarLink,
    NavBarUser,
    HamIcon,
  },
  mounted() {
    function classToggle() {
      const nav = document.querySelector(".nav-link-list");
      nav.classList.toggle("nav-show");
    }

    function closeMenu() {
      document.querySelector(".ham-menu-icon").classList.toggle("opened");
      classToggle();
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((nav) => nav.addEventListener("click", closeMenu));

    document.querySelector(".ham-menu").addEventListener("click", classToggle);
  },
};
</script>
<style lang="scss">
@media (min-width: 768px) {
  .nav-container {
    .container {
      .view {
        display: flex;
        justify-content: space-between;
        height: 100%;
        padding-top: 10px;
        background: transparent;

        .nav-link-list {
          height: 100%;
          display: flex;
          justify-content: flex-start;

          .nav-link {
            padding: 0px;
            margin-right: 20px;
          }
        }
        .ham-menu {
          display: none;
        }
      }

      .user-options {
        padding-bottom: 12px;
      }
    }
  }
}

@media (max-width: 767px) {
  .nav-show {
    display: flex;
  }

  .nav-container {
    height: 50px;

    .container {
      height: 100%;
      .view {
        display: flex;
        justify-content: space-between;
        height: 100%;
        padding-bottom: 10px;
        background: transparent;

        .nav-link-list {
          padding: 10px;
          position: absolute;
          height: auto;
          width: auto;
          flex-direction: column;
          align-items: flex-start;
          border-radius: 10px;
          margin-top: 55px;
          -webkit-backdrop-filter: blur(15px);
          backdrop-filter: blur(15px);
        }
        .nav-link-list:not(.nav-show) {
          display: none;
        }
        .ham-menu {
          height: 100%;
        }
      }
    }
  }
}

.nav-container::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
}

.nav-container {
  position: fixed;
  width: 100%;
  z-index: 100;
  background: rgba(128, 128, 128, 0.1);
}
</style>
