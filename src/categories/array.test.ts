import { createPlugin } from "../../test/util";
import Plugin, { IArrayGenerator } from "./array";
import IntPlugin, { IIntegerGenerator } from "./integer";

const array: IArrayGenerator = createPlugin(Plugin).any
const int: IIntegerGenerator = createPlugin(IntPlugin).any

describe('ArrayFake', () => {
  it ('Generates an array of existing fake types of given length', () => {
    const arr = array(5, int)

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
    const arr = array(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 3, 4])
  })

  it ('Generates an array of mixed types', () => {
    const fn = jest.fn()
      .mockReturnValueOnce(2)
      .mockReturnValueOnce('value1')
      .mockReturnValueOnce({})
    const arr = array(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 'value1', {}])
  })

  it ('Throws an error when length is not a number', () => {
    expect(() => array('str', () => 0)).toThrowError()
  })
  it ('Throws an error when length is undefined or null', () => {
    expect(() => array(undefined, () => 0)).toThrowError()
    expect(() => array(null, () => 0)).toThrowError()
  })
  it ('Throws an error when generator is not a function', () => {
    expect(() => array(3, 4)).toThrowError()
  })
  it ('Throws an error when generator is undefined or null', () => {
    expect(() => array(3, undefined)).toThrowError()
    expect(() => array(3, null)).toThrowError()
  })

  it ('Generate multiple array with same length but different generators', () => {
    const length5Array = array.with({ length: 3 })

    const intArray = length5Array({ fn: () => 1 })
    const stringArray = length5Array({ fn: () => 'abc' })

    expect(intArray).toStrictEqual([1, 1, 1])
    expect(stringArray).toStrictEqual(['abc', 'abc', 'abc'])
  })
})