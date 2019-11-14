import GitTree from './GitTree.svelte'
export default { title: 'Git tree listing' }
// const targetedRepository = 'https://github.com/tetedacier/sws'
const targetedRepository = 'https://github.com/isomorphic-git/isomorphic-git'
export const gitTreeList = () => ({
  Component: GitTree,
  props: { targetedRepository }
})
