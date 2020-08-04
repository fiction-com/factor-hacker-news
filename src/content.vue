<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <div class="home">
          <router-link to="/" exact>
            <svg
              width="34"
              height="40"
              viewBox="0 0 34 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="logo"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 20C0 12.8942 5.76036 7.13388 12.8661 7.13388H20.7739C27.8796 7.13388 33.64 12.8942 33.64 20C33.64 27.1058 27.8796 32.8661 20.7738 32.8661H12.8661C5.76035 32.8661 0 27.1058 0 20ZM12.8661 13.0968C9.0536 13.0968 5.96293 16.1875 5.96293 20C5.96293 23.8125 9.05359 26.9032 12.8661 26.9032H20.7738C24.5864 26.9032 27.677 23.8125 27.677 20C27.677 16.1875 24.5864 13.0968 20.7739 13.0968H12.8661Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.732 40C14.3445 40 14.0304 39.6859 14.0304 39.2985V0.701522C14.0304 0.314082 14.3445 0 14.732 0H19.2918C19.6793 0 19.9934 0.314081 19.9934 0.70152V39.2985C19.9934 39.6859 19.6793 40 19.2918 40H14.732Z"
                fill="white"
              />
            </svg>
          </router-link>
        </div>
        <div class="nav">
          <router-link to="/v/top">Top</router-link>
          <router-link to="/v/new">New</router-link>
          <router-link to="/v/show">Show</router-link>
          <router-link to="/v/ask">Ask</router-link>
          <router-link to="/v/job">Jobs</router-link>
        </div>
        <div class="alt">
          <a
            class="github"
            href="https://github.com/fiction-com/factor-hacker-news"
            target="_blank"
            rel="noopener"
          >
            <factor-icon icon="fab fa-github" />
          </a>
          <a
            class="github"
            href="https://factor.dev"
            target="_blank"
            rel="noopener"
          >Built with Factor</a>
        </div>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view" />
    </transition>
  </div>
</template>
<script >
import Vue from "vue"
import { factorIcon } from "@factor/ui"

export default Vue.extend({
  components: { factorIcon },
  metaInfo() {
    return {
      titleTemplate: "%s | Factor Hacker News",
      image: require("./favicon.png")
    }
  }
})
</script>

<style lang="less">
// Set site wide CSS variables
// Many of these are standard and used by plugins/themes also
html.factor-app {
  --color-text: #34495e;
  --color-primary: #f60;
  --font-family-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-family: var(--font-family-primary);
  --font-weight-normal: 500;
  --font-weight-bold: 700;
  --color-bg: #ffffff;
  --color-border: #eee;
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

    top: 0;
    left: 0;
    right: 0;
    font-weight: var(--font-weight-semibold, 600);
    .inner {
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0px auto;
      padding: 12px 5px;
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
      border-radius: 5px;
      padding: 0.2rem 0.5rem;
      &:hover,
      &.router-link-active {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
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
        padding: 8px;
      }

      a {
        margin-right: 0.25rem;
        padding: 0.1rem 0.5rem;
      }

      .github {
        display: none;
      }
    }
    .news-view {
      padding-top: 0;
    }
    .news-list-nav {
      top: 0;
      position: relative;
    }
  }
}
</style>
