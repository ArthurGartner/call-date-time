<template>
  <div class="nav-container container-fluid">
    <div class="container">
      <nav class="navbar-expand-lg">
        <div class="nav-items-container">
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
            aria-controls="navmenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div
            class="collapse navbar-collapse d-lg-flex flex-row-reverse"
            id="navmenu"
          >
            <div class="navbar-nav">
              <!-- <router-link to="/" class="nav-item nav-link">Home</router-link> -->
              <router-link to="/workinghours" class="nav-link nav-item"
                >Working Hours</router-link
              >
              <a
                href="https://calldatetime.auth.us-east-1.amazoncognito.com/signup?client_id=4q4411bgthdj28tphn5u5rhks1&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080/mycalendars"
                class="nav-link nav-item"
                >Sign Up</a
              >
              <a
                href="https://calldatetime.auth.us-east-1.amazoncognito.com/login?client_id=4q4411bgthdj28tphn5u5rhks1&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080/mycalendars"
                class="nav-link nav-item"
                >Login</a
              >
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center ms-4 d-lg-none">
          <div>
            <router-link to="/" class="navbar-brand my-auto"
              ><img src="@/assets/logo.svg"
            /></router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  mounted() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.querySelector(".navbar-toggler");
    const navMenu = document.getElementById("navmenu");
    navLinks.forEach((l) => {
      l.addEventListener("click", () => {
        if (navMenu.classList.contains("show")) {
          menuToggle.click();
        }
      });
    });

    document.onclick = function closeNavMenu() {
      if (navMenu.classList.contains("show")) {
        menuToggle.click();
      }
    };
  },
};
</script>
<style scoped lang="scss">
.nav-container {
  position: fixed;
  background-color: var(--background-color-primary);
  z-index: 10;
  margin-left: 0px;
  padding-left: 0px;
  height: 55px;
}
.navbar-brand {
  img {
    height: 40px;
    margin: 0px;
    padding-top: 5px;
    margin-top: 5px;
  }
}

.nav-items-container {
  position: absolute;
}

.nav-item {
  color: gray;
  background: var(--background-color-primary);
  width: 100vw;
  font-weight: 400;
  padding-left: 0px;
  &:hover {
    color: white;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    width: auto;
  }
}
.logo_code {
  font-family: "Courier New";
  color: #f7bf3c;
}

.navbar-toggler:active,
.navbar-toggler:focus {
  outline: 0;
  padding-top: 5px;
  padding-left: 0px;
}

.navbar-toggler .icon-bar {
  display: block;
  width: 25px;
  height: 3px;
  border-radius: 1px;
  margin: 4px 0 4px 0;
  transition: all 0.2s;
  background: gray;
}

.navbar-dark .navbar-toggler .icon-bar {
  background: #ffffff;
}

.navbar-toggler .icon-bar:nth-of-type(1) {
  transform: rotate(45deg);
  transform-origin: 10% 10%;
}

.navbar-toggler .icon-bar:nth-of-type(2) {
  opacity: 0;
  filter: alpha(opacity=0);
}

.navbar-toggler .icon-bar:nth-of-type(3) {
  transform: rotate(-45deg);
  transform-origin: 10% 90%;
}

.navbar-toggler.collapsed .icon-bar:nth-of-type(1) {
  transform: rotate(0);
}

.navbar-toggler.collapsed .icon-bar:nth-of-type(2) {
  opacity: 1;
  filter: alpha(opacity=100);
}

.navbar-toggler.collapsed .icon-bar:nth-of-type(3) {
  transform: rotate(0);
}

.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
  padding-top: 15px;
  padding-left: 0px;
  outline: none;
  box-shadow: none;
}

.collapsed {
  padding-top: 5px;
  padding-left: 0px;
}

.navbar-toggler {
  padding-top: 15px;
  padding-left: 0px;
}

.navbar-nav {
  padding-left: 0px;
  margin-left: 0px;
}
</style>
