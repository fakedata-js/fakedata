import FakeDataProvider, { IFakeDataProvider } from "../provider";
import util from "../util";

export default function BooleanFake() {
  const provider: IFakeDataProvider = FakeDataProvider.get()
  return provider.boolean[util.random(2, 0)]
}