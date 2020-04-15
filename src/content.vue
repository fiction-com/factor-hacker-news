<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <svg
            class="logo"
            width="39"
            height="41"
            viewBox="0 0 39 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.307 40.5H16.5925C15.508 40.5 14.4866 40.0577 13.7194 39.2507L0.984092 25.8887C0.0213371 24.8811 -0.26336 23.3741 0.256049 22.0564C0.777632 20.7364 1.99248 19.8815 3.35512 19.8815H18.9613V3.51018C18.9613 2.0853 19.7741 0.810894 21.0303 0.263742C22.2668 -0.276572 23.7403 0.0312015 24.6857 1.02292L37.4275 14.3894C38.1947 15.1987 38.6163 16.268 38.6163 17.4033V34.9327C38.6141 38.0036 36.2344 40.5 33.307 40.5ZM17.2922 34.4768H32.8745V18.1306L24.7031 9.5585V25.9047H9.12078L17.2922 34.4768Z"
              fill="white"
            />
          </svg>
        </router-link>
        <router-link to="/v/top">Top</router-link>
        <router-link to="/v/new">New</router-link>
        <router-link to="/v/show">Show</router-link>
        <router-link to="/v/ask">Ask</router-link>
        <router-link to="/v/job">Jobs</router-link>
        <a
          class="github"
          href="https://factor.dev"
          target="_blank"
          rel="noopener"
        >Built with Factor JS</a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view" />
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  metaInfo() {
    return {
      titleTemplate: "Factor HN | %s"
    }
  }
})
</script>

<style lang="less">
html.factor-app {
  --color-text: #34495e;
  --color-primary: #f60;
  --font-family-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-family: var(--font-family-primary);
  --font-weight-normal: 500;
  --font-weight-bold: 700;
  --color-bg: #ffffff;
  font-size: 16px; // 1rem
  font-weight: var(--font-weight-normal);
  background-color: var(--color-bg);
  margin: 0;
  padding-top: 55px;
  color: var(--color-text);
  overflow-y: scroll;

  a {
    color: #34495e;
    text-decoration: none;
  }

  .header {
    background-color: var(--color-primary);
    position: fixed;
    z-index: 999;
    height: 55px;
    top: 0;
    left: 0;
    right: 0;
    font-weight: var(--font-weight-semibold, 600);
    .inner {
      max-width: 800px;
      box-sizing: border-box;
      margin: 0px auto;
      padding: 15px 5px;
    }

    a {
      svg.logo {
        width: 1.5rem;
        height: 1.5rem;
        transform: translate(-0.1rem, -0.1rem);
      }
      color: rgb(255, 212, 158);
      line-height: 1.5em;
      transition: color 0.15s ease;
      display: inline-block;
      vertical-align: middle;

      margin-right: 1.8em;

      &:hover {
        color: #fff;
      }

      &.router-link-active {
        color: #fff;
        font-weight: 400;
      }

      &:nth-child(6) {
        margin-right: 0;
      }
    }

    .github {
      color: #fff;
      margin: 0;
      float: right;
    }
  }

  .logo {
    width: 24px;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }

  .view {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  @media (max-width: 860px) {
    .header .inner {
      padding: 15px 30px;
    }
  }

  @media (max-width: 600px) {
    .header {
      .inner {
        padding: 15px;
      }

      a {
        margin-right: 1em;
      }

      .github {
        display: none;
      }
    }
  }
}
</style>
