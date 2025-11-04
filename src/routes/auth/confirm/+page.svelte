<script>
  import { goto } from "$app/navigation"
  import SolidState from "solidstate-kv"
  import {onMount} from 'svelte'
  import {
    EVENTS,
    getDefaultSession,
    handleIncomingRedirect
   } from '@inrupt/solid-client-authn-browser'
  import { serverValidation } from '$lib/utils.js'
  import {
    setSession,
    setDB,
    setGraph
  } from "$lib/session.svelte.js"

  let session

  onMount(async () => {
    // This needs to be called when the redirect page loads.
    // However, since we need to call this when the app starts
    // in order to resuem sessions between reloads,
    // this is being called in the `hooks.client.js` init fn.
    // await handleIncomingRedirect({
    //   restorePreviousSession: true
    // })

    session = getDefaultSession()
    session.events.on(EVENTS.SESSION_RESTORED, (url) => {
      console.log(EVENTS.SESSION_RESTORED, url)
      setSession(session)
      goto(url)
    })

    console.log(`SET SESSION!`)
    setSession(session)
    let db = SolidState({
      session: session,
      graph: `sveltekit-demo-graph`
    })
    setDB(db)
    let graph = await db.getAll()
    setGraph(graph)
    goto( '/')

    // We can validate our session on the server
    // So our server knows who is at the other end
    // of any given request.
    // See /lib/auth.js for more!
    // const payload = await serverValidation(session)
    // console.log(payload)
  })

</script>
<h1>
  Logging in…
</h1>

{#if session}
<pre><code>
{JSON.stringify(session.info, null, 2)}
</code></pre>
{/if}