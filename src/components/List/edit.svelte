<script>
import svelte, { onMount, onDestroy } from 'svelte'
import SizeControl from './sizeControl.svelte'
const handlers = []
/**
 * @param selector String [css selector string]()
 */


export let editedHeigth = '300px';
$: heigth = editedHeigth;

const formSubmitEvent =  (event) => {
  console.log('prevent');

  event.preventDefault();
  return false
}
const heightChangeEvent = (event) => {
  const {srcElement: {value} } = event

  editedHeigth = value
}
</script>

<style>
  fieldset {
    display: inline;
  }
</style>

<form on:submit={formSubmitEvent}>
  <fieldset>
    <legend>Update Component height</legend>
    <input on:change={heightChangeEvent} type="text" value={heigth} />
    <SizeControl bind:editedHeigth={editedHeigth} />
  </fieldset>
</form>
