import fake, { FakeData } from './index'

describe('Entry point for fake data', () => {
  it.each([
    ['fake.bool', fake.bool, []],
    ['fake.int', fake.int, []],
    ['fake.number', fake.number, []],
    ['fake.string', fake.string, []],
    ['fake.array', fake.array, [1, () => 1]],
    ['fake.object', fake.object, []],
    ['fake.select', fake.select, [[1, 2]]],
  ])('Has correct interface for %s', (label, fn, args) => {
    expect(typeof fn).toBe('function')
    expect(() => fn.apply(null, args)).not.toThrowError()
  })

  it.each([
    ['fake.int.with', fake.int.with, []],
    ['fake.number.with', fake.number.with, []],
    ['fake.string.with', fake.string.with, []],
    ['fake.array.with', fake.array.with, [{ length: 1, fn: () => 1 }]],
    ['fake.object.with', fake.object.with, []],
    ['fake.select.with', fake.select.with, [[1, 2]]],
  ])('Has correct interface for %s', (label, fn, args) => {
    expect(typeof fn).toBe('function')
    const alias = fn.apply(null, args)
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
    expect(fake.string()).toMatch(/[a-zA-Z]+/)
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

  it ('Uses supplied random number generated', () => {
    const mockedRandom = jest.fn(() => 0)
    const faker = new FakeData(mockedRandom)

    const value = faker.int({ min: 10, max: 20 })

    expect(mockedRandom).toBeCalledTimes(1)
  })

  describe ('Seeding', () => {
    it ('Setting seed to previously set seed resets the random numbers', () => {
      fake.seed(123)
      const array1 = fake.array(10, fake.int.with({ min: 10, max: 20 }))

      fake.seed(123)
      const array2 = fake.array(10, fake.int.with({ min: 10, max: 20 }))

      expect(array1).toStrictEqual(array2)
    })

    it ('Resetting seed resets the random numbers', () => {
      fake.seed(Date.now())
      const array1 = fake.array(10, fake.int.with({ min: 10, max: 20 }))
      fake.reset()
      const array2 = fake.array(10, fake.int.with({ min: 10, max: 20 }))

      expect(array1).toStrictEqual(array2)
    })
  })
})