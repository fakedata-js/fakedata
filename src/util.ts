export const extend = <T extends {}, U>(source: T, target: U, ...rest: any[]): any => {
  let extended = Object.assign(source, target)
  while (extended != null && (target = rest.shift()) != null) {
    extended = Object.assign(extended, target)
  }
  return extended
}

export const random = (min: number, max: number): number => {
  return Math.floor((Math.random() * (max - min)) + min)
}

export default {
  extend,
  random
}
