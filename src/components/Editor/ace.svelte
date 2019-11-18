<script>
import { onMount } from 'svelte'
export let doc = {
  path: '',
  grammar: 'text',
  value : '',
  rid: ''
}

const createEditMode = (grammarMode) => {
  const EditMode =ace.require(`ace/mode/${grammarMode}`).Mode;
  // insertOptionsHere
  return new EditMode()
}
$: aceEditor = undefined
$: path = doc.path
$: grammar = doc.grammar
$: value = doc.value
$: rid = doc.rid
onMount(() => {
  let editor = ace.edit(aceEditor)
  console.log({
    path,
    grammar,
    value
  })

  // const EditMode  = ace.require(`ace/mode/${sessionGrammar}`).Mode
  editor.setTheme("ace/theme/monokai")
  editor.session.setMode(createEditMode(grammar))
  editor.session.setValue(value)
})
</script>

<style>
.editor {
    width: 100%;
    height: 300px;
}
</style>

<section>
  {#if path && grammar && value }
    <div class="editor" bind:this={aceEditor}>{value}</div>
  {/if}
</section>
