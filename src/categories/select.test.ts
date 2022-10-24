import { createPlugin } from '../../test/util'
import Plugin from './select'

const select: Plugin = createPlugin(Plugin)

describe('FromList', () => {
  it('Returns a list from the given list', () => {
    expect(['Foo', 'bar']).toContain(select.any(['Foo', 'bar']))
  })

  it('Throws error when list is empty', () => {
    expect(() => select.any([])).toThrowError()
  })

  it('Throws error when list null or undefined', () => {
    expect(() => select.any(undefined)).toThrowError()
    expect(() => select.any(null)).toThrowError()
    expect(() => select.any()).toThrowError()
  })

  it('Throws error when list is not an array', () => {
    expect(() => select.any({})).toThrowError()
    expect(() => select.any('string')).toThrowError()
    expect(() => select.any(1234)).toThrowError()
  })


  it('Generates a random value from a list from aliased generator', () => {
    const alias = select.any.with(['Foo', 'bar'])
    expect(['Foo', 'bar']).toContain(alias())
  })

  describe('multiple values', () => {
    it.each([
      ['less than the values list', 2],
      ['equal to values list', 4],
      ['more than the values list', 6],
    ])('Generates a multiple random values from a list when generated length is %s', (label, length) => {
      const fruites = ['Apple', 'Banana', 'Kiwi', 'Grapes']
      const list = select.any(fruites, length)
      expect(list).toHaveLength(length)
      list.forEach(fruite => {
        expect(fruites).toContainEqual(fruite)
      });
    })

    it.each([
      ['less than the values list', 2],
      ['equal to values list', 4],
      ['more than the values list', 6],
    ])('Generates a multiple random values from a alias when generated length is %s', (label, length) => {
      const fruites = ['Apple', 'Banana', 'Kiwi', 'Grapes']
      const list = (select.any.with(fruites))(length)
      expect(list).toHaveLength(length)
      list.forEach(fruite => {
        expect(fruites).toContainEqual(fruite)
      });
    })

    it('Throws error when length is < 0', () => {
      expect(() => select.any(['Apple', 'Banana', 'Kiwi', 'Grapes'], -1)).toThrowError()
    })
  })
})