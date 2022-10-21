import FromList from './from'
import DataProvider from '../core/provider'

const newFaker = () => new FromList(new DataProvider)
describe('FromList', () => {
  it ('Returns a list from the given list', () => {
    expect(['Foo', 'bar']).toContain(newFaker().any(['Foo', 'bar']))
  })

  it ('Throws error when list is empty', () => {
    expect(() => newFaker().any([])).toThrowError()
  })

  it ('Throws error when list null or undefined', () => {
    expect(() => newFaker().any(undefined)).toThrowError()
    expect(() => newFaker().any(null)).toThrowError()
    expect(() => newFaker().any()).toThrowError()
  })

  it ('Throws error when list is not an array', () => {
    expect(() => newFaker().any({})).toThrowError()
    expect(() => newFaker().any('string')).toThrowError()
    expect(() => newFaker().any(1234)).toThrowError()
  })
})