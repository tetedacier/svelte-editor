<script>
import File from './File.svelte'
import Folder from './Folder.svelte'
export let content = { name: '', content:[] }
const open_re = /\s*\bopen\b\s*/
</script>

<style>
  .folder{
    background-color: bisque;
  }

  .open > ul {
    display: block;
  }

  ul {
    display: none;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0 0 0 20px;
  }
</style>

<li class="open">
  <span on:click={(event) => {
    console.warn(event.srcElement.parentNode.className)
    if (open_re.test(event.srcElement.parentNode.className)) {
      event.srcElement.parentNode.className = event.srcElement.parentNode.className.replace(open_re, ' ');
    } else {
      event.srcElement.parentNode.className = event.srcElement.parentNode.className + ' open';
    }
    console.warn(event.srcElement.parentNode.className)

  }} class="folder">{content.name}</span>
  <ul>
    {#each content.content as leaf }
      {#if leaf.type === 'folder'}
        <Folder content={leaf} />
      {/if}
      {#if leaf.type === 'file'}
        <File content={leaf} />
      {/if}
    {/each}
  </ul>
</li>
