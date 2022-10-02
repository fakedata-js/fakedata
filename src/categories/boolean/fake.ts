import Fake, { IFakeConfig } from "../../fake";
import FakeDataProvider, { IFakeDataProvider } from "../../provider";
import util from "../../util";

export class BooleanFakeConfig implements IFakeConfig {
  constructor(config?: Partial<BooleanFakeConfig>) {
    util.extend(this, config || {})
  }
}

export default function BooleanFake(config?: Partial<BooleanFakeConfig>) {
  config = new BooleanFakeConfig(config)
  const provider: IFakeDataProvider = FakeDataProvider.get()
  return provider.boolean[util.random(2, 0)]
}