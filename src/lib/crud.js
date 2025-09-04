// ALl this is from SolidState-KV
// Once SolidState-KV is real we'll just use that.
import {
  context,
  contextualize,
  compact,
  fromTriples,
  toTriples,
  castLiteral,
  typeValue,
  arrayify
} from './utils'

const post = (persist, getter) => async (doc) => {
  let Doc = structuredClone(doc)
  let ld = contextualize(Doc)
  const triples = await toTriples(ld)
  const result = await persist({ins: triples})
  console.log(result)
//   return Doc
  return true
}

const put = (persist, getter) => async (id, update) => {
  console.log(`put update:`)
  console.log(id, update)
  // let Doc = structuredClone(update)
  // Doc['@id'] = id
  // let ld = contextualize(Doc)
  // const ins = await toTriples(ld)
  // let del = Object
  //   .keys(update)
  //   .map(p => `<${id}> ${p.includes(':') ? p : ns(p)} ?o .`)
  // const result = await persist({ins, del})
  // const doc = await getter(`construct {<${id}> ?p ?o } where {<${id}> ?p ?o .}`)
  // let returnLD = await compact(doc)
  // return returnLD
  return true
}

const patch = (persist, getter) => async (id, update) => {
  console.log(`patch update:`)
  console.log(id, update)
  // this is a lot like PUT
  // let Doc = structuredClone(update)
  // Doc['@id'] = id
  // let ld = contextualize(Doc)
  // const ins = await toTriples(ld)
  // const result = await persist({ins})
  // const doc = await getter(`construct {<${id}> ?p ?o } where {<${id}> ?p ?o .}`)
  // let returnLD = await compact(doc)
  // return returnLD
  return true
}

const deleteStatements = (persist, getter) => async (id, update) => {
  console.log(`delet statements:`)
  console.log(id, update)
  // let del
  // if (update) {
  //   del = Object
  //     .keys(update)
  //     .map(p => Object
  //       .entries(update)[0][1]
  //       .map(o => `<${id}> ${p.includes(':') ? p : ns(p)} ${o.includes(':') ? `<${o}>` : `"${o}"`} . `)
  //     )
  //     .flat()
  //     .join(' ')
  // } else {
  //   del = `<${id}> ?p ?o .`
  // }
  // const result = await persist({del})
  // const doc = await getter(`construct {<${id}> ?p ?o } where {<${id}> ?p ?o .}`)
  // let returnLD = await compact(doc)
  // if (!returnLD['@id']) {
  //   return null
  // }
  // return returnLD
  return true
}

const getEntity = (getter) => async (id) => {
  console.log(`get thing by id:`)
  console.log(id)
  // let s = id.includes(':') ? `<${id}>` : sub(id)
  // const doc = await getter(`construct {${s} ?p ?o } where {${s} ?p ?o .}`)
  // let returnLD = await compact(doc)
  // return returnLD
  return {}
}

const getAll = (getter) => async () => {
  console.log(`get errything!`)
  const docs = await getter()
  return docs
}

const clear = (persist) => async () => {
  const result = await persist({del: `?s ?p ?o`})
  return result
}




// These are the functions that map between the triples we want to get/edit
// and the actual making a request to and from the pod endpoint we want.
const podPersister = (config) => {
  const authFetch = config.session.data.fetch
  const provider = new URL(config.session.data.info.webId)
  const endpoint = `${provider.origin}/${config.graph}.ttl`
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
      let response = await authFetch(endpoint)
      let nquads = await response.text()
      const doc = await fromTriples(nquads)
      const json = await compact(doc)
      return json
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
    put: put(persist, getter),
    patch: patch(persist, getter),
    get: getEntity(getter),
    getAll: getAll(getter),
    delete: deleteStatements(persist, getter),
    clear: clear(persist)
  }
}

export default SetupDB