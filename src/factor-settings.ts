/**
 * Override standard Factor components and icons
 */
export default {
  app: {
    components: {
      content: (): Promise<any> => import("./content.vue")
    },
    icon: require("./icon.svg"),
    faviconPath: `${__dirname}/favicon.png` // nee
  }
}
