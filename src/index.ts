import BooleanFake, { BooleanFakeConfig } from "./categories/boolean/fake";
import FakeDataProvider, { IFakeDataProvider } from "./provider";

export class FakeData {
  readonly _bool: BooleanFake

  constructor(provider: IFakeDataProvider) {
    this._bool = new BooleanFake(provider)
  }

  bool(config?: BooleanFakeConfig) {
    return this._bool.generate(config)
  }
}

const provider = new FakeDataProvider

export default new FakeData(provider)