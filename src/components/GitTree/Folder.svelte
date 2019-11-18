<script>
import { openRe } from '../../matchers'
import File from './File.svelte'
import Folder from './Folder.svelte'
export let content = { name: '', content:[] }

export let state = ""
export let show = () => {}
</script>

<style>
  .folder{
    background-color: bisque;
  }
  .folder {
    cursor: zoom-in;
  }
  .open > .folder {
    cursor: zoom-out;
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

<li class={state}>
  <span on:click={(event) => {
    state = state ? '' : 'open'
  }} class="folder">{content.name}</span>
  <ul>
    {#each content.content as leaf }
      {#if leaf.type === 'folder'}
        <Folder content={leaf} show={show} />
      {/if}
      {#if leaf.type === 'file'}
        <File content={leaf} show={show} />
      {/if}
    {/each}
  </ul>
</li>
