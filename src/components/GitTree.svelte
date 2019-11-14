<script type="text/javascript">
import * as LightningFS from '@isomorphic-git/lightning-fs'
import * as git from 'isomorphic-git'
import File from './GitTree/File.svelte'
import Folder from './GitTree/Folder.svelte'
import path from 'path'
export let targetedRepository = 'https://github.com/tetedacier/sws';
const dir = '/tutorial'
const FILE_EXIST = 'EEXIST'
$: errors = []
$: tree = {content: []}
window.fs = new LightningFS('fs')
git.plugins.set('fs', window.fs)
const createTree = () => {

}
const listToTree = (list) => list.reduce((fileTree, currentPath) => {
  const path = currentPath.split('/')
  if (path && path[0] !== '.git') {
    if (path.length > 0) {
      if (path.length > 1) {
        let root = fileTree
        for (let pathItem of path.slice(0, -1)) {
          const existingPath = root.content.filter((item) => item.name === pathItem)
          if(existingPath.length === 0) {
            root.content.push({
              type: 'folder',
              name: pathItem,
              content: []
            })
          }
          root = root.content.filter((item) => item.name === pathItem)[0]
        }
        root.content.push({
            type: 'file',
            name: path.slice(-1)[0],
            relative_path: currentPath
          })
      } else {
        fileTree.content.push({
          type: 'file',
          name: path[0],
          relative_path: currentPath
        })
      }
    }
  }
  return fileTree;
}, { dir, content:[] })

window.pfs = window.fs.promises
console.warn(`attempting to clone "${targetedRepository}" in "${dir}"`)
fs.mkdir(dir, (error)=> {
  if (error){
    if(error.code === FILE_EXIST) {
      console.warn(`dir "${dir}" already exists`)
    }
    else {
      throw new Error(`Errors occured during cloning of "${targetedRepository}" in "${dir}" =>\n${JSON.stringify(error, null, 2)}`)
    }
  } else {
    console.warn(`dir "${dir}" creation succeed with args: ${JSON.stringify(args, null, 2)}`)
  }
  const filepath = 'src/commands/tag.js'

  // ;(async () => {
  //   let commits = await git.log({dir})
  //   let lastSHA = null
  //   let lastCommit = null
  //   let commitsThatMatter = []
  //   const content = await pfs.readFile(path.join(dir, filepath))
  //   console.warn(content.toString())
  //   console.warn(content)
  //   console.warn(new TextDecoder("utf-8").decode(content))
  //   for (let commit of commits) {
  //     try {
  //       let o = await git.readObject({ dir, oid: commit.oid, filepath })
  //       if (o.oid !== lastSHA) {
  //         if (lastSHA !== null) commitsThatMatter.push(lastCommit)
  //         lastSHA = o.oid
  //       }
  //     } catch (err) {
  //       // file no longer there
  //       commitsThatMatter.push(lastCommit)
  //       break;
  //     }
  //     lastCommit = commit
  //   }
  //   console.log(commitsThatMatter)
  // })()



  pfs.readdir(dir).then((...readArgs)=> {
    console.warn(readArgs)
  })

  git.listFiles({ dir }).then((filesList)=> {
    tree = listToTree(filesList)
  })


  // git.log({dir}).then((logs) => {
  //   console.warn(logs)
  // }).catch((error) => {
  //   console.error(error)
  // })

  // git.readObject({
  //   dir,
  //   filepath
  // }).then((object) => {
  //   console.dir(object)
  // }).catch((error) => {
  //   console.error(error)
  // })
  // git.clone({
  //   dir,
  //   corsProxy: 'https://cors.isomorphic-git.org',
  //   url: targetedRepository,
  //   ref: 'master',
  //   singleBranch: true,
  //   depth: 10
  // }).then((...args) => {
  //   console.warn(`git clone of "${targetedRepository}" succeed width ${JSON.stringify(args, null, 2)}`)
  //   pfs.readdir(dir, (...readArgs) => {
  //     console.warn(readArgs)
  //   })
  // }).catch((error)=> {
  //   errors.push(error)
  // })
});
// }).catch((error)=> {
//   errors.push(error)
// })

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
  <label>
    repository:
    <input type="text" name="repository" bind:value={targetedRepository} />
  </label>
</form>
{#if errors.length > 0}
  {#each errors as error}
    <pre>
      {JSON.stringify(error, null, 2)}
    </pre>
  {/each}
{:else}
    <!-- <pre>{JSON.stringify(tree.content, null, 2)}</pre> -->
  <ul>
    {#each tree.content as leaf }
      <!-- <li>{JSON.stringify(leaf, null, 2)}</li> -->
    <!--
    -->


      {#if leaf.type === 'folder'}
        <Folder content={leaf} />
      {/if}
      {#if leaf.type === 'file'}
        <File content={leaf} />
      {/if}

    {/each}

    <!--

    -->
  </ul>
{/if}

