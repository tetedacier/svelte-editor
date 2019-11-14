<script>
import {
  unitRe,
  endingRe
} from '../../matchers'

import StepIncrement from './StepIncrement.svelte'

const unit = 'em'
export let pxHeight = '100px';
import ConvertionControl from './convertionControl.svelte'

$: height = pxHeight.slice(0,-2);
$: stepSize = 5
$: fontSize = window.getComputedStyle(document.getElementById('root')).fontSize.slice(0,-2)
$: editedValue = `${height/fontSize}${unit}`

export const toPx = (value) => `300px`

const ending = endingRe(unit)
export const RE = unitRe(unit)

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
