import fake from './index'

describe('Entry point for fake data', () => {
  it('Generates a fake boolean value', () => {
    expect(`${fake.bool()}`).toMatch(/true|false/)
  })

  it('Generates a fake integer', () => {
    expect(`${fake.int()}`).toMatch(/\d+/)
  })

  it('Generates a fake floating point number', () => {
    expect(`${fake.number()}`).toMatch(/\d+\.\d+/)
  })

  it('Generates a fake string', () => {
    expect(fake.string()).toMatch(/[a-zA-Z0-9]+/)
  })

  it('Generates a fake array', () => {
    const arr = fake.array(3, fake.int)
    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
  })
})