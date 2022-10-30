import BasePlugin, { IPluginInterface } from '../core/base'
import { bind } from '../core/util'

export interface IBooleanOptions {

}
export default class BooleanPlugin extends BasePlugin implements IPluginInterface {
  @bind
  any (options: Partial<IBooleanOptions> = {}): boolean {
    const index = this.provider.randomInt(0, 2)
    return index === 0
  }
}

export type IBooleanGenerator = (options?: Partial<IBooleanOptions>) => boolean
