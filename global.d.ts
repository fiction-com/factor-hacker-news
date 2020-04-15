declare namespace NodeJS {
  interface Process {
    __API__: any
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    metaInfo?: any
  }
}
