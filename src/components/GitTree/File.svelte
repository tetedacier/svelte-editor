<script>
export let content = {
  name: '',
  relative_path: ''
};
</script>

<style>
  li {
    padding: 0 0 0 20px;
  }
</style>

<li>
  <a href={`#${content.relative_path}`} tile={`Show ${content.relative_path}'s content`}>
    {content.name}
  </a>
</li>
