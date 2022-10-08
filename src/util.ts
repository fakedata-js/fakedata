
export interface Range {
  min: number
  max: number
}

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

export const randomDouble = (min: number, max: number): number => {
  return (Math.random() * (max - min)) + min
}

export const fixRange = (defaults: Range, opts?: Partial<Range>): Range => {
  const min = opts?.min ?? defaults.min
  const max = opts?.max ?? defaults.max

  if (max < min) {
    throw new Error(`${min} > ${max}, min value cannot be greater than max value`)
  }

  return { min, max }
}

export default {
  extend,
  random,
  randomDouble,
  fixRange
}
