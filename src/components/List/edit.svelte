<script>
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import SizeControl from '../SizeControl'

import { unitRe } from '../../matchers'
const dispatch = createEventDispatcher();
const {
  px: PxSizeControl,
  em: EmSizeControl,
  rem: RemSizeControl,
  ratio: RatioSizeControl
} = SizeControl;

export let pxHeight = '300px';
$: heigth = pxHeight;
$: mode = 'px'
$: modes = {
  px: (mode === 'px'),
  em: (mode === 'em'),
  rem: (mode === 'rem'),
  ratio: (mode === 'ratio'),
}
$: SelectedControl = SizeControl[mode]
const formSubmitEvent =  (event) => {
  event.preventDefault();
  return false
}

const identifyMode = (dimension) => (value) => {
  for (let unit in dimension) {
    if(unitRe('px').test(value)) {
      pxHeight = value
    }

    if(unitRe(unit).test(value)) {
      mode = unit
      return unit
    }
  }
}

const pxHeightChangeEvent = (event) => {
  const {srcElement: {value} } = event

  valueMode =identifyMode(SizeControl)(value)
  if(valueMode && mode !== valueMode) {
    mode = valueMode
    SelectedControl = SizeControl[valueMode];
    pxHeight = SizeControl[valueMode].toPx(value)
  } else {
    pxHeight = '0px'
  }
}
const heightApproximationChangeEvent = (event) => {

}

// onMount((event)=> {

// })
const setMode = (unit) => (event) => {
  if(event.srcElement.checked){
    mode = unit;
  }
}
</script>

<style>
  fieldset {
    display: inline;
  }
  input[name="applied_pixel_width"] {
    width: 3em;
    text-align: right;
  }

</style>

<form on:submit={formSubmitEvent}>
  <fieldset>
    <legend>Update Component height</legend>
    <input on:change={pxHeightChangeEvent} type="text" value={heigth} name="applied_pixel_width" />
    <fieldset>
      <legend>
        {#each Object.keys(modes) as testedMode}
          <label>
            <input
              type="radio"
              on:change={setMode(testedMode)}
              name="mode"
              checked={modes[testedMode]?'checked':''}
            />
            {testedMode}
          </label>
        {/each}
      </legend>
      {#if mode === 'px'}
        <PxSizeControl bind:pxHeight={pxHeight} />
      {/if}

      {#if mode === 'em'}
        <EmSizeControl bind:pxHeight={pxHeight} />
      {/if}

      {#if mode === 'rem'}
        <RemSizeControl bind:pxHeight={pxHeight} />
      {/if}

      {#if mode === 'ratio'}
        <RatioSizeControl bind:pxHeight={pxHeight} />
      {/if}
    </fieldset>
  </fieldset>
</form>
