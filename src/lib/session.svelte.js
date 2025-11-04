export let clientSession = $state({
  data: null
})

export const getSession = () => {
  return clientSession.data
}

export const setSession = (user) => {
  clientSession.data = user
  return clientSession
}

export let graph = $state({
  data: null
})

export const getGraph = () => {
  return graph.data
}

export const setGraph = (data) => {
  graph.data = data
  return graph.data
}

export let store = $state({
  db: null
})

export const getDB = () => {
  return store.db
}

export const setDB = (db) => {
  store.db = db
  db.changes({
    since: 'now',
    live: true
  }).on('change', async (change) => {
    let all = await db.getAll()
    setGraph(all)
  })
  return store.db
}