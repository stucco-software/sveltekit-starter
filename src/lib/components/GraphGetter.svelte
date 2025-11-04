<script>
  import {
    graph
  } from "$lib/session.svelte.js"

  import GraphNode from "$lib/components/GraphNode.svelte"
  console.log(graph)
</script>

{#await graph.data}
  <mark>loading…</mark>
{:then nodes}
  {#each nodes as node}
    <GraphNode node={node} />
  {/each}
{/await}

<style>
  pre {
    background-color: #f0f0f0;
    padding: 0.5rem;
    margin-block-end: 1rem;
  }
</style>