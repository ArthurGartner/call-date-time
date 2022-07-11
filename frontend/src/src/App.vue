<template>
  <div class="screen-area">
    <NavBar />
    <div class="page-view"><router-view /></div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference();
    this.setTheme(initUserTheme);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (event.matches) {
          this.setTheme("dark-theme");
        } else {
          this.setTheme("light-theme");
        }
      });
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },

    getTheme() {
      return localStorage.getItem("user-theme");
    },

    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap");
* {
  padding: 0;
  margin: 0;
  font-family: "Inter", Courier, monospace;
}

body {
  background: var(--background-color-primary);
}

html {
  background-color: var(--background-color-primary);
  padding: env(safe-area-inset);
}

:root {
  --background-color-primary: #efeef4;
  --background-color-secondary: #ebebeb;
  --item-background: #ffffff;
  --accent-color: #cacaca;
  --text-primary-color: #000;
  --text-primary-color-inverse: #fff;
  --text-muted: gray;
  --cal-highlight: #e14435;
  --cal-highlight-top: #f37271;
  --cal-highlight-bottom: #e44f48;
  --cal-selected-top: rgb(99, 99, 99);
  --cal-selected-bottom: #000;
  --cal-event: #aeaeb2;
  --cal-holiday: #007aff;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #000000;
  --background-color-secondary: #2d2d30;
  --item-background: #1d1d1e;
  --accent-color: #3f3f3f;
  --text-primary-color: #fff;
  --text-primary-color-inverse: #000;
  --text-muted: gray;
  --cal-highlight: #e8493d;
  --cal-highlight-top: #f37271;
  --cal-highlight-bottom: #e44f48;
  --cal-selected-top: #fff;
  --cal-selected-bottom: rgb(207, 207, 207);
  --cal-event: #636366;
  --cal-holiday: #0a84ff;
}

.screen-area {
  background: var(--background-color-primary);
}
.page-view {
  padding-top: 55px;
  height: 100vh;
}
</style>
