import * as jwt from 'jsonwebtoken'
import { error, json } from "@sveltejs/kit"
import { getDPoP } from "$lib/auth.js"

// Process DPoP header in the server.
export const GET = async ({request, url}) => {
  const authHeader = request.headers.get('authorization')
  const token = await getDPoP(authHeader)
  return json(token)
};