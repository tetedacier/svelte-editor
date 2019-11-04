<script>
import { onMount } from 'svelte';

$:editedValue = `h1 {
	color: purple;
}
.container {
	min-height: 200px;
	height: 100%;
	max-height: 300px;
}`

let aceEditor

onMount(() => {
  var editor = ace.edit(aceEditor)
  editor.setTheme("ace/theme/monokai")
  var CssMode = ace.require("ace/mode/css").Mode
  editor.session.setMode(new CssMode())
  // editor.setValue(editedValue)
})

</script>
<style>
.editor {
    width: 100%;
    height: 300px;
}
</style>

<div class="editor" bind:this={aceEditor}>{editedValue}</div>
