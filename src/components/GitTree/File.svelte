<script>
import { fileExtensionRe, extensionsRepresentation } from '../../matchers'

const findExtension = (path) => {
  for (let name in fileExtensionRe) {
    for (let extension of fileExtensionRe[name]) {
      if(extension.test(path)) {
        return name;
      }
    }
  }
  return 'text'
}

export let content = {
  name: '',
  relative_path: ''
};
$: grammar = findExtension(content.relative_path)

export let show = (event) => console.log(event)

const fileIcon = (grammar) => Object.keys(extensionsRepresentation).filter(ext => ext === grammar).length === 0
  ? extensionsRepresentation['default']
  : extensionsRepresentation[grammar]

</script>

<style>
  li {
    padding: 0 0 0 20px;
  }
</style>

<li>
  {fileIcon(grammar)} <a
    on:click={show}
    href={`#${content.relative_path}`}
    data-path={content.relative_path}
    data-grammar={grammar}
    title={`Show ${content.relative_path}'s content`}
  >
    {content.name}
  </a>
</li>
