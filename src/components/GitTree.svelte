<script type="text/javascript">
import {createEventDispatcher, onMount} from 'svelte'
import { gitFs, repositories } from '../stores/repositories.js'
import File from './GitTree/File.svelte'
import Folder from './GitTree/Folder.svelte'

export let targetedRepository = 'https://github.com/tetedacier/sws';
const dispatch = createEventDispatcher();
const dir = '/tutorial'
let initialTree = {
  content: []
}
$: errors = []
$: tree = initialTree

onMount(async () => {
  await gitFs.cloneRepository(dir)
  tree = await gitFs.listRepositoryTree(dir)
})


const showGitTree = async (event) => {
  console.log('prevent default link in TreeView')
  dispatch('select');
  event.preventDefault()
  const filepath = event.srcElement.dataset.path
  let value = await gitFs.readGitFile(dir, filepath);
  console.log({filepath: event.srcElement.dataset.path,value,dir})
  dispatch('show', {
    filepath,
    dir,
    value,
  });
}
</script>

<style>
ul {
  padding: 0;
  list-style: none;
}
</style>

<form on:submit={(event) => {
  event.preventDefault()
}}>
  <lablel>
    Repositories
    <select>
      {#each repositories as repository}
        <option>{repository}</option>
      {/each}
    </select>
  </lablel>
  <label>
    repository:
    <input type="text" name="repository" bind:value={targetedRepository} />
  </label>
</form>
<!-- <pre>{JSON.stringify(tree.content, null, 2)}</pre> -->
<ul>
  {#each tree.content as leaf }
    {#if leaf.type === 'folder'}
      <Folder content={leaf} show={showGitTree} />
    {/if}
    {#if leaf.type === 'file'}
      <File content={leaf} show={showGitTree} />
    {/if}
  {/each}
</ul>
