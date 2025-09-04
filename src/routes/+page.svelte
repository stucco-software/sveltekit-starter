<script>
  import { clientSession } from "$lib/session.svelte.js"
  import SetupDB from "$lib/crud.js"
  import JSONPoster from '$lib/components/JSONPoster.svelte'
  import GraphGetter from '$lib/components/GraphGetter.svelte'

  let db = $state(null)
  $effect(() => {
    if (clientSession.data?.info?.isLoggedIn) {
      db = SetupDB({
        session: clientSession,
        graph: `sveltekit-demo-graph`
      })
    }

  })

</script>

<div class="container">

  <h1>Stucco Software SvelteKit Starter Kit</h1>
  <p>
    This is a sample application for using SolidID to create an application with authenticated persistence to a user-provided identity and data store.
  </p>

  {#if db}
    <h2>
      Create
    </h2>
    <JSONPoster bind:db={db} />

    <h2>
      Read
    </h2>
    <GraphGetter bind:db={db} />
  {:else}
    <blockquote>
      <a href="/auth">Log in</a> to get started.
    </blockquote>
  {/if}

</div>

<style>
  .container {
    max-width: 35rem;
    margin-inline: auto;
  }
</style>