import { IFakeDataProvider } from './provider'

export interface IFakeConfig {

}

export default abstract class Fake<T> {
  provider: IFakeDataProvider
  config: IFakeConfig = { }

  constructor(provider: IFakeDataProvider) {
    this.provider = provider
  }

  abstract initConfig(): IFakeConfig
  abstract generate(config: IFakeConfig): T
}