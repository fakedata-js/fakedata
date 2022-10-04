import BooleanFake from "./categories/boolean";
import IntegerFake from "./categories/integer";

export class FakeData {
  readonly bool = BooleanFake
  readonly int = IntegerFake
}

export default new FakeData()