import BasePlugin from './base'

export type RandomGenerator = () => number

export interface IDataProvider {
  random: (min: number, max: number) => number
  randomInt: (min: number, max: number) => number
  set: (name: string, plugin: BasePlugin) => void
  get: (name: string) => BasePlugin
}

export default class DataProvider implements IDataProvider {
  private readonly randomFn: RandomGenerator
  private pluginsMap: { [name: string]: BasePlugin } = {}
  constructor (randomizer: RandomGenerator) {
    this.randomFn = randomizer
  }

  set (name: string, plugin: BasePlugin): void {
    this.pluginsMap[name] = plugin
  }

  get (name: string): BasePlugin {
    return this.pluginsMap[name]
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
