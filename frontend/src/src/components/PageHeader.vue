<template>
  <div class="title-group">
    <div class="title">
      <div class="title-text">
        {{ title }}
      </div>
      <div class="page-link d-md-none">
        <a href="#calendar-options">
          <i class="bi bi-gear-fill"></i>
        </a>
      </div>
    </div>
    <div class="subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>
<script>
export default {
  name: "Page-Header",
  props: {
    title: String,
    subtitle: String,
  },
};
</script>
<style scoped lang="scss">
.title-group {
  padding-top: 5px;
  color: var(--text-primary-color);

  .title {
    .title-text {
      font-size: 2rem;
      font-weight: 600;
    }
  }
  .subtitle {
    color: var(--text-muted);
    font-size: 1rem;
    font-weight: 500;
    margin-top: -10px;
    margin-bottom: 5px;
  }
}

a:link {
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}

@media (max-width: 767px) {
  .title-group {
    padding-top: 5px;
    color: var(--text-primary-color);

    .title {
      display: flex;
      justify-content: space-between;
      .title-text {
        font-size: 2rem;
        font-weight: 600;
      }

      .page-link {
        font-size: 2rem;
        padding: 0px;
        margin: 0px;
        background: transparent;
        border: none;
        cursor: pointer;

        i {
          color: var(--primary-blue);
          @media (hover: hover) {
            &:hover {
              color: var(--text-primary-color);
            }
          }
        }
      }
    }
  }
}
</style>
