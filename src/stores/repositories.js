import { writable } from 'svelte/store'
import { listToTree } from './struct'
import * as LightningFS from '@isomorphic-git/lightning-fs'
import * as git from 'isomorphic-git'

const FOLDER_EXIST = 'EEXIST'
const encoding = 'utf8'

window.fs = new LightningFS('fs')
window.pfs = window.fs.promises
git.plugins.set('fs', window.fs)

export const dir = '/tutorial'
export const targetedRepository = 'https://github.com/tetedacier/remark'
export const corsProxy = 'http://localhost:9999'

const acquireRepositories = () => new Promise((resolve, reject) => {
  window.pfs.readdir('/', (error, fsList) => error ? reject(error) : resolve(fsList))
})

const listRepositoryTree = (dir) => new Promise((resolve) => {
  git.listFiles({ dir }).then((filesList) => {
    resolve(listToTree(filesList, dir))
  })
})

const readGitFile = (dir, filepath) => new Promise((resolve, reject) => {
  window.pfs.readFile(`${dir}/${filepath}`).then((content) => {
    resolve(new TextDecoder('utf-8').decode(content))
  }).catch((readFileError) => {
    reject(readFileError)
  })
})

const cloneSuccess = (resolve, options) =>
  (...args) => resolve(
    `git clone of "${options.url}" succeed width ${JSON.stringify(args, null, 2)}`
  )

const cloneFailure = (reject, options) =>
  (gitCloneError) => reject(new Error(
      `Errors occured during cloning of "${options.url}" in "${options.dir}" =>\n${JSON.stringify(gitCloneError, null, 2)}`
  ))

const gitClone = (
  dir = '/tutorial',
  url = '',
  ref = 'master',
  singleBranch = true,
  depth = 5
) => new Promise((resolve, reject) => git.clone({
  dir,
  corsProxy,
  url,
  ref,
  singleBranch,
  depth
})
  .then(cloneSuccess(resolve, { url }))
  .catch(cloneFailure(reject, { url, dir }))
)

const readGitObject = (
  dir = '/tutorial',
  filepath = '',
  sha = ''
) => new Promise((resolve, reject) => git.readObject({
  dir,
  filepath,
  oid: sha,
  encoding
}).then((object) => {
  resolve(object)
}).catch((error) => {
  reject(error)
})
)

const cloneRepository = (
  dir = '/tutorial',
  url = targetedRepository
) => new Promise((resolve, reject) => window.fs.mkdir(dir, (fsMkDirError) => fsMkDirError
  ? (fsMkDirError.code === FOLDER_EXIST)
    ? resolve(`dir "${dir}" already exists`)
    : reject(new Error(
        `Errors occured during cloning of "${url}" in "${dir}" =>\n${JSON.stringify(fsMkDirError, null, 2)}`
    ))
  : gitClone(dir, url)
))

const filterTree = async (
  dir = '/tutorial',
  entry,
  prefix,
  searchTerm = 'commit',
  endsWith = ['.js']
) => {
  for (const ending of endsWith) {
    if (entry.path.endsWith(ending)) {
      const { object: blob } = await git.readObject({ dir, oid: entry.oid })
      if (blob.toString('utf8').includes(searchTerm)) {
        // To be consolidated elsewhere
        console.log(`${prefix}/${entry.path}`)
      }
      return
    }
  }
}

const searchTree = async ({ oid, prefix = '' }, dir, searchTerm) => {
  const { object: tree } = await git.readObject({ dir, oid })
  for (const entry of tree.entries) {
    if (entry.type === 'tree') {
      await searchTree({ oid: entry.oid, prefix: `${prefix}/${entry.path}` }, dir, searchTerm)
    } else if (entry.type === 'blob') {
      await filterTree(dir, entry, prefix, searchTerm)
    }
  }
}

const searchRepositoryFor = async (
  dir = '/tutorial',
  searchTerm = 'commit'
) => {
  // Find all the .js files in the current master branch containing the word 'commit'
  const sha = await git.resolveRef({ dir, ref: 'master' })
  const { object: commit } = await git.readObject({ dir, oid: sha })
  await searchTree(
    { oid: commit.tree },
    searchTerm
  )
}

export const repositories = writable([])

export const gitFs = Object.freeze({
  acquireRepositories,
  cloneRepository,
  gitClone,
  listRepositoryTree,
  readGitFile,
  searchTree,
  searchRepositoryFor,
  readGitObject
})
