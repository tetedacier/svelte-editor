<script>
import {onDestroy, onMount} from 'svelte'
const handlers = []


export let editedHeigth = '100px';
$: height = editedHeigth;
const dimensionRe = {
  px: {
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))px$/,
    increment: 100,
    limit: {
      min: 0
    }
  },
  em: {
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))em$/,
    increment: 10,
    limit: {
      min: 0
    }
  },
  rem: {
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))em$/,
    increment: 10,
    limit: {
      min: 0
    }
  },
  '%':{
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))%$/,
    increment: 10,
    limit: {
      min: 0,
      max:100
    }
  }
}

onMount(() => {
  Array.from(document.querySelectorAll('fieldset button[name="addHeight"]')).map(update=>{
    let eventName = 'click'
    handlers.push({
      node: update,
      event: eventName,
      handler: update.addEventListener(eventName, (event) => {
        editedHeigth = editedHeigth.replace(
          /^((?:0)|(?:[1-9][0-9]*))px$/,
          (stringMatched, rawHeight) =>
            parseInt(rawHeight, 10) + 100 <0
              ? '0px'
              : `${parseInt(rawHeight, 10) + 100}px`
        ).replace(
          /^.*[^p][^x]$/,
          () => `0px`
        )
        console.warn(editedHeigth)
      })
    })
  })

  Array.from(document.querySelectorAll('fieldset button[name="minusHeight"]')).map(update=>{
    let eventName = 'click'
    handlers.push({
      node: update,
      event: eventName,
      handler: update.addEventListener(eventName, (event) => {
        editedHeigth = editedHeigth.replace(
          dimensionRe.px.RE,
          (stringMatched, rawHeight) =>
            parseInt(rawHeight, 10) - 100 < 0
              ? '0px'
              : `${parseInt(rawHeight, 10) - 100}px`
        ).replace(
          /^.*[^p][^x]$/,
          () => `0px`
        )

        console.warn(editedHeigth)
      })
    })
  })
})

onDestroy(() => {
  handlers.map(entry => {
    entry.node.removeEventListener(entry.event, entry.handler)
  })
})
</script>

<style>
  fieldset {
    display: inline;
  }
  fieldset > button {
    height: 50%;
  }
</style>

<span>
  <fieldset>
    <button type="button" name="minusHeight" title="Substract 100 pixels to the list height">-</button>
    <button type="button" name="addHeight" title="Add 100 pixels to the list height">+</button>
  </fieldset>
</span>
