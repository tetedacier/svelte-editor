<script>
import {
  unitRe,
  endingRe
} from '../../matchers'
import { onMount } from 'svelte'

import ConvertionControl from './convertionControl.svelte'
import StepIncrement from './StepIncrement.svelte'

const unit = 'rem'
$: stepSize = 3

export let pxHeight = '100px';
$: fontSize = window.getComputedStyle(document.getElementsByTagName('body')[0]).fontSize.slice(0,-2)
$: height = pxHeight.slice(0,-2)

export const toPx = (value) => `500px`


$: editedValue = `${height/fontSize}${unit}`

const ending = unitRe(unit)
export const RE = endingRe(unit)

const stepUpdate = (event) => {
  pxHeight = `${fontSize * editedValue.slice(0, -unit.length)}px`
}

</script>

<style>
  fieldset {
    display: inline;
  }
</style>

<span>
  <fieldset>
    <ConvertionControl
      from={{ value: editedValue.slice(0, -unit.length), unit }}
      to={{
        value: editedValue.slice(0, -unit.length) * fontSize,
        unit: 'px'
      }}
    />
    <hr />
    <StepIncrement on:update={stepUpdate} bind:editedValue={editedValue} { ...{
      stepSize,
      unit,
      ending,
      RE,
      pxHeight
    } } />
  </fieldset>
</span>
