// this is aliased in webpack config based on server/client build
// eslint-disable-next-line import/no-unresolved
import { createAPI } from "create-api"
import { ListTypes, DataItem, UserItem, DataApi } from "./types"
import Firebase from "firebase"

const logRequests = !!process.env.DEBUG_API

let __api: DataApi

const log = (text: string): void => {
  if (logRequests) {
    // eslint-disable-next-line no-console
    console.log(text)
  }
}

/**
 * Keeps the item cache fresh on server
 */
const warmCache = (api: DataApi): void => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  fetchItems((api.cachedIds?.top ?? []).slice(0, 30))
  setTimeout(() => warmCache(api), 1000 * 60 * 15)
}

/**
 * Gets the universal api for HN
 */
const getApi = async (): Promise<DataApi> => {
  if (!__api) {
    __api = await createAPI({
      version: "/v0",
      config: {
        databaseURL: "https://hacker-news.firebaseio.com"
      }
    })

    // warm the front page cache every 15 min
    // make sure to do this only once across all requests
    if (__api.onServer) {
      warmCache(__api)
    }
  }

  return __api
}

/**
 * Get a data item using cache
 */
const fetch = async <T>(child: string): Promise<T> => {
  log(`fetching ${child}...`)

  const api = await getApi()

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

export const fetchItems = async (ids: string[]): Promise<DataItem[]> => {
  const items = await Promise.all(ids.map(id => fetchItem(id)))
  return items
}

export const fetchUser = (id: string): Promise<UserItem> => {
  return fetch<UserItem>(`user/${id}`)
}

export const fetchIdsByType = async (type: ListTypes): Promise<string[]> => {
  const { cachedIds } = await getApi()

  if (cachedIds && cachedIds[type]) {
    return cachedIds[type]
  } else {
    return await fetch<string[]>(`${type}stories`)
  }
}

/**
 * Watch the items on a list
 */
export const watchList = async (
  type: ListTypes,
  callback: Function
): Promise<Function> => {
  let first = true
  const api = await getApi()
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

getApi()
