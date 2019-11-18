<script>
import WelcomePane from './WelcomePane.svelte'
import Editor from './Editor.svelte'
import List from './List.svelte'
import path from 'path'
import Layout from './Layout'
import GitTree from './GitTree.svelte'
import { fileExtensionRe } from '../matchers'
$: value = ''
$: grammar = 'text'
$: appPath = ''
$: editorContentLoading = false
$: currenPath = 'WelcomePane'
$: view = ['tree',{'./Welcome.md':'#window.location.hash'}]
$: source = {
  value,
  grammar,
  path: appPath
}
const findExtension = (path) => {
  for (let name in fileExtensionRe) {
    for (let extension of fileExtensionRe[name]) {
      if(extension.test(path)) {
        return name;
      }
    }
  }
  return 'text'
}
const loadEditor = (event) => {
  editorContentLoading = true
}

const renderEditor = (event)=>{
  editorContentLoading = false
  const editorMode = findExtension(event.detail.filepath)
  source.path = appPath =  currenPath = event.detail.filepath
  grammar = editorMode
  value =event.detail.value
  console.log({
    ...event.detail,
    grammar
  })
}

</script>

<style>
.editor {
  display: flex;
}

.editor .tree-view{
  /* flex-direction: column; */
  width: 30%;
}

.editor section{
  /* flex-direction: column; */
  max-width: 68%;
  min-width: 67%;
}
</style>
<section class="editor">
  <aside class="tree-view">
    <GitTree on:show={renderEditor} on:select={loadEditor}/>
  </aside>
  <section class="panes">
    {#if currenPath === 'WelcomePane'}
      <WelcomePane />
    {:else if currenPath === 'LoadingPane'}
      <div>
        loading ...
      </div>
    {:else}
      {#if !editorContentLoading}
        <Editor bind:value={value} bind:grammar={grammar} bind:path={appPath} />
      {/if}
    {/if}
  </section>
</section>
