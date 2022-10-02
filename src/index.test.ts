import BooleanFake from './categories/boolean/fake'
import fake from './index'
import FakeDataProvider from './provider'

describe('Entry point for fake data', () => {
  it('Initializes a boolean value faker', () => {
    expect(fake.boolean).toBeInstanceOf(BooleanFake)
    expect(fake.boolean.provider).toBeInstanceOf(FakeDataProvider)
  })
})