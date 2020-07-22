<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <div class="home">
          <router-link to="/" exact>
            <svg class="logo" width="37" height="40" viewBox="0 0 37 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1608 16.8311L28.1523 16.8317L28.1438 16.8327C27.8163 16.8715 26.1655 17.071 24.5977 17.2606L21.2715 17.6633L20.0083 21.7933L20.6489 21.7168C23.7473 21.3468 27.0022 20.9543 29.4824 20.6543C30.7225 20.5043 31.769 20.3775 32.5055 20.2881L33.1497 20.2099C33.082 20.8972 33.0054 21.5846 32.9285 22.275L32.9284 22.2766C32.8449 23.0262 32.761 23.7794 32.6884 24.5346C29.3524 24.9175 22.1997 25.774 19.0941 26.2102L18.8224 26.2483L18.7479 26.5124C18.4024 27.7373 18.0349 28.9439 17.6667 30.1528L17.6568 30.1851C17.2857 31.4034 16.9141 32.6243 16.5667 33.8605C15.5715 37.4022 12.3097 40 8.43938 40C3.77739 40 0 36.2315 0 31.5851C0 26.9566 3.41435 23.5602 8.47182 23.1689L8.48032 23.1683L8.48879 23.1673C8.81637 23.1285 10.4784 22.9277 12.0575 22.7367L15.4101 22.331L16.6158 18.2077L15.9837 18.2832C12.8856 18.6532 9.78917 19.0231 7.46725 19.3005L4.11588 19.701C4.18555 18.9934 4.28166 18.0901 4.37101 17.2615C4.40086 16.9846 4.43001 16.7156 4.45716 16.4651L4.45729 16.4639C4.5048 16.0255 4.54617 15.6438 4.57442 15.3756C7.86904 14.9985 14.4324 14.2261 17.5385 13.7898L17.8103 13.7517L17.8848 13.4876C18.2303 12.2625 18.5978 11.0559 18.966 9.84701L18.9758 9.81489C19.3469 8.59659 19.7185 7.37577 20.0659 6.13948C21.0611 2.59782 24.323 0 28.1933 0C32.8552 0 36.6326 3.76853 36.6326 8.4149C36.6326 13.0434 33.2183 16.4398 28.1608 16.8311ZM22.6354 12.6302L22.4679 13.2394L23.0946 13.1586C23.6193 13.0909 24.224 13.035 24.8698 12.9753L25.1533 12.949C25.9009 12.8794 26.6896 12.8024 27.439 12.6954C28.1866 12.5887 28.9098 12.4504 29.5243 12.254C30.1278 12.0611 30.6824 11.7954 31.0372 11.3992C32.6544 9.59272 32.7414 7.03903 31.1112 5.41332C29.4888 3.79543 26.5883 3.76613 24.8045 5.79395C24.5696 6.06094 24.3681 6.50276 24.189 6.98674C24.0038 7.48741 23.8216 8.09395 23.6447 8.73732C23.4675 9.38182 23.2931 10.0721 23.1244 10.7411L23.1116 10.792C22.9469 11.445 22.788 12.0753 22.6354 12.6302ZM13.9972 27.3698L14.1648 26.7606L13.538 26.8414C13.0133 26.9091 12.4086 26.965 11.7629 27.0247L11.4793 27.051C10.7318 27.1206 9.94301 27.1976 9.19362 27.3046C8.44606 27.4112 7.72283 27.5496 7.10837 27.746C6.50482 27.9388 5.95019 28.2046 5.59548 28.6008C3.97821 30.4073 3.89121 32.961 5.52143 34.5867C7.14381 36.2046 10.0443 36.2339 11.8281 34.206C12.063 33.9391 12.2646 33.4972 12.4436 33.0133C12.6289 32.5126 12.811 31.906 12.9879 31.2627C13.1652 30.6182 13.3396 29.9279 13.5082 29.2589L13.521 29.2082C13.6856 28.5552 13.8446 27.9248 13.9972 27.3698Z" fill="white"/>
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
