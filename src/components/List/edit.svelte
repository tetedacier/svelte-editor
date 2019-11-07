<script>
import svelte, { onMount, onDestroy } from 'svelte'
import SizeControl from './sizeControl.svelte'
const handlers = []
/**
 * @param selector String [css selector string]()
 */
class Selector {
  static get(cssSelector) {
    return Array.from(document.querySelectorAll('form'))
  }
  static handledEvents (appliedEvent) {
    const handlers = []

    onMount()
    onDestroy()
  }

  static onMount () {

    handlers.concat(Array.from(document.querySelectorAll('form')).map(form => ({
      node: form,
      event: 'submit',
      handler: form.addEventListener('submit', (event) => {
        event.preventDefault();
        return false
      })
    })))

    let eventName = 'change'
    Array.from(document.querySelectorAll('fieldset input[name="height"]')).map()
  }

  static onDestroy () {
    handlers.map(entry => {
      entry.node.removeEventListener(entry.event, entry.handler)
    })
  }
  static handleSelector (cssSelector, handler) {
  }
}

export let editedHeigth = '300px';
$: heigth = editedHeigth;

// ['onMount', 'onDestroy'].reduce()
</script>

<style>
  fieldset {
    display: inline;
  }
</style>

<form>
  <fieldset>
    <legend>Update Component height</legend>
    <input name="height" type="text" value={heigth} />
    <SizeControl bind:editedHeigth={editedHeigth} />
  </fieldset>
</form>
