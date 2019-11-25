<script>
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import Todo from './Todo/todo.svelte'
  import InProgress from './Todo/in-progress.svelte'
  import Done from './Todo/done.svelte'
  import {  board,  actionLabel } from './Todo/style.js'
  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `
      };
    }
  });
  const suspend = (todo) => Object.assign(todo, {inProgress: false}, {...
    (()=>{
      let { startDate, duration } = todo
      if(!startDate) throw new Error('missing start date on inProgress item')
      let updatedRecord = { endDate: Date.now(), startDate }
      if(!duration) {
        duration = [updatedRecord]
      } else {
        duration.push(updatedRecord)
      }
      startDate = undefined
      return {
        duration,
        startDate
      }
    })()
  })

  export let todos = [];

  const add = (input) => {
    todos[todos.length-1].id
    const todo = {
      id: todos.length===0
        ? 1
        : todos[todos.length-1].id + 1,
      done: false,
      description: input.value
    };

    todos = [...todos, todo];

    input.value = '';
  }

  const start = (todo) => {
    todos = todos.map(t=>todo.id === t.id
      ? Object.assign(t, {
        inProgress: true,
        startDate: Date.now()
      })
      : (t.inProgress
          ? suspend(t)
          : t
        )
    )
  }

  const terminate = (todo) => {
    todos = todos.map(t=>todo.id === t.id
      ? Object.assign(suspend(t), {inProgress: false, done: true})
      : t
    )
  }

  const reopen = (todo) => {
    todos = todos.map(t=>todo.id === t.id
      ? Object.assign(t, {defect: true, deleted: false })
      : t
    )
  }

  const interupt = (todo) => {
    todos = todos.map(t=>todo.id === t.id
      ? suspend(t)
      : t
    )
  }

  const remove = (todo) => {
    todos = todos.map(t => (t.id === todo.id)
      // Prevent deletion of defect
      ? ((t.defect)?t:Object.assign(t, {deleted:true}))
      : t
    )
  }

  const mark = (todo, done) => {
    todos = todos.map(t => (t.id === todo.id)
      ? Object.assign(t, done)
      : t
    )
  }
</script>
<label class={actionLabel}>
  <h2>what needs to be done?</h2>
  <input
    placeholder="bills ..."
    on:keydown={e => e.which === 13 && add(e.target)}
  >
</label>
<div class={board}>

  <div class='left'>
    <Todo start={start} terminate={terminate} interupt={interupt} mark={mark} remove={remove} bind:todos={todos} />
  </div>

  <div class='left'>
    <InProgress terminate={terminate} interupt={interupt} mark={mark} remove={remove} bind:todos={todos} />
  </div>

  <div class='right'>
    <Done terminate={terminate} interupt={interupt} mark={mark} remove={remove} bind:todos={todos} />
  </div>
</div>

<style>
  :global(body) {
    color: #333;
    margin: 0;
    padding: 8px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  :global(label) {
    display: block;
  }
</style>
