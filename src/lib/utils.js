import {
  PUBLIC_HOST
} from '$env/static/public'
import * as jsonld from 'jsonld'

export const serverValidation = async (session) => {
  let response = await session.fetch(`${PUBLIC_HOST}auth/confirm`)
  let data = await response.json()
  return data
}

// This thing tho, a classic of the genre.
export const arrayify = target => target
  ? Array.isArray(target)
    ? target
    : [target]
  : []