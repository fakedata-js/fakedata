export type RandomGenerator = () => number

export interface IDataProvider {
  random: (min: number, max: number) => number
  randomInt: (min: number, max: number) => number
}

export default class DataProvider implements IDataProvider {
  private readonly randomFn: RandomGenerator
  constructor (randomizer: RandomGenerator) {
    this.randomFn = randomizer
  }

  random (min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return (this.randomFn() * (max - min)) + min
  }

  randomInt (min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor((this.randomFn() * (max - min)) + min)
  }
}
