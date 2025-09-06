<script>
  import UpdateNode from "$lib/components/UpdateNode.svelte"
  const { db, graph } = $props()
  let activeNode = $state(null)
</script>

<form>
  <label>Pick Node:</label>
  <select bind:value={activeNode}>
    {#await graph}
      <option>loading…</option>
    {:then nodes}
      {#each nodes as node}
        <option value={node["@id"]}>{node["@id"]}</option>
      {/each}
    {/await}
  </select>
  {#if activeNode}
    <UpdateNode db={db} bind:id={activeNode} />
  {/if}
</form>