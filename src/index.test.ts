import fake from './index'

describe('Entry point for fake data', () => {
  it('Generates a fake boolean value', () => {
    expect(`${fake.bool()}`).toMatch(/true|false/)
  })
})