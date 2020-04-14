<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~static/logo-48.png" alt="logo" >
        </router-link>
        <router-link to="/v/top">Top</router-link>
        <router-link to="/v/new">New</router-link>
        <router-link to="/v/show">Show</router-link>
        <router-link to="/v/ask">Ask</router-link>
        <router-link to="/v/job">Jobs</router-link>
        <a
          class="github"
          href="https://github.com/fiction-com/factor-hacker-news"
          target="_blank"
          rel="noopener"
        >Built with Factor JS</a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"/>
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
      color: rgba(255, 255, 255, 0.8);
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
