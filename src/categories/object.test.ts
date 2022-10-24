import object from './object'
import string from './string'
import array from './array'

const stringRegex = /[a-zA-Z0-9]+/
describe('ObjectFake', () => {
  it ('Generates an object with existing generators', () => {
    const obj = object.any({
      key1: string.any,
      key2: string.any,
    })

    expect(obj).toMatchObject({
      key1: expect.stringMatching(stringRegex),
      key2: expect.stringMatching(stringRegex),
    })
  })

  it ('Generates an object with constant values', () => {
    const obj = object.any({
      key1: 12,
      key2: string.any,
      key3: false
    })

    expect(obj).toMatchObject({
      key1: 12,
      key2: expect.stringMatching(stringRegex),
      key3: false
    })
  })

  it ('Generates an object with nested fake object with alias', () => {
    const obj = object.any({
      key: object.any.with({
        key1: true,
        key2: string.any
      })
    })

    expect(obj).toMatchObject({
      key: {
        key1: true,
        key2: expect.stringMatching(stringRegex),
      }
    })
  })

  it ('Generates an object with nested fake object without alias', () => {
    const obj = object.any({
      key: {
        key1: true,
        key2: string.any
      }
    })

    expect(obj).toMatchObject({
      key: {
        key1: true,
        key2: expect.stringMatching(stringRegex),
      }
    })
  })

  it ('Generates an object with nested fake array', () => {
    const fn = jest.fn(() => 0).mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3)
    const obj = object.any({
      key1: array.any.with({ length: 3, fn}),
      key2: array.any(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Generates an object with nested fake array', () => {
    const fn = jest.fn(() => 0).mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3)
    const obj = object.any({
      key1: array.any.with({ length: 3, fn}),
      key2: array.any(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Returns empty object when empty config is provided', () => {
    expect(object.any()).toStrictEqual({})
  })
  it ('Throws an error when config is not an object', () => {
    expect(() => object.any(123)).toThrowError()
    expect(() => object.any('123')).toThrowError()
    expect(() => object.any([])).toThrowError()
  })

  it ('Overrides fields in aliased method', () => {
    const alias = object.any.with({
      key1: true,
      key2: string.any,
      key3: {
        key1: false
      }
    })

    expect(alias({
      key1: string.any,
      key3: {
        key1: true,
        key2: string.any
      }
    })).toMatchObject({
      key1: expect.stringMatching(stringRegex),
      key2: expect.stringMatching(stringRegex),
      key3: {
        key1: true,
        key2: expect.stringMatching(stringRegex)
      }
    })
  })
})