<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte'

import { makeCrossfade } from '../../atoms/animation.js'
import { done, checkbox as undo, terminateButton, deleteButton, pauseButton, actionLabelDone, task } from './style.js'

export let todos = []
export let remove = (todo) => console.log({ todo })
export let interupt = (todo) => console.log({ todo })
export let terminate = (todo) => console.log({ todo })

$: displayedTodo = todos.filter(t => t.inProgress && !t.deleted)

const dispatch = createEventDispatcher()
const [send, receive] = makeCrossfade(dispatch)
</script>

<style>

</style>

<h2>in progress</h2>
{#each displayedTodo as todo (todo.id)}
  <label
    class={actionLabelDone}
    in:receive="{{key: todo.id}}"
    out:send="{{key: todo.id}}"
    style={{padding: '4em'}}
  >
    <span class={task}>
      {todo.description}
      <button class={terminateButton} on:click="{() => terminate(todo)}">mark as done</button>
      <button class={deleteButton} on:click="{() => remove(todo)}">remove</button>
      <button class={pauseButton} on:click="{() => interupt(todo)}">pause</button>
    </span>
  </label>
{/each}
