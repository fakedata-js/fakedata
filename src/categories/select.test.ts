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
})