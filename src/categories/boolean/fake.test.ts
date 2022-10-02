import FakeDataProvider from "../../provider";
import BooleanFake, { BooleanFakeConfig } from "./fake";

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
})