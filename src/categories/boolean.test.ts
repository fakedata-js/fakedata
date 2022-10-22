jest.mock('../core/util')

import bool from "./boolean";
import _ from '../core/util'

describe('Tests Boolean Fake Data', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it ('Returns true when random value is 0', () => {
    const randomSpy = jest.spyOn(_, 'random').mockReturnValueOnce(0)
    const value = bool.any()
    expect(randomSpy).toHaveReturnedWith(0)
    expect(value).toEqual(true)
  })

  it ('Returns false when random value is 1', () => {
    const randomSpy = jest.spyOn(_, 'random').mockReturnValueOnce(1)
    const value = bool.any()
    expect(randomSpy).toHaveReturnedWith(1)
    expect(value).toEqual(false)
  })
})