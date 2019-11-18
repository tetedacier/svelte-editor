<script>
import { onMount, createEventDispatcher } from 'svelte';
import Console from './Console.svelte'
import { AceEditor } from './Editor/index.js'
// Props
export let value = ''
export let grammar = 'text'
export let path = '/tutorial/README.md'

const dispatch = createEventDispatcher()

// Local state
$: config = {
  value,
  grammar,
  path
}

onMount(() => {
  console.log({raw:{
    path,
    value,
    grammar
  }, config})
})

</script>
<Console
  bind:path={path}
  bind:grammar={grammar}
/>
{#if config.value !== '' && config.grammar && config.path}
  <AceEditor
    bind:doc={config}
  />
{/if}
