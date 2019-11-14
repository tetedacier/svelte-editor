<script>
import {
  unitRe,
  endingRe
} from '../../matchers'
import StepIncrement from './StepIncrement.svelte'
import ConvertionControl from './convertionControl.svelte'

const unit = "px"

export let pxHeight = '100px';
$: height = pxHeight.slice(0, -2);
$: stepSize = 100
export const toPx = (value) => value
$: editedValue = `${height}${unit}`

const ending = endingRe(unit)
export const RE = unitRe(unit)
const stepUpdate = (event) => {
  pxHeight = event.detail.height
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
        value: height,
        unit: 'px'
    }}
    />
    <hr />
    <StepIncrement on:update={stepUpdate} bind:editedValue={editedValue} { ...{
      stepSize,
      unit,
      RE,
      ending,
      pxHeight
    } }/>
  </fieldset>
</span>
