<template>
  <div class="landing-view">
    <div class="container">
      <div class="main">
        <div class="hero d-flex flex-column">
          <div class="my-auto">
            <div class="row">
              <div class="col-lg-4 text-lg-center">
                <h1 class="fadeInBottom">
                  Save a <span class="fadeDate">date</span>
                </h1>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <h1 class="fadeInBottom fadeInSecond">
                  Make some <span class="fadeTime">time</span>
                </h1>
              </div>
            </div>
            <div class="row justify-content-end">
              <div class="col-lg-4 text-end text-lg-center">
                <h1 class="fadeInBottom fadeInThird">
                  <span class="fadeCall">Call</span> it later
                </h1>
              </div>
            </div>
            <div class="row logo-pic-row mt-4 mb-4">
              <div class="col text-center">
                <img
                  class="fadeInBottomIconThird w-75"
                  src="@/assets/phone.svg"
                />
              </div>
              <div class="col text-center">
                <img class="fadeInBottomIcon" src="@/assets/cal.svg" />
              </div>
              <div class="col text-center">
                <img class="fadeInBottomIconSecond" src="@/assets/clock.svg" />
              </div>
            </div>
            <div class="row">
              <h1 class="text-center fadeInBottomLogoString">
                <span id="call-string">call</span>
                <span id="datetime-string">datetime</span>()
              </h1>
              <h4 class="text-center fadeInBottomDescription">
                Build, query, trigger actions and calculate time on custom
                calendars using the
                <span id="restful-string">RESTful</span> API.
              </h4>
              <h4 class="text-center fadeInBottomOpenSource mb-5">
                <span id="opensource-string" style="text-decoration: underline"
                  >All</span
                >
                opensource
              </h4>
            </div>
            <div class="row">
              <div class="col-md-6">
                <LinkBtn />
              </div>
              <div class="col-md-6">
                <LinkBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LinkBtn from "../components/LinkBtn.vue";
export default {
  name: "Landing-Page",
  components: {
    LinkBtn,
  },
};
</script>
<style scoped lang="scss">
#call-string {
  background: -webkit-linear-gradient(#32ade6, #0b93d2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#datetime-string {
  background: -webkit-linear-gradient(#ff9f0a, #ff9a02);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#restful-string {
  background: -webkit-linear-gradient(#af52de, #a959d0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
.fadeInBottom {
  animation-name: fadeInBottom;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.fadeInSecond {
  animation-delay: 2.2s;
}

.fadeInThird {
  animation-delay: 4.4s;
}

.fadeInBottomIcon {
  animation-name: fadeInBottom;
  animation-duration: 1.2s;
  animation-fill-mode: both;
  animation-delay: 1s;
}
.fadeInBottomIconSecond {
  animation-name: fadeInBottom;
  animation-duration: 1.2s;
  animation-fill-mode: both;
  animation-delay: 3.2s;
}
.fadeInBottomIconThird {
  animation-name: fadeInBottom;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 5.4s;
}

.fadeInBottomLogoString {
  animation-name: fadeInBottom;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 6.4s;
}
.fadeInBottomDescription {
  animation-name: fadeInBottom;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 6.9s;
}
.fadeInBottomOpenSource {
  animation-name: fadeInBottom;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 7.9s;
}

.fadeDate {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    var(--text-primary-color) 0%,
    var(--text-primary-color) 50%,
    #e44f48 90%,
    #e44f48 100%
  );
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animated_text 1.2s ease-in-out 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fadeTime {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    var(--text-primary-color) 0%,
    var(--text-primary-color) 50%,
    #b1b0b0 90%,
    #b1b0b0 100%
  );
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animated_text 1.2s ease-in-out 3.2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fadeCall {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    var(--text-primary-color) 0%,
    var(--text-primary-color) 50%,
    #0cba2a 70%,
    #0cba2a 100%
  );
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animated_text 1.2s ease-in-out 5.4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes animated_text {
  0% {
    background-position: 0px 50%;
  }
  100% {
    background-position: 0% 100%;
  }
}

@keyframes fadeInBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
  }
}

* {
  color: var(--text-primary-color);
}

.landing-view {
  height: 100%;
  .container {
    height: 100%;
    position: relative;
  }
  .main {
    .hero {
      height: calc(100vh - 95px);
      .logo-pic-row {
        img {
          max-height: 25vh;
        }
      }
    }
  }
}
</style>
