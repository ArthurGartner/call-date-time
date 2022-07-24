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
        <i class="acc-btn-icon d-md-none bi bi-person-circle"></i>
      </div>
      <div class="login-options-list">
        <NavBarLink class="acc-link" name="Sign Up" link="signup" />
        <NavBarLink class="acc-link" name="Login" link="login" />
      </div>
    </div>
  </div>
</template>
<script>
import CustomButton from "./Button.vue";
import NavBarLink from "./NavBarLink.vue";

export default {
  name: "NavBarUserLinks",
  components: {
    CustomButton,
    NavBarLink,
  },
  mounted() {
    //Toggle for show/hide of nav items for small screen sizes
    function classToggle() {
      const nav = document.querySelector(".login-options-list");
      const accBtn = document.querySelector(".acc-btn");
      nav.classList.toggle("user-show");
      accBtn.classList.toggle("menu-open");
    }

    function closeMenu() {
      classToggle();
    }
    const nav = document.querySelector(".login-options-list");
    const accBtn = document.querySelector(".acc-btn-icon");

    const navLinks = document.querySelectorAll(".acc-link");
    navLinks.forEach((nav) => nav.addEventListener("click", closeMenu));

    document.querySelector(".acc-btn").addEventListener("click", classToggle);

    //Close account menu on click outside menu and toggle button
    document.addEventListener("click", function (event) {
      if (
        nav.classList.contains("user-show") &&
        !event.target.isEqualNode(nav) &&
        !event.target.isEqualNode(accBtn)
      ) {
        classToggle();
      }
    });
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
    position: relative;
    .acc-btn {
      height: 100%;
      font-size: 35px;
      color: var(--primary-blue);
      display: flex;
      align-items: flex-end;
      transition: all 0.1s linear;
      cursor: pointer;

      .bi {
        margin-bottom: -10px;
      }
    }

    .menu-open {
      color: var(--text-primary);
    }

    .login-options-list {
      padding: 10px;
      position: absolute;
      white-space: nowrap;
      top: 55px;
      right: 0px;
      width: auto;
      flex-direction: column;
      align-items: flex-end;
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.1);
      -webkit-backdrop-filter: blur(15px);
      backdrop-filter: blur(15px);

      h4 {
        padding: 0.5rem 1rem;
        cursor: pointer;
      }

      .signup-text {
        color: var(--primary-purple);
      }
      .login-text {
        color: var(--primary-blue);
      }
    }

    .login-options-list:not(.user-show) {
      display: none;
    }
  }
}

@media (hover: hover) {
  .user-nav-view {
    .not-logged-in {
      .acc-btn {
        &:hover {
          color: var(--text-primary);
        }
      }
    }
  }
}
</style>
