export const unitRe = (unit) => new RegExp(`^(-?(?:(?:0)|(?:[1-9][0-9]*)))${unit}$`)

export const endingRe = (unit) => new RegExp(Array.prototype.concat(
  '^.*[^',
  unit.split('').join('][^'),
  ']$'
).join(''))

export const tokenRe = (token) => new RegExp(`\\s*\\b${token}\\b\\s*`)

export const openRe = tokenRe('open')

export const fileExtensionRe = {
  javascript: [new RegExp('^.*\\.js$')],
  json: [new RegExp('^.*\\.json$')],
  css: [new RegExp('^.*\\.css$')],
  markdown: [new RegExp('^.*\\.md$')],
  yaml: [new RegExp('^.*\\.(?:(?:yml)|(?:yaml))$')],
  twig: [new RegExp('^.*\\.twig$')],
  typescript: [new RegExp('^.*\\.ts$')]
}
