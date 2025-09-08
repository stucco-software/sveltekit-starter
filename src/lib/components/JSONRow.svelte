<script>
  let { graph, kvs, i } = $props()
  let type = $state(kvs[i][2] || 'String')
  $inspect(graph)
</script>

<tr>
  <td><input bind:value={kvs[i][0]} type="text" name="key"></td>
  <td>
    <select bind:value={type}>
      <option value="ID">@id</option>
      <option value="String">String</option>
      <option value="Number">Number</option>
      <option value="Boolean">Boolean</option>
      <option value="@id">Relation</option>
    </select>
  </td>
  <td>
    {#if type === 'ID'}
      <input bind:value={kvs[i][1]} type="text" name="key">
    {/if}
    {#if type === 'String'}
      <input bind:value={kvs[i][1]} type="text" name="key">
    {/if}
    {#if type === 'Number'}
      <input bind:value={kvs[i][1]} type="number" name="key">
    {/if}
    {#if type === 'Boolean'}
      <input bind:checked={kvs[i][1]} type="checkbox" name="key">
    {/if}
    {#if type === '@id'}
      <select bind:value={kvs[i][1]} name="key">
        {#await graph}
          <option>loading…</option>
        {:then nodes}
          {#each nodes as node}
            <option value={node["@id"]}>{node["@id"]}</option>
          {/each}
        {/await}
      </select>
    {/if}
  </td>
</tr>
