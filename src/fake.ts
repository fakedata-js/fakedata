import { IFakeDataProvider } from './provider'

export interface IFakeConfig {

}

export default abstract class Fake<T> {
  provider: IFakeDataProvider
  config: IFakeConfig = { }

  constructor(provider: IFakeDataProvider) {
    this.provider = provider
  }

  random(max: number, min: number = 0) {
    return Math.floor((Math.random() * (max - min)) + min)
  }

  abstract initConfig(): IFakeConfig
  abstract generate(config: IFakeConfig): T
}