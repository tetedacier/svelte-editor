<script>
import { tick } from 'svelte'
import VirtualList from '@sveltejs/svelte-virtual-list'
import ListItem from './ListItem.svelte'
// import { things } from '../mockups'
let start
let end
tick()
const style = (inlineStyle) => {
  let style = '';
  for (let key in inlineStyle) {
    style+=`${key}: ${inlineStyle[key]};`
  }
  return style;
}
const containerStyle = {
		'min-height': '200px',
		'height': '100%',
		'max-height': '300px',
}
export let things
</script>

<style>
	.container {
		min-height: 200px;
		height: 100%;
		max-height: 300px;
	}
</style>

<!-- <div class="container" style="height:300px"> -->
<div class="container" style={style(containerStyle)}>
	<VirtualList items={things}  bind:start bind:end let:item>
    <ListItem {item} />
	</VirtualList>
</div>
<p>showing items {start}-{end}</p>
