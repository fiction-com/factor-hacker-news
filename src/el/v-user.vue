<template>
  <div class="user-view">
    <template v-if="user">
      <h1>User : {{ user.id }}</h1>
      <ul class="meta">
        <li>
          <span class="label">Created:</span>
          {{ timeAgo(user.created) }} ago
        </li>
        <li>
          <span class="label">Karma:</span>
          {{ user.karma }}
        </li>
        <li v-if="user.about" v-formatted-text="user.about" class="about" />
      </ul>
      <p class="links">
        <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a> |
        <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
      </p>
    </template>
    <template v-else-if="user === false">
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
import Vue from "vue"
import { timeAgo, stored } from "@factor/api"
import { requestUser } from "../api/data"
export default Vue.extend({
  name: "UserView",

  computed: {
    user() {
      return stored(this.$route.params.id)
    }
  },

  serverPrefetch() {
    return requestUser({ id: this.$route.params.id })
  },

  async beforeMount() {
    if (this.$root._isMounted) {
      await requestUser({ id: this.$route.params.id })
    }
  },

  metaInfo() {
    const name = this.user ? this.user.id : "User not found"
    return {
      title: name,
      description: `Profile for ${name}`
    }
  },
  methods: {
    timeAgo
  }
})
</script>

<style lang="less">
.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }

  .meta {
    list-style-type: none;
    padding: 0;
  }

  .label {
    display: inline-block;
    min-width: 4em;
  }

  .about {
    margin: 1em 0;
  }

  .links a {
    text-decoration: underline;
  }
}
</style>
