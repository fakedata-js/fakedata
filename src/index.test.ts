import BooleanFake, { BooleanFakeConfig } from './categories/boolean/fake'
import fake from './index'
import FakeDataProvider from './provider'

describe('Entry point for fake data', () => {
  it('Initializes a boolean value faker', () => {
    expect(fake._bool).toBeInstanceOf(BooleanFake)
    expect(fake._bool.provider).toBeInstanceOf(FakeDataProvider)
  })

  it('Generates a fake boolean value', () => {
    expect(`${fake.bool()}`).toMatch(/true|false/)
  })
})