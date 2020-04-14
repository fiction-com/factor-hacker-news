import { addContentRoutes, addFilter } from "@factor/api"

const itemView = (): Promise<any> => import("./el/v-item.vue")
const userView = (): Promise<any> => import("./el/v-user.vue")
const listView = (): Promise<any> => import("./el/v-list.vue")

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
 * Add a webpack alias to load in different versions of the HN fetching routine based on
 * if user is in client or server.
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
