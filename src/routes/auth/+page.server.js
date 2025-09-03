import { redirect } from '@sveltejs/kit'
import {
  CLIENT_ID,
  HOST,
  PROVIDER
} from '$env/static/private'
import {
  EVENTS,
  getSessionFromStorage,
  Session
} from "@inrupt/solid-client-authn-node"


const updateSessionCache = async (sessionId, authorizationRequestState) => {
  // sessionCache[sessionId] = authorizationRequestState;
  console.log(EVENTS.AUTHORIZATION_REQUEST)
  console.log(authorizationRequestState)
  console.log(sessionId)
  // @tktk: Put this in a triplestore!
  // const doc = {
  //   "@context": {
  //     "@vocab": "https://login.stucco.software/oidc#"
  //   },
  //   "@id": `urn:uuid:${sessionId}`,
  //   ...authorizationRequestState
  // }
  // const nquads = await jsonld.toRDF(doc, {format: 'application/n-quads'});
  // console.log(doc)
  // console.log(nquads)
  // await fetch('https://stucco-store.fly.dev/update', {
  //   method: 'POST',
  //   headers: headers,
  //   body: new URLSearchParams({
  //     'query': `
  //     insert data {
  //       ${nquads}
  //     }
  //   `
  //   })
  // })
  // console.log(`--------------------------`)
};


export const actions = {
  login: async ({cookies, request}) => {
    const session = new Session({ keepAlive: false })
    cookies.set('session', session.info.sessionId, {path: '/'})
    session.events.on(EVENTS.AUTHORIZATION_REQUEST, updateSessionCache(session.info.sessionId))
    await session.login({
      clientId: CLIENT_ID,
      redirectUrl: `${HOST}auth/confirm`,
      oidcIssuer: PROVIDER,
      clientName: "Stucco Data Collective",
      handleRedirect: (url) => redirect(302, url)
    })
  },

  webid: async ({cookies, request}) => {
  },

  logout: async({cookies}) => {
    const sessionId = cookies.get('session')
    const session = await getSessionFromStorage(sessionId)
    await session.logout()
    cookies.delete('session', {path: '/'})
    redirect(302, host)
  }
}