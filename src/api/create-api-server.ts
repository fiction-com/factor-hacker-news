import Firebase from "firebase"
import LRU from "lru-cache"

import { listTypesArray, DataApi, ApiArguments } from "./types"

export const createAPI = ({ config, version }: ApiArguments): DataApi => {
  let api: DataApi
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database().ref(version)

    api.onServer = true

    // fetched item cache
    api.cachedItems = new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}

    listTypesArray.forEach(type => {
      api.child(`${type}stories`).on("value", snapshot => {
        if (snapshot && api.cachedIds) {
          api.cachedIds[type] = snapshot.val()
        }
      })
    })
  }
  return api
}
