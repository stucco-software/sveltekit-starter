<script>
  import { redirect } from "@sveltejs/kit"
  import {onMount} from 'svelte'
  import {
    EVENTS,
    getDefaultSession,
    handleIncomingRedirect
   } from '@inrupt/solid-client-authn-browser'
  import { serverValidation } from '$lib/utils.js'

  let session

  onMount(async () =>{
    await handleIncomingRedirect({
      restorePreviousSession: true
    })
    session = getDefaultSession()
    session.events.on(EVENTS.SESSION_RESTORED, (url) => {
      redirect(url)
    })

    const payload = await serverValidation(session)
    console.log(payload)
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