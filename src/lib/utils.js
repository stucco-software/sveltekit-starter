import {
  PUBLIC_HOST
} from '$env/static/public'
import * as jsonld from 'jsonld'

export const serverValidation = async (session) => {
  let response = await session.fetch(`${PUBLIC_HOST}auth/confirm`)
  let data = await response.json()
  return data
}

export const context = {
  "@base": "https://vocab.rdf.systems/",
  "@vocab": "#"
}

export const contextualize = (doc) => {
  return {
    "@context": context,
    ...doc
  }
}

export const compact = async (doc) => {
  const compacted = await jsonld.compact(doc, context)
  delete compacted['@context']
  return compacted
}

export const fromTriples = async (nquads) => {
  if (jsonld.default) {
    return await jsonld
      .default
      .fromRDF(nquads, {format: 'application/n-quads'})
  } else {
    return await jsonld
      .fromRDF(nquads, {format: 'application/n-quads'})
  }
}

export const toTriples = async (doc) => {
  if (jsonld.default) {
    return await jsonld
      .default
      .toRDF(doc, {
        format: 'application/n-quads'
      })
  } else {
    return await jsonld
      .toRDF(doc, {
        format: 'application/n-quads'
      })
  }
}

// @todo
// cast other types like dates and times and shit
export const castLiteral = (type, lit) => {
  let result
  switch (type) {
    case boolean:
      result = lit == 'true' ? true : false
      break;
    default:
      result = lit
  }
  return result
}

// I forgot why I needed this.
export const typeValue = (o) => {
  let literal = o.value.replace(context['@base'], '')
  let v
  switch (o.type) {
    case 'literal':
      v = castLiteral(o.datatype, literal)
      break;
    case 'uri':
      v = {
        "@id": literal
      }
      break;
    default:
      v = literal
  }
  return v
}

// I also forget why I needed this.
export const ns = (p) => `<${context['@base']}${context['@vocab']}${p}>`
export const sub = (id) => `<${context['@base']}${id}>`

// This thing tho, a classic of the genre.
export const arrayify = target => target
  ? Array.isArray(target)
    ? target
    : [target]
  : []