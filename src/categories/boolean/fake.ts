import Fake, { IFakeConfig } from "../../fake";
import { extend } from "../../util";

export class BooleanFakeConfig implements IFakeConfig {

}

export default class BooleanFake extends Fake<boolean> {
  initConfig(): IFakeConfig{
    return new BooleanFakeConfig()
  }
  generate(config?: BooleanFakeConfig): boolean {
    config =  extend(this.initConfig(), config)
    return this.provider.boolean[this.random(2, 0)]
  }
}