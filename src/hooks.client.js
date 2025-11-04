import {
  setGraph
} from "$lib/session.svelte.js"

import {
  handleIncomingRedirect
} from '@inrupt/solid-client-authn-browser'

export const init = async () => {
  // On Page refresh, check if we can restore a session.
  await handleIncomingRedirect({
    restorePreviousSession: true
  })
  setGraph([])
};