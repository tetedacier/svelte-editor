<script>
export let content = {
  name: '',
  relative_path: ''
};
export let show = (event) => { console.warn(event) }
</script>

<style>
  li {
    padding: 0 0 0 20px;
  }
</style>

<li>
  <a on:click={show} href={`#${content.relative_path}`} data-path={content.relative_path} tile={`Show ${content.relative_path}'s content`}>
    {content.name}
  </a>
</li>
