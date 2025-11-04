<script>
  import { onMount } from 'svelte'
  import { clientSession } from "$lib/session.svelte.js"
  import SetupDB from "$lib/crud.js"
  import JSONPoster from '$lib/components/JSONPoster.svelte'
  import GraphGetter from '$lib/components/GraphGetter.svelte'
  import NodeUpdater from '$lib/components/NodeUpdater.svelte'
</script>

<div class="container">
  <h1>Stucco Software SvelteKit Starter Kit</h1>
  <p>
    This is a sample application for using SolidID to create an application with authenticated persistence to a user-provided identity and data store.
  </p>

  <p>This starter kit uses SvelteKit server endpoints to validate a user against the applicatins internal store for persmissions and access control.</p>

  {#if clientSession.data?.info?.isLoggedIn}
    <h2>
      Create
    </h2>
    <JSONPoster />

    <h2>
      Read
    </h2>
    <GraphGetter />
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