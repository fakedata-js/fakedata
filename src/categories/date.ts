import BasePlugin from "../core/base";

export default class DatePlugin extends BasePlugin {
  today(): Date {
    return new Date()
  }
}