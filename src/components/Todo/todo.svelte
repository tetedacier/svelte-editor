<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import {checkbox as markDone, handleButton,  deleteButton, actionLabel, task } from './style.js'
import { makeCrossfade } from '../../atoms/animation.js'
export let todos = []

export let remove = (todo) => console.log({ todo })
export let start = (todo) => console.log({ todo })
const dispatch = createEventDispatcher();
const [send, receive] = makeCrossfade(dispatch)

</script>

<style>

</style>

<h2>todo</h2>
{#each todos.filter(t => !t.done && !t.deleted && !t.inProgress) as todo (todo.id)}
  <label
    class={actionLabel}
    in:receive="{{key: todo.id}}"
    out:send="{{key: todo.id}}"
    style={{padding: '2em'}}
  >
    <span class={task}>
      <span>{todo.description}</span>
      <button class={handleButton} on:click="{() => start(todo)}">handle</button>
      <button class={deleteButton} on:click="{() => remove(todo)}">remove</button>
    </span>
  </label>
{/each}

