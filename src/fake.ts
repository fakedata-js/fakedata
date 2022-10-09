import util from './util'

export const normalizeConfig = <T>(defaults: T, config?: Partial<T>): T => {
  return util.extend({}, defaults, util.clean(config ?? {}))
}
