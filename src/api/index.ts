// this is aliased in webpack config based on server/client build
// eslint-disable-next-line import/no-unresolved
import { createAPI } from "create-api"
import { ListTypes, DataItem, UserItem } from "./types"
import Firebase from "firebase"

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  version: "/v0",
  config: {
    databaseURL: "https://hacker-news.firebaseio.com"
  }
})

const log = (text: string): void => {
  if (logRequests) {
    // eslint-disable-next-line no-console
    console.log(text)
  }
}

const fetch = async <T>(child: string): Promise<T> => {
  log(`fetching ${child}...`)

  const cache = api.cachedItems

  if (cache && cache.has(child)) {
    log(`cache hit for ${child}.`)
    return cache.get(child)
  } else {
    const value: T = await new Promise((resolve, reject) => {
      api.child(child).once(
        "value",
        snapshot => {
          const value_ = snapshot.val()
          // mark the timestamp when this item is cached
          if (value_) value_.__lastUpdated = Date.now()
          if (cache) cache.set(child, value_)
          log(`fetched ${child}.`)

          resolve(value_)
        },
        reject
      )
    })

    return value
  }
}

export const fetchItem = (id: string): Promise<DataItem> => {
  return fetch<DataItem>(`item/${id}`)
}

export const fetchUser = (id: string): Promise<UserItem> => {
  return fetch<UserItem>(`user/${id}`)
}

export const fetchItems = async (ids: string[]): Promise<DataItem[]> => {
  const items = await Promise.all(ids.map(id => fetchItem(id)))
  return items
}

const warmCache = (): void => {
  fetchItems((api.cachedIds?.top ?? []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

export const fetchIdsByType = async (type: ListTypes): Promise<string[]> => {
  const { cachedIds } = api

  if (cachedIds && cachedIds[type]) {
    return cachedIds[type]
  } else {
    return await fetch<string[]>(`${type}stories`)
  }
}

export const watchList = (type: ListTypes, callback: Function): Function => {
  let first = true
  const reference = api.child(`${type}stories`)

  const handler = (snapshot: Firebase.database.DataSnapshot | null): void => {
    if (first) {
      first = false
    } else if (snapshot) {
      callback(snapshot.val())
    }
  }
  reference.on("value", handler)
  return (): void => {
    reference.off("value", handler)
  }
}

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  warmCache()
}
