<script>

import ListEdit from './List/edit.svelte'
import VirtualList from '@sveltejs/svelte-virtual-list'
import ListItem from './ListItem.svelte'
let start
let end
$: height = '500px'
export let things
</script>

<ListEdit bind:editedHeigth={height} />

<section>
  <div class="container">
    <VirtualList items={things} height={height} bind:start bind:end let:item>
      <ListItem {item} />
    </VirtualList>
  </div>
  <p>showing items {start}-{end}</p>
</section>
