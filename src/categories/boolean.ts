import FakeDataProvider, { IFakeDataProvider } from '../provider'
import util from '../util'

export default function BooleanFake (): boolean {
  const provider: IFakeDataProvider = FakeDataProvider.get()
  return provider.boolean[util.random(0, 2)]
}
