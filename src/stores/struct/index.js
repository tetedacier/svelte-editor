export const listToTree = (list, dir) => list.reduce((fileTree, currentPath) => {
  const path = currentPath.split('/')
  if (path && path[0] !== '.git') {
    if (path.length > 0) {
      if (path.length > 1) {
        let root = fileTree
        for (const pathItem of path.slice(0, -1)) {
          const existingPath = root.content.filter((item) => item.name === pathItem)
          if (existingPath.length === 0) {
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
  return fileTree
}, { dir, content: [] })
