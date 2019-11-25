<script>
import { onMount, createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher();
export let showConsole = false
export let id = "id"
export let height = 20;
onMount(()=>{
  height = document.getElementById(id).offsetHeight;
})
$: consoleShown = showConsole
const toggleConsoleMode=(event)=>{
  dispatch('update',{
    checked: consoleShown
  })
}
</script>
<style>
label{
  display: block;
  background-color: aqua;
}
</style>
<label id={id} for={`console-input-checkbox-${id}`}>
  <input id={`console-input-checkbox-${id}`} on:change={toggleConsoleMode} type="checkbox" bind:checked={consoleShown} />
  Console
</label>
