import ArrayFake from "./array";
import IntegerFake from "./integer";

describe('ArrayFake', () => {
  it ('Generates an array of existing fake types of given length', () => {
    const arr = ArrayFake(5, IntegerFake.hex)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(5)

    const hexRegex = /0x[a-f0-9]{0,8}/
    expect(arr).toEqual([
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
    const arr = ArrayFake(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 3, 4])
  })

  it ('Generates an array of mixed types', () => {
    const fn = jest.fn()
      .mockReturnValueOnce(2)
      .mockReturnValueOnce('value1')
      .mockReturnValueOnce({})
    const arr = ArrayFake(3, fn)

    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
    expect(arr).toEqual([2, 'value1', {}])
  })
  it ('Throws an error when length is not a number', () => {
    expect(() => ArrayFake('str', () => 0)).toThrowError()
  })
  it ('Throws an error when length is undefined or null', () => {
    expect(() => ArrayFake(undefined, () => 0)).toThrowError()
    expect(() => ArrayFake(null, () => 0)).toThrowError()
  })
  it ('Throws an error when generator is not a function', () => {
    expect(() => ArrayFake(3, 4)).toThrowError()
  })
  it ('Throws an error when generator is undefined or null', () => {
    expect(() => ArrayFake(3, undefined)).toThrowError()
    expect(() => ArrayFake(3, null)).toThrowError()
  })
})