import Fake, { IFakeConfig } from "../../fake";

export class BooleanFakeConfig implements IFakeConfig {

}

export default class BooleanFake extends Fake<boolean> {
  initDefaultConfig(): void {
    this.config = new BooleanFakeConfig()
  }

  generate(config: BooleanFakeConfig): boolean {
    return this.provider.boolean[this.random(2, 0)]
  }

  any(): boolean {
    return this.generate(this.config)
  }
}