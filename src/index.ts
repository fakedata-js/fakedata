import BooleanFake from "./categories/boolean/fake";
import FakeDataProvider, { IFakeDataProvider } from "./provider";

export class FakeData {
  readonly boolean: BooleanFake

  constructor(provider: IFakeDataProvider) {
    this.boolean = new BooleanFake(provider)
  }
}

const provider = new FakeDataProvider

export default new FakeData(provider)