<template>
  <div v-if="item" class="item-view">
    <template v-if="item">
      <div class="item-view-header">
        <a :href="item.url" target="_blank">
          <h1>{{ item.title }}</h1>
        </a>
        <span v-if="item.url" class="host">({{ niceHost(item.url) }})</span>
        <p class="meta">
          {{ item.score }} points
          | by
          <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
          {{ timeAgo(item.time) }} ago
        </p>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{ item.kids ? item.descendants + ' comments' : 'No comments yet.' }}
          <spinner :show="loading" />
        </p>

        <ul v-if="!loading" class="comment-children">
          <comment v-for="id in item.kids" :id="id" :key="id" />
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { niceHost } from "../api/util"
import { timeAgo, stored } from "@factor/api"
import spinner from "../el/spinner.vue"
import comment from "../el/comment.vue"
import Vue from "vue"
import { fetchComments, requestItems } from "../api/data"

export default Vue.extend({
  name: "ItemView",
  components: { spinner, comment },

  data: () => ({
    loading: true
  }),

  computed: {
    item() {
      return stored(this.$route.params.id)
    }
  },

  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  serverPrefetch() {
    return requestItems({ ids: [this.$route.params.id] })
  },

  // refetch comments if item changed
  watch: {
    item: "fetchComments"
  },

  // Fetch comments when mounted on the client
  beforeMount() {
    this.fetchComments()
  },

  methods: {
    timeAgo,
    niceHost,
    async fetchComments() {
      if (!this.item || !this.item.kids) {
        return
      }

      this.loading = true
      await fetchComments(this.item)
      this.loading = false
    }
  }
})
</script>

<style lang="less">
.item-view-header {
  background-color: #fff;
  padding: 1.8em 2em 1em;

  h1 {
    display: inline;
    font-size: 1.5em;
    margin: 0;
    margin-right: 0.5em;
  }

  .host,
  .meta,
  .meta a {
    color: #828282;
  }

  .meta a {
    text-decoration: underline;
  }
}

.item-view-comments {
  background-color: #fff;
  margin-top: 10px;
  padding: 0 2em 0.5em;
}

.item-view-comments-header {
  margin: 0;
  font-size: 1.1em;
  padding: 1em 0;
  position: relative;

  .spinner {
    display: inline-block;
    margin: -15px 0;
  }
}

.comment-children {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 600px) {
  .item-view-header {
    h1 {
      font-size: 1.25em;
    }
  }
}
</style>
