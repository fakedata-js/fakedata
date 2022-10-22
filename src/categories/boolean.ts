import BasePlugin, { IPluginInterface } from '../core/base'
import util, { bind } from '../core/util'

export interface IBooleanOptions {

}
export class BooleanPlugin extends BasePlugin implements IPluginInterface {
  @bind
  any (options: Partial<IBooleanOptions> = {}): boolean {
    return [true, false][util.random(0, 2)]
  }
}

export default new BooleanPlugin()
