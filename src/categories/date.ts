import BasePlugin from '../core/base'

export default class DatePlugin extends BasePlugin {
  any (): Date {
    return new Date()
  }

  today (): Date {
    return this.any()
  }
}
