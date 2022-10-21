import FakeDataProvider from "../core/provider";
import ArrayFake from "./array";
import IntegerFake from "./integer";
// import ObjectFake from './object'
import StringFake from './string'

const provider = new FakeDataProvider
const int = new IntegerFake(provider)
const string = new StringFake(provider)
const newFaker = () => new ArrayFake(provider)
describe('ArrayFake', () => {
  it ('Generates an array of existing fake types of given length', () => {
    const arr = newFaker().any(5, int.any)

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
    const arr = newFaker().any(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 3, 4])
  })

  it ('Generates an array of mixed types', () => {
    const fn = jest.fn()
      .mockReturnValueOnce(2)
      .mockReturnValueOnce('value1')
      .mockReturnValueOnce({})
    const arr = newFaker().any(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 'value1', {}])
  })

  it ('Throws an error when length is not a number', () => {
    expect(() => newFaker().any('str', () => 0)).toThrowError()
  })
  it ('Throws an error when length is undefined or null', () => {
    expect(() => newFaker().any(undefined, () => 0)).toThrowError()
    expect(() => newFaker().any(null, () => 0)).toThrowError()
  })
  it ('Throws an error when generator is not a function', () => {
    expect(() => newFaker().any(3, 4)).toThrowError()
  })
  it ('Throws an error when generator is undefined or null', () => {
    expect(() => newFaker().any(3, undefined)).toThrowError()
    expect(() => newFaker().any(3, null)).toThrowError()
  })
})