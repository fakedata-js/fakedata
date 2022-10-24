export { boundMethod as bind } from 'autobind-decorator'

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
        delete part[key]
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

export const isObject = <T>(obj: T): boolean => {
  if (obj === null || typeof obj !== 'object') {
    return false
  }
  return Object.prototype === Object.getPrototypeOf(obj)
}

export default {
  extend,
  fixRange,
  clean,
  isFunction,
  isObject
}
