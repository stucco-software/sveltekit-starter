// ALl this is from SolidState-KV
// Once SolidState-KV is real we'll just use that.
import {
  contextualize,
  compact,
  fromTriples,
  toTriples,
  arrayify
} from './utils'

// Simple enough, potentially we can push
// json-ld straight across but for now this is good.
const post = (persist, getter) => async (doc) => {
  let Doc = structuredClone(doc)
  let ld = contextualize(Doc)
  const triples = await toTriples(ld)
  const result = await persist({ins: triples})
  return true
}

// @TKTK is how to query against these endpoints
// maybe using @comunica/query-sparql-solid
// for now, we just get the entire graph and process
// it in the client. This means we can do framing too,
// without needing to figure out how to convert
// a given frame to a sparql query that can fit that frame.
const getEntity = (getter) => async (id) => {
  const docs = await getter()
  const array = docs['@graph']
    ? docs['@graph']
    : [docs]
  const node = array.find(node => node['@id'] === id)
  return node
}

// Gets the entire graph at the endpoint provided.
const getAll = (getter) => async () => {
  const docs = await getter()
  return docs
}

// These are the functions that map between the triples we want to get/edit
// and the actual making a request to and from the pod endpoint we want.
const podPersister = (config) => {
  const authFetch = config.session.data.fetch
  const provider = new URL(config.session.data.info.webId)
  const endpoint = `${provider.origin}/${config.graph}.rdf`
  return {
    persist: async (i) => {
      let didDo = await authFetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/sparql-update",
        },
        body: `INSERT DATA { ${i.ins} }`
      })
      return didDo
    },
    getter: async (i) => {
      const headers = new Headers()
      headers.append("Accept", "application/ld+json")
      let response = await authFetch(endpoint, {
        headers: headers
      })
      let json = await response.json()
      let comp = await compact(json)
      if (comp['@graph']) {
        return comp['@graph']
      } else {
        return [comp]
      }
    }
  }
}

// @NOTE: This is a simple wrapper for different kinds of persistent stores.
const configureStore = (config) => {
  return podPersister(config)
}

// This is the store object itself.
// Config will take like… the session and the graph endpoints for now.
const SetupDB = (config) => {
  const {persist, getter} = configureStore(config)
  return {
    version: "0.0.1",
    persister: persist,
    getter: getter,
    post: post(persist, getter),
    get: getEntity(getter),
    getAll: getAll(getter)
  }
}

export default SetupDB