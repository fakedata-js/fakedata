import BooleanFake from './categories/boolean'
import IntegerFake from './categories/integer'
import NumberFake from './categories/number'
import StringFake from './categories/string'

export class FakeData {
  readonly bool = BooleanFake
  readonly int = IntegerFake
  readonly number = NumberFake
  readonly string = StringFake
}

export default new FakeData()
