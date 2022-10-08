import { LOWER, UPPER, DIGITS, PUNCTUATION, SPCL_CHARS } from './constants/ascii'

export interface IFakeDataProvider {
  readonly lower: string[]
  readonly upper: string[]
  readonly digits: string[]
  readonly puntuations: string[]
  readonly spclChars: string[]
  readonly boolean: boolean[]
}

export default class FakeDataProvider implements IFakeDataProvider {
  readonly boolean: boolean[] = [true, false]
  readonly lower: string[] = LOWER.split('')
  readonly upper: string[] = UPPER.split('')
  readonly digits: string[] = DIGITS.split('')
  readonly puntuations: string[] = PUNCTUATION.split('')
  readonly spclChars: string[] = SPCL_CHARS.split('')

  static _instance: IFakeDataProvider = new FakeDataProvider()

  static get (): FakeDataProvider {
    return FakeDataProvider._instance
  }
}
