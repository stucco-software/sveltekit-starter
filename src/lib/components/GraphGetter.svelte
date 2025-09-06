<script>
  const { graph } = $props()
</script>

{#await graph}
  <mark>loading…</mark>
{:then nodes}
  {#each nodes as node}
    <pre><code>{JSON.stringify(node, null, 2)}</code></pre>
  {/each}
{/await}

<style>
  pre {
    background-color: #f0f0f0;
    padding: 0.5rem;
    margin-block-end: 1rem;
  }
</style>