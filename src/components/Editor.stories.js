import Editor from './Editor.svelte'
export default { title: 'Editor listing' }

export const editorCss = () => ({
  Component: Editor,
  props: {
    value: `h1 {
  color: purple;
}
.container {
  min-height: 200px;
  height: 100%;
  max-height: 300px;
}`,
    grammar: 'css'
  }
})
