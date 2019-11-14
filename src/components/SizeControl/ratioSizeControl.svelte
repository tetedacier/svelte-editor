<script>
import {
  unitRe,
  endingRe
} from '../../matchers'

import {onMount, onDestroy} from "svelte"
import StepIncrement from './StepIncrement.svelte'
import ConvertionControl from './convertionControl.svelte'
$: stepSize = 5
const unit = '%'

$:ratioHeight = `${ratio}${unit}`
export let pxHeight = '100px';
$: ratio = Math.round(parseInt(pxHeight.slice(0, -2), 10)/document.getElementsByTagName('html')[0].scrollHeight*100)
$: height = pxHeight;
$: editedValue =  `${ratio}${unit}`
export const toPx = (value) => `400px`

const ending = unitRe(unit)
export const RE = endingRe(unit)
const applyRatioOnDocumentHeight = (ratio) => Math.round(ratio  / 100 * document.getElementsByTagName('html')[0].scrollHeight)
const stepUpdate = (event)=>{
  ratio = event.detail.height.slice(0, -unit.length)
  pxHeight = `${applyRatioOnDocumentHeight(editedValue.slice(0, -unit.length))}px`
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
        value: applyRatioOnDocumentHeight(editedValue.slice(0, -unit.length)),
        unit: 'px'
      }}
    />
    <hr />
    <input on:change={(event)=>{
      pxHeight = `${applyRatioOnDocumentHeight(editedValue.slice(0, -unit.length))}px`
      editedValue = event.srcElement.value + unit
    }} type="range" bind:value={ratio} min="0" max="100">
    <hr />
    <!-- -->
    <!-- <StepIncrement bind:editedValue={editedValue} { ...{ -->
      <!-- pxHeight = event.detail.height -->
    <StepIncrement on:update={stepUpdate} bind:editedValue={editedValue} { ...{
      stepSize,
      unit,
      ending,
      RE,
      pxHeight
    } } />
  </fieldset>
</span>
