<template>
  <div :key="view" class="news-view">
    <div class="news-list-nav">
      <factor-link
        btn="primary"
        size="small"
        :to="`/v/${view}/${page - 1}`"
        :disabled="page <= 1"
      >&larr; Previous</factor-link>

      <span class="pager">{{ page }} of {{ maxPage }}</span>
      <factor-link
        btn="primary"
        size="small"
        :to="`/v/${view}/${page + 1}`"
        :disabled="!hasMore"
      >more &rarr;</factor-link>
    </div>

    <transition :name="transition">
      <div v-if="displayedPage > 0" :key="displayedPage" class="news-list">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item" />
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { factorLink } from "@factor/ui"
import { watchList } from "../api"
import Vue from "vue"
import {
  getActiveItems,
  setList,
  ensureActiveItems,
  requestListData,
  itemsPerPage
} from "../api/data"
import { stored, toLabel } from "@factor/api"
import item from "../el/item.vue"

export default Vue.extend({
  name: "ItemList",

  components: {
    item,
    factorLink
  },
  metaInfo() {
    return {
      title: toLabel(this.view)
    }
  },

  serverPrefetch(this: any) {
    return requestListData({ type: this.view })
  },

  data() {
    return {
      transition: "slide-right",
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: getActiveItems()
    }
  },

  computed: {
    view(this: any) {
      return this.$route.params.view ?? "top"
    },

    page() {
      return Number(this.$route.params.page) || 1
    },
    maxPage(this: any) {
      const list = stored(this.view) ?? []
      return Math.ceil(list.length / itemsPerPage)
    },
    hasMore(this: any) {
      return this.page < this.maxPage
    }
  },

  watch: {
    page(this: any, to, from) {
      this.loadItems(to, from)
    },
    view(this: any) {
      this.loadItems()
    }
  },

  async beforeMount(this: any) {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
    // watch the current list for realtime updates
    this.unwatchList = await watchList(this.view, async (ids: string[]) => {
      setList({ type: this.view, ids })
      await ensureActiveItems()
      this.displayedItems = getActiveItems()
    })
  },

  beforeDestroy(this: any) {
    this.unwatchList()
  },

  methods: {
    async loadItems(this: any, to = this.page, from = -1) {
      await requestListData({
        type: this.view
      })

      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace(`/${this.view}/1`)
        return
      }
      const transitionName = to > from ? "slide-left" : "slide-right"
      this.transition = from === -1 ? null : transitionName
      this.displayedPage = to
      this.displayedItems = getActiveItems()
    }
  }
})
</script>

<style lang="less">
.news-view {
  padding-top: 45px;
}

.news-list-nav,
.news-list {
  background-color: #fff;
  border-radius: 2px;
}

.news-list-nav {
  padding: 15px 30px;
  position: fixed;
  text-align: center;
  top: 55px;
  left: 0;
  right: 0;
  z-index: 998;

  a {
    margin: 0 1em;
  }

  .disabled {
    color: #ccc;
  }

  .pager {
    font-weight: 700;
  }
}

.news-list {
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

.item-move,
.item-enter-active,
.item-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}

@media (max-width: 600px) {
  .news-list {
    margin: 10px 0;
  }
}
</style>
