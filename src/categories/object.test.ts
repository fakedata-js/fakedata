import IntegerFake from './integer'
import ObjectFake from './object'
import StringFake from './string'
import ArrayFake from './array'

describe('ObjectFake', () => {
  it ('Generates an object with existing generators', () => {
    const obj = ObjectFake({
      key1: IntegerFake.hex,
      key2: StringFake,
    })

    expect(obj).toMatchObject({
      key1: expect.stringMatching(/0x[a-f0-9]{0,8}/),
      key2: expect.stringMatching(/[a-zA-Z0-9]+/),
    })
  })

  it ('Generates an object with constant values', () => {
    const obj = ObjectFake({
      key1: 12,
      key2: StringFake,
      key3: false
    })

    expect(obj).toMatchObject({
      key1: 12,
      key2: expect.stringMatching(/[a-zA-Z0-9]+/),
      key3: false
    })
  })

  it ('Generates an object with nested fake object', () => {
    const obj = ObjectFake({
      key: ObjectFake.shape({
        key1: true,
        key2: StringFake
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
    const obj = ObjectFake({
      key1: ArrayFake.shape(3, fn),
      key2: ArrayFake(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Generates an object with nested fake array', () => {
    const fn = jest.fn(() => 0).mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3)
    const obj = ObjectFake({
      key1: ArrayFake.shape(3, fn),
      key2: ArrayFake(3, () => 4)
    })

    expect(obj).toMatchObject({
      key1: [1, 2, 3],
      key2: [4, 4, 4],
    })
  })

  it ('Throws an error when no config is provided', () => {
    expect(() => ObjectFake()).toThrowError()
  })
  it ('Throws an error when config is not an object', () => {
    expect(() => ObjectFake(123)).toThrowError()
    expect(() => ObjectFake('123')).toThrowError()
    expect(() => ObjectFake([])).toThrowError()
  })
})