
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

export const clean = <T>(obj: T, deep = true): T => {
  const cleanObject = <U>(part: U): U => {
    for (const key in part) {
      if (part[key] == null) {
        delete part[key] // eslint-disable-line @typescript-eslint/no-dynamic-delete
      } else if (deep && typeof part[key] === 'object') {
        part[key] = cleanObject(part[key])
      }
    }
    return part
  }

  return cleanObject(obj)
}

export const isFunction = <T>(fn: T): boolean => {
  return (typeof fn === 'function')
}

export default {
  extend,
  random,
  randomDouble,
  fixRange,
  clean,
  isFunction
}
