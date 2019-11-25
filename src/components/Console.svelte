<script>
import { createEventDispatcher, onMount, beforeUpdate, afterUpdate, tick } from 'svelte'
import { fade, fly } from 'svelte/transition';

import ConsoleLabel from './Console/label.svelte'

$: consoleLabelHeight = 20

export let grammar = 'text'
export let path = ''
export const getNumberFieldOnIfExist = (id, field) =>
  document.getElementById(id)
    ? document.getElementById(id)[field]
    : 0

afterUpdate(()=> {
  console.warn(getNumberFieldOnIfExist('console','offsetHeight'))
})
beforeUpdate(()=> {
  console.warn(getNumberFieldOnIfExist('console','offsetHeight'))
})

$: showConsole = false
$: consoleContentHeight = 0;
const dispatch = createEventDispatcher();

const updateConsoleDisplay = async (event) => {
  const consoleContent=document.getElementById('console-content')
  if(consoleContent) {
    console.warn(consoleContent);
  }
  showConsole = event.detail.checked
}
const resize = (source) => (event) => {
  tick()
  tick()
  tick()
  tick()
  tick()
  console.warn({ source, showConsole, event, heigth: document.getElementById('console').offsetHeight })
  dispatch('resize', {
    source,
    height: (source ==='out')?document.getElementById('console-content').offsetHeight:0
  })
}
onMount(() => {
  // consoleContentHeight = document.getElementById('console-content').offsetHeight;
  // console.warn(consoleContentHeight)
})

</script>
<style>
fieldset {
  background-color: azure;
}

</style>
<form id="console">
  <ConsoleLabel id="console-label" on:update={updateConsoleDisplay} showConsole={showConsole} bind:height={consoleLabelHeight}/>
  {#if showConsole}
    <fieldset
      id="console-content"
    >
      <legend>
      </legend>
      <code class={grammar}>{path}</code>
    </fieldset>
  {/if}
</form>
