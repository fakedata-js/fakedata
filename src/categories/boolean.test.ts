import Plugin, { IBooleanGenerator } from "./boolean";
import { createPlugin } from '../../test/util'

const plugin: Plugin = createPlugin(Plugin)
const bool: IBooleanGenerator = plugin.any

describe('Tests Boolean Fake Data', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it ('Returns true when random value is 0', () => {
    const randomSpy = jest.spyOn(plugin.provider, 'randomInt').mockReturnValueOnce(0)
    const value = bool()
    expect(randomSpy).toHaveReturnedWith(0)
    expect(value).toEqual(true)
  })

  it ('Returns false when random value is 1', () => {
    const randomSpy = jest.spyOn(plugin.provider, 'randomInt').mockReturnValueOnce(1)
    const value = bool()
    expect(randomSpy).toHaveReturnedWith(1)
    expect(value).toEqual(false)
  })
})