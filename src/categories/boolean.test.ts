jest.mock('../util')

import BooleanFake from "./boolean";
import _ from '../util'
import Proivder from '../core/provider'


const newFaker = () => new BooleanFake(new Proivder)
describe('Tests Boolean Fake Data', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it ('Returns true when random value is 0', () => {
    const randomSpy = jest.spyOn(_, 'random').mockReturnValueOnce(0)
    const value = newFaker().any()
    expect(randomSpy).toHaveReturnedWith(0)
    expect(value).toEqual(true)
  })

  it ('Returns false when random value is 1', () => {
    const randomSpy = jest.spyOn(_, 'random').mockReturnValueOnce(1)
    const value = newFaker().any()
    expect(randomSpy).toHaveReturnedWith(1)
    expect(value).toEqual(false)
  })
})