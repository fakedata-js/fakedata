import { normalizeConfig as _normalizeConfig } from "../fake"

interface GeneratorFn<T> { (): T }
export interface ArrayFake<T> {
  length: number
  fn: GeneratorFn<T>
}

const normalizeConfig = <T>(config: ArrayFake<T>): ArrayFake<T> => {
  if (config.length == null || typeof config.length != 'number') {
    throw new Error('Array length must be a number')
  }
  if (config.fn == null || typeof config.fn != 'function') {
    throw new Error('Generator must be a function')
  }
  const fConfig = _normalizeConfig({} as ArrayFake<T>, config)

  return fConfig
}

export default function ArrayFake<T>(length: number, fn: GeneratorFn<T> ): T[] {
  const fConfig = normalizeConfig({ length, fn })
  return Array(fConfig.length).fill(undefined).map(() => fConfig.fn())
}