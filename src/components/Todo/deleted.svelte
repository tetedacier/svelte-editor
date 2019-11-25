<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte'

import { makeCrossfade } from '../../atoms/animation.js'
import { done, checkbox as undo, deleteButton, actionLabelDone, task } from './style.js'

export let todos = []
export let mark = (todo,done) => ({ todo, done })
export let remove= (todo) => ({ todo })

const dispatch = createEventDispatcher()
const [send, receive] = makeCrossfade(dispatch)
</script>

<style>

</style>

<h2>Deleted</h2>
{#each todos.filter(t => t.deleted) as todo (todo.id)}
  <label
    class={actionLabelDone}
    in:receive="{{key: todo.id}}"
    out:send="{{key: todo.id}}"
    style={{padding: '2em'}}
  >
    <span class={task}>
      <span>{todo.description}</span>
      <button class={reopenButton} on:click="{() => reopen(todo)}">reopen</button>
    </span>
  </label>
{/each}
