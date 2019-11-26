<script>
import { onMount } from 'svelte'
import WelcomePane from './WelcomePane.svelte'
import Editor from './Editor.svelte'
import List from './List.svelte'
import GitTree from './GitTree.svelte'
import { fileExtensionRe } from '../matchers'

onMount(()=>{
  const windowOnResize = (event) => {
    const {
      offsetHeight: height,
      offsetWidth: width
    } = document.getElementById('root')
    Array.from(document.querySelectorAll(['tree-view','panes'].map(classToken=>`.${classToken}`).join(','))).forEach(node => {
      node.style.height = `${height}px`
    })
  }

  [
    'resize',
    'deviceorientation',
    'deviceorientationabsolute'
  ].map(eventName => window.addEventListener(eventName, (event) => {
    event.srcName = eventName
    windowOnResize(event)
  }))
})

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
}
</script>

<style>

:global(#root) {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.panes,
.tree-view {
  overflow: scroll;
}

.editor {
  display: flex;
  height: 100%;
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

<section id="editor-wrapper" class="editor">
  <aside class="tree-view" >
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
