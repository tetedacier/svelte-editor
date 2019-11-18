<script>
import ConsoleLabel from './Console/label.svelte'
export let grammar = 'text'
export let path = ''
$: showConsole = false
const updateConsoleDisplay = async (event) => {
  showConsole = event.detail.checked
}
</script>
<form>
  {#if showConsole}
    <ConsoleLabel on:update={updateConsoleDisplay} showConsole={showConsole}/>
    <fieldset>
      <legend>
      </legend>
      <code class={grammar}>{path}</code>
    </fieldset>
  {:else}
    <ConsoleLabel on:update={updateConsoleDisplay}  showConsole={showConsole} />
  {/if}
</form>
