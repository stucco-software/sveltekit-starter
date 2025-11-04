<script>
  import JSONRow from "$lib/components/JSONRow.svelte"
  import {
    arrayify
  } from '$lib/utils.js'
  import {
    getDB,
    graph
  } from "$lib/session.svelte.js"

  const reloadGraph = new Event("reloadGraph")
  const db = getDB()

  const newRow = () => [
    ['@id', `urn:uuid:${crypto.randomUUID()}`, 'ID']
  ]

  let kvs = $state(newRow())
  const addKV = () => {
    kvs = [...kvs, [null, null, null]]
  }

  // Turns an array of key:values into a JSON object.
  // TKTK turn this into a function with like, unit tests.
  let json = $derived.by(() => {
    let object = kvs.reduce((acc, cur) => {
      // Yes I know this is painful to look at…
      // take an object `acc`
      // if we have a key
      if (cur[0]) {
        // we want to re-assign the key on the object
        acc[cur[0]] = acc[cur[0]]
          // if the key exists, add the value to an array of extant values
          ? [...arrayify(acc[cur[0]]), cur[1]]
          // otherwise just assign the key to the value
          : cur[1]
      }

      return acc
    }, {})
    return object
  })

  const create = async () => {
    let ref = await db.post(json)
    kvs = newRow()
    document.dispatchEvent(reloadGraph)
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
      <JSONRow graph={graph} bind:kvs={kvs} i={i}></JSONRow>
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