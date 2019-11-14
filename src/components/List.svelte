<script>
import ListEdit from './List/edit.svelte'
import VirtualList from '@sveltejs/svelte-virtual-list'
import ListItem from './ListItem.svelte'
let start
let end
$: height = '500px'

$: editorShown = false;
const toggleEditor = (event) => {
  editorShown = event.srcElement.checked
}
export let things
</script>
<style>
.editor {
  z-index:2;
  background: #FFFFFF;
  border: 1px solid blue;
  border-radius: 4px;
  position: absolute;
  top: 32px;
}

.container {
  z-index:1;
}

</style>
<form>
  <label>
    <input on:change={toggleEditor} type="checkbox" name="editor" bind:value={editorShown} />
    show editor
  </label>
</form>

{#if editorShown }
  <div class="editor">
    <ListEdit
      bind:pxHeight={height}
    />
  </div>
{/if}

<section>
  <div class="container">
    <VirtualList items={things} height={height} bind:start bind:end let:item>
      <ListItem {item} />
    </VirtualList>
  </div>
  <p>showing items {start}-{end}</p>
</section>
