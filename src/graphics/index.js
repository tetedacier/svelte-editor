const fs = require('fs')
const { parse } = require('path')

const glob = require('glob')
const projectPath = process.cwd()
console.log(projectPath)
const relax = {
  20: ' ',
  22: '\'',
  '0A': '',
  '3D': '=',
  '3A': ':',
  '2C': ',',
  '2F': '/',
  '3E\\s+%3C': '%3E%3C'
}
const getContent = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, (readError, content) => {
    if (readError) {
      reject(readError)
    }
    const relaxedContent = encodeURIComponent(content.toString())
    const encodedSvg = Object.keys(relax).reduce(
      (urlEncodedSvgContent, key) => urlEncodedSvgContent.replace(new RegExp(`%${key}`, 'g'), relax[key]),
      relaxedContent
    ).replace(/\s{2,}/g, ' ')

    const {
      name: ressourceName
    } = parse(file)
    const cssContent = `background: no-repeat 50% 50% url("data:image/svg+xml,${encodedSvg}");`

    resolve(`// ${ressourceName} export
export const ${ressourceName.replace(/-i/, 'I')} = css\`
${cssContent}
\``)
  })
})
glob(`${projectPath}/src/graphics/*-icon.svg`, (globError, files) => {
  if (globError) {
    throw globError
  }
  Promise.all(files.map(file => getContent(file)))
    .then(content => fs.writeFile(
      './src/components/graphics.js',
      ["import { css } from 'emotion'"].concat(content).join('\n\n'),
      (writeFileError) => {
        if (writeFileError) {
          throw writeFileError
        }
      }
    ))
    .catch(error => console.error(error))
})
