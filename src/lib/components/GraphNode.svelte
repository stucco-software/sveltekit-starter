<script>
  import {
    graph
  } from "$lib/session.svelte.js"
  import JSONRow from "$lib/components/JSONRow.svelte"
  import {
    store
  } from "$lib/session.svelte.js"

  const {node} = $props()

  let editing = $state(false)

  const assumeType = (key, val) => {
    if (key === '@id') {
      return 'ID'
    }

    if (typeof val === 'Number') {
      return 'Number'
    }
    if (val === 'true' || val === true) {
      return 'Boolean'
    }
    if (val === 'false' || val === false) {
      return 'Boolean'
    }
    if (Number(val)) {
      return 'Number'
    }
    return 'String'
  }

  const flat = (obj) => {
    const keys = Object.keys(obj)
    const kvs = keys.map(key => {
      return [key, obj[key], assumeType(key, obj[key]),]
    })
    return kvs
  }

  let kvs = $state(flat(node))
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

  const update = (e) => {
    store.db.put(json['@id'], json)
  }
</script>

<div class="node">
<pre><code>{JSON.stringify(node, null, 2)}</code><button
    onclick={() => editing = !editing}>edit</button>
</pre>

{#if editing}
  <mark>editing…</mark>
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
        <JSONRow
          graph={graph}
          bind:kvs={kvs}
          i={i}>
        </JSONRow>
      {/each}
    </tbody>

    <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td>
          <form action="/" onsubmit={update}>
            <button>
              Save
            </button>
          </form>
        </td>
      </tr>
    </tfoot>
  </table>
{/if}
</div>

<style>
  .node {
    background-color: #f0f0f0;
    padding: 0.5rem;
    margin-block-end: 1rem;
  }
  pre {
/*margin-block-end: 1rem;*/
  }

  button {
    float: right;
  }

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
</style>