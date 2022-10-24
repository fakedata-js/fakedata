import { createPlugin } from "../../test/util";
import Plugin from "./array";
import IntPlugin from "./integer";

const array: Plugin = createPlugin(Plugin)
const int: IntPlugin = createPlugin(IntPlugin)

describe('ArrayFake', () => {
  it ('Generates an array of existing fake types of given length', () => {
    const arr = array.any(5, int.any)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(5)

    const hexRegex = /\d+/
    expect(arr.map(n => `${n}`)).toEqual([
      expect.stringMatching(hexRegex),
      expect.stringMatching(hexRegex),
      expect.stringMatching(hexRegex),
      expect.stringMatching(hexRegex),
      expect.stringMatching(hexRegex)
    ])
  })

  it ('Generates an array of from custom generator', () => {
    const fn = jest.fn(() => 0)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)
    const arr = array.any(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 3, 4])
  })

  it ('Generates an array of mixed types', () => {
    const fn = jest.fn()
      .mockReturnValueOnce(2)
      .mockReturnValueOnce('value1')
      .mockReturnValueOnce({})
    const arr = array.any(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 'value1', {}])
  })

  it ('Throws an error when length is not a number', () => {
    expect(() => array.any('str', () => 0)).toThrowError()
  })
  it ('Throws an error when length is undefined or null', () => {
    expect(() => array.any(undefined, () => 0)).toThrowError()
    expect(() => array.any(null, () => 0)).toThrowError()
  })
  it ('Throws an error when generator is not a function', () => {
    expect(() => array.any(3, 4)).toThrowError()
  })
  it ('Throws an error when generator is undefined or null', () => {
    expect(() => array.any(3, undefined)).toThrowError()
    expect(() => array.any(3, null)).toThrowError()
  })

  it ('Generate multiple array with same length but different generators', () => {
    const length5Array = array.any.with({ length: 3 })

    const intArray = length5Array({ fn: () => 1 })
    const stringArray = length5Array({ fn: () => 'abc' })

    expect(intArray).toStrictEqual([1, 1, 1])
    expect(stringArray).toStrictEqual(['abc', 'abc', 'abc'])
  })
})