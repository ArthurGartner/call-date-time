<template>
  <div class="landing-view">
    <div class="container">
      <div class="main">
        <div class="hero d-flex flex-column">
          <div class="row">
            <div class="col">
              <h1>Save a <span id="date-string">date</span></h1>
            </div>
          </div>
          <div class="row">
            <div class="col text-center">
              <h1>Make some <span id="time-string">time</span></h1>
            </div>
          </div>
          <div class="row">
            <div class="col text-end">
              <h1><span id="call-string">Call</span> it later</h1>
            </div>
          </div>
          <div class="row logo-pic-row d-flex flex-column">
            <div class="col d-flex flex-column align-middle">
              <img src="@/assets/logo.svg" />
              <h2>Call date time</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Landing-Page",
};
</script>
<style scoped lang="scss">
* {
  color: var(--text-primary-color);
}

.landing-view {
  height: 100%;
  .container {
    height: 100%;
  }
  .main {
    height: 100%;
    padding-top: 40px;
    .hero {
      height: calc(100vh - 95px);
      .logo-pic-row {
        flex-grow: 1;

        .col {
          flex-grow: 1;
          padding-top: 10vh;
        }

        img {
          width: 100%;
          max-height: 250px;
        }
      }
    }
  }
}

#date-string {
  background: -webkit-linear-gradient(#f67372, #e54d46);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#time-string {
  background: -webkit-linear-gradient(#c1c1c1, #757575);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#call-string {
  background: -webkit-linear-gradient(#67ff80, #00b31e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
