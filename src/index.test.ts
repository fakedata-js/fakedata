import fake from './index'

describe('Entry point for fake data', () => {
  it.each([
    ['bool', []],
    ['int', []],
    ['number', []],
    ['string', []],
    ['array', [1, () => 1]],
    ['object', []],
    ['from', [[1, 2]]],
  ])('Has correct interface for %s', (prop, args) => {
    expect(typeof fake[prop]).toBe('function')
    expect(() => fake[prop].apply(null, args)).not.toThrowError()
  })

  it.each([
    ['int', []],
    ['number', []],
    ['string', []],
    ['array', [1, () => 1]],
    ['object', []],
    ['from', [[1, 2]]],
  ])('Has correct interface for %s', (prop, args) => {
    expect(typeof fake[prop].with).toBe('function')
    const alias = fake[prop].with.apply(null, args)
    expect(alias).not.toThrowError()
  })

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

  it('Generates a fake object', () => {
    const obj = fake.object({
      key: fake.array(2, () => 2),
    })
    expect(obj).toMatchObject({ key: [2, 2]})
  })
})