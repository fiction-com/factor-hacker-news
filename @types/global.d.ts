// declare module "create-api" {
//   import * as utilities from "../src/api/create-api-server"
//   export utilities
// }

declare namespace NodeJS {
  interface Process {
    __API__: any
  }
}
