import BasePlugin, { IPluginInterface } from '../core/base'
import { bind } from '../core/util'

export interface IBooleanOptions {

}
export default class BooleanPlugin extends BasePlugin implements IPluginInterface {
  @bind
  any (options: Partial<IBooleanOptions> = {}): boolean {
    return [true, false][this.provider.randomInt(0, 2)]
  }
}
