<script type="text/javascript">
import {createEventDispatcher, onMount} from 'svelte'
import { gitFs, repositories } from '../stores/repositories.js'
import File from './GitTree/File.svelte'
import Folder from './GitTree/Folder.svelte'

const dispatch = createEventDispatcher();

export let targetedRepository = 'https://github.com/tetedacier/remark';
const dir = '/remark'

let initialTree = {
  content: []
}
$: errors = []
$: tree = initialTree

onMount(async () => {
  try {
    await gitFs.cloneRepository(dir)
  } catch(cloneIssue) {
    console.error(cloneIssue)
  }
  tree = await gitFs.listRepositoryTree(dir)
})


const showGitTree = async (event) => {
  event.preventDefault()
  dispatch('select');
  const filepath = event.srcElement.dataset.path
  let value = await gitFs.readGitFile(dir, filepath);
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
.repository {
  font-family: Menlo, Monaco, 'Courier New', monospace
}
</style>

<form on:submit={(event) => {
  event.preventDefault()
}}>
  <label>
    Repositories
    <select>
      {#each repositories as repository}
        <option>{repository}</option>
      {/each}
    </select>
  </label>
  <label>
    repository:
    <input type="text" name="repository" bind:value={targetedRepository} />
  </label>
</form>
<!-- <pre>{JSON.stringify(tree.content, null, 2)}</pre> -->
<ul class="repository">
  {#each tree.content as leaf }
    {#if leaf.type === 'folder'}
      <Folder content={leaf} show={showGitTree} />
    {/if}
    {#if leaf.type === 'file'}
      <File content={leaf} show={showGitTree} />
    {/if}
  {/each}
</ul>
