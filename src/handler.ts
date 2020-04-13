import { fetchUser, fetchItems, fetchIdsByType } from "./api"

// ids of the items that should be currently displayed based on
// current list type and current pagination
export const getActiveIds = state => {
  const { activeType, itemsPerPage, lists } = state

  if (!activeType) {
    return []
  }

  const page = Number(state.route.params.page) || 1
  const start = (page - 1) * itemsPerPage
  const end = page * itemsPerPage

  return lists[activeType].slice(start, end)
}

// items that should be currently displayed.
// this Array may not be fully fetched.
export const getActiveItems = (state, getters) => {
  return getters.activeIds.map(id => state.items[id]).filter(_ => _)
}

// ensure data for rendering given list type
export const requestListData = ({ commit, dispatch, state }, { type }) => {
  commit("SET_ACTIVE_TYPE", { type })
  return fetchIdsByType(type)
    .then(ids => commit("SET_LIST", { type, ids }))
    .then(() => dispatch("ENSURE_ACTIVE_ITEMS"))
}

// ensure all active items are fetched
export const ensureActiveItems = ({ dispatch, getters }) => {
  return dispatch("FETCH_ITEMS", {
    ids: getters.activeIds
  })
}

export const requestItems = ({ commit, state }, { ids }) => {
  // on the client, the store itself serves as a cache.
  // only fetch items that we do not already have, or has expired (3 minutes)
  const now = Date.now()
  ids = ids.filter(id => {
    const item = state.items[id]
    if (!item) {
      return true
    }
    if (now - item.__lastUpdated > 1000 * 60 * 3) {
      return true
    }
    return false
  })
  if (ids.length) {
    return fetchItems(ids).then(items => commit("SET_ITEMS", { items }))
  } else {
    return Promise.resolve()
  }
}

export const requestUser = ({ commit, state }, { id }) => {
  return state.users[id]
    ? Promise.resolve(state.users[id])
    : fetchUser(id).then(user => commit("SET_USER", { id, user }))
}

export const setActiveType = (state, { type }) => {
  state.activeType = type
}

export const setList = (state, { type, ids }) => {
  state.lists[type] = ids
}

export const setItems = (state, { items }) => {
  items.forEach(item => {
    if (item) {
      Vue.set(state.items, item.id, item)
    }
  })
}

export const setUser = (state, { id, user }) => {
  Vue.set(state.users, id, user || false) /* false means user not found */
}
