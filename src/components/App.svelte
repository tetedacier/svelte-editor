<script>
import Editor from './Editor.svelte'
import List from './List.svelte'
import { things } from '../mockups'
export let name;
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>
	Hello {name}!
</h1>

<List {things} />
<Editor />
