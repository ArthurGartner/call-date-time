<template>
  <router-link :to="link">
    <div class="nav-link-container">
      <div class="content">
        <h4 id="link-name">{{ name }}</h4>
        <div class="selection selected"></div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "NavBarLink",
  props: {
    name: String,
    link: String,
  },
};
</script>
<style lang="scss" scoped>
.router-link-active {
  .nav-link-container {
    .content {
      .selection {
        position: absolute;
        border-bottom: 3px var(--text-primary-color) solid;
        width: 100%;
        bottom: -2px;
        transition: width 0.2s linear;
      }

      #link-name {
        color: var(--text-primary-color);
      }
    }
  }
}
a {
  text-decoration: none;
}
.nav-link-container {
  position: relative;
  text-decoration: none;
  cursor: pointer;
  .content {
    position: relative;
    .selection {
      position: absolute;
      border-bottom: 3px var(--text-primary-color) solid;
      width: 0;
      bottom: -2px;
      transition: width 0.2s linear;
    }

    #link-name {
      color: var(--text-muted);
      font-weight: 500;
      transition: color 0.2s linear;
    }
  }
  &:hover {
    #link-name {
      color: var(--text-primary-color);
      transition: color 0.2s linear;
    }
    .selection {
      width: 100%;
      transition: width 0.2s linear;
    }
  }
}
</style>
