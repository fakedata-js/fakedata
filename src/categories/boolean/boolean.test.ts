import FakeDataProvider from "../../provider";
import BooleanFake, { BooleanFakeConfig } from "./boolean";

describe('Tests Boolean Fake Data', () => {
  it ('Returns true when random value is 0', () => {
    const bool = new BooleanFake(new FakeDataProvider)
    jest.spyOn(bool, 'random').mockReturnValueOnce(0)
    expect(bool.generate(new BooleanFakeConfig)).toEqual(true)
  })

  it ('Returns false when random value is 1', () => {
    const bool = new BooleanFake(new FakeDataProvider)
    jest.spyOn(bool, 'random').mockReturnValueOnce(1)
    expect(bool.generate(new BooleanFakeConfig)).toEqual(false)
  })

  it ('Returns a value with default config', () => {
    const bool = new BooleanFake(new FakeDataProvider)
    const generate = jest.spyOn(bool, 'generate').mockReturnValueOnce(true).mockReturnValueOnce(false)
    expect(bool.any()).toEqual(true)
    expect(bool.any()).toEqual(false)
    expect(generate).toBeCalledTimes(2)
    expect(generate).toHaveBeenNthCalledWith(1, bool.config)
    expect(generate).toHaveBeenNthCalledWith(2, bool.config)
  })
})