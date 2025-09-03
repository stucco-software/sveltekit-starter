import {
  PUBLIC_HOST
} from '$env/static/public'

export const serverValidation = async (session) => {
  let response = await session.fetch(`${PUBLIC_HOST}auth/confirm`)
  let data = await response.json()
  return data
}