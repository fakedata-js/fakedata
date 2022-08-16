import BooleanFake from "./categories/boolean";
import FakeDataProvider from "./provider";


const provider = new FakeDataProvider

const boolean = new BooleanFake(provider)

export class FakeData {
  readonly boolean = boolean
}

export default new FakeData