<script>
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher();
export let showConsole = false
$: consoleShown = showConsole
const toggleConsoleMode=(event)=>{
  console.warn(consoleShown)
  dispatch('update',{
    checked: consoleShown
  })
}
</script>
<label>
  <input on:change={toggleConsoleMode} type="checkbox" bind:checked={consoleShown} />
  Console
</label>
