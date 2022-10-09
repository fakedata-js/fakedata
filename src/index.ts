import ArrayFake from './categories/array'
import BooleanFake from './categories/boolean'
import IntegerFake from './categories/integer'
import NumberFake from './categories/number'
import ObjectFake from './categories/object'
import StringFake from './categories/string'

export class FakeData {
  readonly bool = BooleanFake
  readonly int = IntegerFake
  readonly number = NumberFake
  readonly string = StringFake
  readonly array = ArrayFake
  readonly object = ObjectFake
}

export default new FakeData()
