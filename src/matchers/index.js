export const unitRe = (unit) => new RegExp(`^(-?(?:(?:0)|(?:[1-9][0-9]*)))${unit}$`)

export const endingRe = (unit) => new RegExp(Array.prototype.concat(
  '^.*[^',
  unit.split('').join('][^'),
  ']$'
).join(''))
