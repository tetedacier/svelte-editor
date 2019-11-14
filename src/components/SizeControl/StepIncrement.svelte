<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let stepSize = 0
export let RE = false
export let unit = false
export let ending = false
export let unitHeight = '0'
export let pxHeight = '42px'
export let editedValue ='0'
$: height = pxHeight.slice(0, -2);

const incrementEvent = (event) => {
  const source = 'increment'
  editedValue = `${parseFloat(editedValue.slice(0, -unit.length), 10) + stepSize}${unit}`
  dispatch(
    'update', {
      height: editedValue,
      source
    }
  )
}

const decrementEvent = (event) => {
  const source = 'decrement'
  editedValue = `${parseFloat(editedValue.slice(0, -unit.length), 10) - stepSize}${unit}`
  dispatch(
    'update', {
      height: editedValue,
      source
    }
  )
}
</script>
<style>
input {
  text-align: right;
  width: 3em;
}
.control {
 display: inline-flex;
 flex-direction: row;
}
.control button {
  height: 50%;
}
</style>

<span class="control">
  <button
    on:click={decrementEvent}
    type="button"
    name="decrement"
    title={`Decrease actual virtual-list height by ${stepSize}${unit}`}
  >
    -
  </button>
  <button
    on:click={incrementEvent}
    type="button"
    name="increment"
    title={`Increase actual virtual-list height by ${stepSize}${unit}`}
  >
    +
  </button>
</span>
<hr />
<label>
  <input
    on:change={(event)=>{
      stepSize = parseFloat(event.srcElement.value)
    }}
    bind:value={stepSize}
  />
  {unit}
</label>
