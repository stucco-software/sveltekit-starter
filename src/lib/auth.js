import * as jwt from 'jsonwebtoken'

// Accepts a String from the Authorization Header of a request
// ex: `DPoP 1234WOWCOOLJWTOMG`
// Returns a JSON object of the token payload
// ex: {
//  "webid":"https://webid.login.stucco.software/profile/card#me",
//  "client_id":"https://stucco.software/applications/sveltekit-hybrid-starter.json",
//  "iss":"https://login.stucco.software/",
//  …
// }
export const getDPoP = async (authorizationHeader) => {
  const [type, dpop] = authorizationHeader.split(' ')
  if (type !== 'DPoP') {
    return error(401, "DPoP Token Required")
  }
  const token = jwt.decode(dpop, {complete: true})
  // TKTK: VERIFY THIS TOKEN! GODAMN!
  //       It should be possible with the embedded header
  //       But then we need to make sure these can't be forged
  //       by making self-created certs with random webIDs.
  return token.payload
}

export const getServerInfo = async (request) => {
  // Now we can take any request from the client and grab the auth header…
  const authorizationHeader = request.headers.get('authorization')
  // Turn that header into a JSON object for the user…
  const token = await getDPoP(authorizationHeader)
  // And grab the WebID of the user. Now we know who the request is from!
  const webID = token.webid
  // We can make a function that accepts a webID,
  const canThisWebidDoThat = async (webID) => {
    // checks againt storage for some data about that webID…
    // eg: let permission = db.someCoolQuery(webID)
    return true
  }
  // And now we can auth wall parts of this application based on WebID!
  const userHasPermission = await canThisWebidDoThat(webID)
}
