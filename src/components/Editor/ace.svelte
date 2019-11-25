<script>
import { onMount, beforeUpdate, afterUpdate } from 'svelte'
export let height = "300px"
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


const resize = () => {
  let editor = ace.edit(aceEditor)
  editor.container.style.height = height
  editor.resize()
}
beforeUpdate(() => {
  resize()
})
afterUpdate(() => {
  resize()
})
onMount(() => {
  let editor = ace.edit(aceEditor)
  editor.setTheme("ace/theme/monokai")
  editor.session.setMode(createEditMode(grammar))
  editor.session.setValue(value)
  resize()
})
</script>

<style>
#editor {
  width: 100%;
  height: 300px;
}
</style>

<section>
  {#if path && grammar && value }
    <div id="editor" bind:this={aceEditor}>{value}</div>
  {/if}
</section>
