<script>
  let { id, db } = $props()
  let nodePromise = $derived.by(async () => await db.get(id))
</script>


<h3>{id}</h3>
{#await nodePromise}
  <mark>loading…</mark>
{:then node}
  {#each Object.entries(node) as entry}
    {@const key = entry[0]}
    {@const val = entry[1]}

    <!-- This UI is actually kind of hard. -->
    <!--
      We need to…
        Show single values for any given key
        Show array of values for any given key
        Edit any given value on said key
        Add vales to the array, or make an array with the single current value
        Remove values from the array.
     -->
    <dl>
      <dt>{key}</dt>
      <dl>
        <input value={val} type="text" name="{key}">
      </dl>
    </dl>
  {/each}
{/await}