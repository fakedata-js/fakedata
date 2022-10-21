import BasePlugin, { IPluginInterface } from '../core/base'
import util, { bind } from '../core/util'

export interface IBooleanOptions {

}
export default class BooleanPlugin extends BasePlugin implements IPluginInterface {
  @bind
  any (options: Partial<IBooleanOptions> = {}): boolean {
    return this.provider.boolean[util.random(0, 2)]
  }
}
