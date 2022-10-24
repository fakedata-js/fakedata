import from from './select'

describe('FromList', () => {
  it('Returns a list from the given list', () => {
    expect(['Foo', 'bar']).toContain(from.any(['Foo', 'bar']))
  })

  it('Throws error when list is empty', () => {
    expect(() => from.any([])).toThrowError()
  })

  it('Throws error when list null or undefined', () => {
    expect(() => from.any(undefined)).toThrowError()
    expect(() => from.any(null)).toThrowError()
    expect(() => from.any()).toThrowError()
  })

  it('Throws error when list is not an array', () => {
    expect(() => from.any({})).toThrowError()
    expect(() => from.any('string')).toThrowError()
    expect(() => from.any(1234)).toThrowError()
  })


  it('Generates a random value from a list from aliased generator', () => {
    const alias = from.any.with(['Foo', 'bar'])
    expect(['Foo', 'bar']).toContain(alias())
  })

  describe('many', () => {
    it.each([
      ['less than the values list', 2],
      ['equal to values list', 4],
      ['more than the values list', 6],
    ])('Generates a multiple random values from a list when generated length is %s', (label, length) => {
      const fruites = ['Apple', 'Banana', 'Kiwi', 'Grapes']
      const list = from.any.many(fruites, length)
      expect(list).toHaveLength(length)
      list.forEach(fruite => {
        expect(fruites).toContainEqual(fruite)
      });
    })

    it('Throws error when length is < 0', () => {
      expect(() => from.any.many(['Apple', 'Banana', 'Kiwi', 'Grapes'], -1)).toThrowError()
    })
  })
})