import BasePlugin, { SingleValueInterface } from '../core/base'
import util, { bind } from '../util'

export interface IBooleanOptions {

}
export default class BooleanPlugin extends BasePlugin<IBooleanOptions> implements SingleValueInterface<boolean, IBooleanOptions> {
  @bind
  any (options: Partial<IBooleanOptions> = {}): boolean {
    return this.provider.boolean[util.random(0, 2)]
  }
}
