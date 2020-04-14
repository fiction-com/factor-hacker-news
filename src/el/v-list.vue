<template>
  <div class="news-view">
    <div class="news-list-nav">
      <router-link v-if="page > 1" :to="`/${type}/${page - 1}`">&larr; prev</router-link>
      <a v-else class="disabled">&larr; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="`/${type}/${page + 1}`">more &rarr;</router-link>
      <a v-else class="disabled">more &rarr;</a>
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
import { watchList } from "../api"
import Vue from "vue"
import { getActiveItems, setList, ensureActiveItems, requestListData } from "../api/data"
import { stored } from "@factor/api"
import item from "../el/item.vue"

export default Vue.extend({
  name: "ItemList",

  components: {
    item
  },

  props: {
    type: { type: String, default: "" }
  },

  data() {
    return {
      transition: "slide-right",
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: getActiveItems()
    }
  },

  computed: {
    view() {
      return this.$route.params.view ?? "top"
    },
    itemsPerPage() {
      return stored("itemsPerPage")
    },
    page() {
      return Number(this.$route.params.page) || 1
    },
    maxPage(this: any) {
      const list = stored(this.view) ?? []
      return Math.ceil(list.length / this.itemsPerPage)
    },
    hasMore(this: any) {
      return this.page < this.maxPage
    }
  },

  watch: {
    page(this: any, to, from) {
      this.loadItems(to, from)
    }
  },

  beforeMount(this: any) {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
    // watch the current list for realtime updates
    this.unwatchList = watchList(this.view, (ids: string[]) => {
      setList({ type: this.view, ids })
      ensureActiveItems().then(() => {
        this.displayedItems = getActiveItems()
      })
    })
  },

  beforeDestroy(this: any) {
    this.unwatchList()
  },

  methods: {
    loadItems(this: any, to = this.page, from = -1) {
      requestListData({
        type: this.view
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.view}/1`)
          return
        }
        const transitionName = to > from ? "slide-left" : "slide-right"
        this.transition = from === -1 ? null : transitionName
        this.displayedPage = to
        this.displayedItems = getActiveItems()
      })
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  a {
    margin: 0 1em;
  }

  .disabled {
    color: #ccc;
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
