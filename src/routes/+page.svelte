<script>
  import { onMount } from 'svelte'
  import { clientSession } from "$lib/session.svelte.js"
  import SetupDB from "$lib/crud.js"
  import JSONPoster from '$lib/components/JSONPoster.svelte'
  import GraphGetter from '$lib/components/GraphGetter.svelte'
  import NodeUpdater from '$lib/components/NodeUpdater.svelte'

  let db = $state(null)

  const reloadGraph = new Event("reloadGraph")

  const getNodes = async (db) => {
    if (!db) {
      return []
    }
    let nodes = await db.getAll()
    return nodes
  }

  let graph = $derived.by(async () => {
    let nodes = await getNodes(db)
    return nodes
  })

  const updateGraph = async () => {
    graph = await getNodes(db)
  }

  onMount(async () => {
    document.addEventListener('reloadGraph', updateGraph, false)
  })

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

  <p>This starter kit uses SvelteKit server endpoints to validate a user against the applicatins internal store for persmissions and access control.</p>

  {#if db}
    <h2>
      Create
    </h2>
    <JSONPoster bind:db={db} bind:graph={graph}/>

    <h2>
      Read
    </h2>
    <GraphGetter bind:graph={graph}/>
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