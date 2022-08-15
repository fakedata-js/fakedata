import RegExBuilder from '../builder'

describe('Tests RegExBuilder', () => {
  it ('Creates a new instance', () => {
    const builder = new RegExBuilder()

    expect(builder).toBeTruthy()
  })

  it ('Throws exception when no matchers are provided', () => {
    const builder = new RegExBuilder()

    expect(builder.build).toThrow(/Cannot build empty regular expression/i)
  })
})