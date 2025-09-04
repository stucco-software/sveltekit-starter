<script>
  import { onMount } from 'svelte'
  const { db } = $props()

  let graph = $state([])

  const getGraph = async (db) => {
    let response = await db.getAll()
    let nodes = response['@graph']
      ? response['@graph']
      : [response]
    return nodes
  }

  onMount(async () => {
    graph = await getGraph(db)
    console.log(graph)
  })

</script>

{#each graph as node}
<pre><code>{JSON.stringify(node, null, 2)}</code></pre>
{/each}

<style>
  pre {
    background-color: #f0f0f0;
    padding: 0.5rem;
    margin-block-end: 1rem;
  }
</style>