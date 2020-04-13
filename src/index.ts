import { addContentRoutes } from "@factor/api"

const itemView = () => import("./views/v-item.vue")
const userView = () => import("./views/v-user.vue")
const listView = () => import("./views/list-item.vue")

addContentRoutes({
  key: "appRoutes",
  routes: [
    { path: "/i/:view/:page", component: listView },
    { path: "/item/:id", component: itemView },
    { path: "/user/:id", component: userView },
    { path: "/", redirect: "/i/top" }
  ]
})
