<script>
  import JSONRow from "$lib/components/JSONRow.svelte"

  const { db } = $props()

  let initialState = [[null, null, null]]
  let kvs = $state(initialState)

  const addKV = () => {
    kvs = [...kvs, [null, null]]
  }

  let id = `urn:uuid:${crypto.randomUUID()}`

  let json = $derived.by(() => {
    let object = kvs.reduce((acc, cur) => {
      if (cur[0] && cur[1]) {
        acc[cur[0]] = cur[1]
      }
      return acc
    }, {
      '@id': id
    })
    return object
  })


  const reloadGraph = new Event("reloadGraph")
  const create = async () => {
    let ref = await db.post(json)
    document.dispatchEvent(reloadGraph)
    kvs = initialState
    id = `urn:uuid:${crypto.randomUUID()}`
  }
</script>

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    {#each kvs as kv, i}
      <JSONRow bind:kvs={kvs} i={i}></JSONRow>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td>
        <form action="/" onsubmit={addKV}>
          <button>
            Add Key/Value Pair
          </button>
        </form>
      </td>
    </tr>
  </tfoot>
</table>


<output>
  <pre><code>{JSON.stringify(json, null, 2)}</code></pre>

  <button onclick={create}>
    Save Object
  </button>
</output>



<style>
  table {
    width: 100%;
  }
  th {
    text-align: left;
  }
  select,
  input {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
  }
  th, td {
    padding-inline: 0.25rem;
  }
  tfoot td {
    text-align: right;
  }

  output button {
    float: right;
  }
  output pre {
    background-color: #f0f0f0;
    padding: 0.5rem;
  }
</style>