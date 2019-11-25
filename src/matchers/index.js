export const unitRe = (unit) => new RegExp(`^(-?(?:(?:0)|(?:[1-9][0-9]*)))${unit}$`)

export const endingRe = (unit) => new RegExp(Array.prototype.concat(
  '^.*[^',
  unit.split('').join('][^'),
  ']$'
).join(''))

export const tokenRe = (token) => new RegExp(`\\s*\\b${token}\\b\\s*`)

export const openRe = tokenRe('open')
const extRe = (ext) => new RegExp(`^.*\\.${ext}$`)

export const fileExtensionRe = (() => {
  const fileExtensions = {
    javascript: ['js'],
    json: ['json'],
    css: ['css'],
    markdown: ['md', 'markdown'],
    yaml: ['yml', 'yaml'],
    twig: ['twig'],
    typescript: ['ts'],
    xml: ['xml', 'grammar']
    // svelte:['svelte'].map(ext => extRe(ext))
  }
  return Object.keys(fileExtensions).reduce((expression, key) => {
    expression[key] = fileExtensions[key].map(ext => extRe(ext))
    return expression
  }, {})
})()

export const extensionsRepresentation = {
  javascript: '📜',
  json: '🗂️',
  // css: '',
  markdown: '📑',
  yaml: '🗂️',
  // twig: '',
  // typescript: '',
  // xml: '',
  default: '🏷️'
}
