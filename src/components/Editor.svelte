<script>


import { onMount, createEventDispatcher } from 'svelte';
import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
import Console from './Console.svelte'
import { AceEditor } from './Editor/index.js'
// Props
export let value = ''
export let grammar = 'text'
export let path = '/tutorial/README.md'




export const getNumberFieldOnIfExist = (id, field) =>
  document.getElementById(id)
    ? document.getElementById(id)[field]
    : 0

const dispatch = createEventDispatcher()

// Local state
$: config = {
  value,
  grammar,
  path
}
$: editorHeight = '300px'
$: consoleHeigth = 20
onMount(() => {
  editorHeight = `${document.getElementById('root').offsetHeight - document.getElementById('console').offsetHeight}px`
})
const consoleResize = (event) => {
  const {
    source,
    height
  } = event.detail
  delta =document.getElementById('root').offsetHeight - height
  editorHeight = `${document.getElementById('root').offsetHeight - height}px`
}
$: delta = 100
const [
  consoleReceive,
  consoleSend
] = crossfade({
  duration: d => Math.sqrt(d * 200),

  fallback(node, params) {
    const style = getComputedStyle(node);
    const height = style.height === 'none' ? '' : style.height;
    return {
      duration: 600,
      easing: quintOut,
      css: t => `
        height: ${getNumberFieldOnIfExist('body','offsetHeight')+delta*t}px
      `
    };
  }
})
const [
  aceEditorReceive,
  aceEditorSend
] = crossfade({
  duration: d => Math.sqrt(d * 200),

  fallback(node, params) {
    const style = getComputedStyle(node);
    const height = style.height === 'none' ? '' : style.height;
    return {
      duration: 600,
      easing: quintOut,
      css: t => `
        height: ${getNumberFieldOnIfExist('body','offsetHeight')-delta*t}px
      `
    };
  }
})

</script>
<div
  in:consoleReceive="{{key: config.path}}"
  out:consoleSend="{{key: config.path}}"
>
  <Console
    bind:height={consoleHeigth}
    bind:path={path}
    bind:grammar={grammar}
    on:resize={consoleResize}
  />
</div>
{#if config.value && config.grammar && config.path && editorHeight}
  <div
    in:aceEditorReceive="{{key: config.path}}"
    out:aceEditorSend="{{key: config.path}}"
  >
    <AceEditor
      bind:doc={config}
      bind:height={editorHeight}
    />
  </div>
{/if}
