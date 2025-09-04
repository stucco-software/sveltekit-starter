<script>
  let { kvs, i } = $props()
  let type = $state('String')
</script>

<tr>
  <td><input bind:value={kvs[i][0]} type="text" name="key"></td>
  <td>
    <select bind:value={type}>
      <option value="String">String</option>
      <option value="Number">Number</option>
      <option value="Boolean">Boolean</option>
      <option value="@id">Relation</option>
    </select>
  </td>
  <td>
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
      <select>
        <option>tktk</option>
      </select>
    {/if}
  </td>
</tr>