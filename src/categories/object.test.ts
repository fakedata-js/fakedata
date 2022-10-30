import Plugin, { IObjectGenerator } from './object'
import StringPlugin, { IStringGenerator } from './string'
import ArrayPlugin, { IArrayGenerator } from './array'
import { createPlugin } from '../../test/util'

const object: IObjectGenerator = createPlugin(Plugin).any
const string: IStringGenerator = createPlugin(StringPlugin).any
const array: IArrayGenerator = createPlugin(ArrayPlugin).any

const stringRegex = /[a-zA-Z0-9]+/
describe('ObjectFake', () => {
  it ('Generates an object with existing generators', () => {
    const obj = object({
      key1: string,
      key2: string,
    })

    expect(obj).toMatchObject({
      key1: expect.stringMatching(stringRegex),
      key2: expect.stringMatching(stringRegex),
    })
  })

  it ('Generates an object with constant values', () => {
    const obj = object({
      key1: 12,
      key2: string,
      key3: false
    })

    expect(obj).toMatchObject({
      key1: 12,
      key2: expect.stringMatching(stringRegex),
      key3: false
    })
  })

  it ('Generates an object with nested fake object with alias', () => {
    const obj = object({
      key: object.with({
        key1: true,
        key2: string
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
    const obj = object({
      key: {
        key1: true,
        key2: string
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
    const obj = object({
      key1: array.with({ length: 3, fn}),
      key2: array(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Generates an object with nested fake array', () => {
    const fn = jest.fn(() => 0).mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3)
    const obj = object({
      key1: array.with({ length: 3, fn}),
      key2: array(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Returns empty object when empty config is provided', () => {
    expect(object()).toStrictEqual({})
  })
  it ('Throws an error when config is not an object', () => {
    expect(() => object(123)).toThrowError()
    expect(() => object('123')).toThrowError()
    expect(() => object([])).toThrowError()
  })

  it ('Overrides fields in aliased method', () => {
    const alias = object.with({
      key1: true,
      key2: string,
      key3: {
        key1: false
      }
    })

    expect(alias({
      key1: string,
      key3: {
        key1: true,
        key2: string
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