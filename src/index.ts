import { addContentRoutes, addFilter, addCallback } from "@factor/api"
import { listTypesArray } from "./api/types"


/**
 * Primary view components
 * Vue natively has support for the dynamic imports format below
 * treat these as working components
 */
const itemView = (): Promise<any> => import("./el/v-item.vue")
const userView = (): Promise<any> => import("./el/v-user.vue")
const listView = (): Promise<any> => import("./el/v-list.vue")

/**
 * Add application routes
 */
addContentRoutes({
  key: "appRoutes",
  routes: [
    { path: "/v/:view", component: listView },
    { path: "/v/:view/:page", component: listView },
    { path: "/item/:id", component: itemView },
    { path: "/user/:id", component: userView },
    { path: "/", redirect: "/v/top" }
  ]
})

/**
 * Add List urls to sitemap plugin
 */
addCallback({
  key: "docs",
  hook: "sitemaps",
  callback: (): { _id: string; items: { url: string }[] } => {
    return {
      _id: "lists",
      items: listTypesArray.map((view: string) => {
        return { url: `/v/${view}` }
      })
    }
  }
})

/**
 * Add a webpack alias to load in different versions of the HN fetching routine based on
 * if user is in client or server.
 *
 * This is a pain and sometimes technical to deal with but relates to the environmental differences
 * between the server and a bundled webpack application
 */
addFilter({
  hook: "webpack-aliases",
  key: "addApiAlias",
  callback: (aliases, { target }) => {
    aliases["create-api"] =
      target == "client" ? "./create-api-client" : "./create-api-server"
    return aliases
  }
})
