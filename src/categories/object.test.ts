import IntegerFake from './integer'
import ObjectFake from './object'
import StringFake from './string'
import ArrayFake from './array'
import DataProvider from '../core/provider'

const provider = new DataProvider
const int = new IntegerFake(provider)
const string = new StringFake(provider)
const array = new ArrayFake(provider)
const newFaker = () => new ObjectFake(provider)
describe('ObjectFake', () => {
  it ('Generates an object with existing generators', () => {
    const obj = newFaker().any({
      key1: string.any,
      key2: string.any,
    })

    expect(obj).toMatchObject({
      key1: expect.stringMatching(/[a-zA-Z0-9]+/),
      key2: expect.stringMatching(/[a-zA-Z0-9]+/),
    })
  })

  it ('Generates an object with constant values', () => {
    const obj = newFaker().any({
      key1: 12,
      key2: string.any,
      key3: false
    })

    expect(obj).toMatchObject({
      key1: 12,
      key2: expect.stringMatching(/[a-zA-Z0-9]+/),
      key3: false
    })
  })

  it ('Generates an object with nested fake object', () => {
    const obj = newFaker().any({
      key: newFaker().with({
        key1: true,
        key2: string.any
      })
    })

    expect(obj).toMatchObject({
      key: {
        key1: true,
        key2: expect.stringMatching(/[a-zA-Z0-9]+/),
      }
    })
  })

  it ('Generates an object with nested fake array', () => {
    const fn = jest.fn(() => 0).mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3)
    const obj = newFaker().any({
      key1: array.with(3, fn),
      key2: array.any(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Generates an object with nested fake array', () => {
    const fn = jest.fn(() => 0).mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3)
    const obj = newFaker().any({
      key1: array.with(3, fn),
      key2: array.any(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Returns empty object when empty config is provided', () => {
    expect(newFaker().any()).toStrictEqual({})
  })
  it ('Throws an error when config is not an object', () => {
    expect(() => newFaker().any(123)).toThrowError()
    expect(() => newFaker().any('123')).toThrowError()
    expect(() => newFaker().any([])).toThrowError()
  })
})