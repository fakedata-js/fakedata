import DataProvider from "../src/core/provider";

const provider = new DataProvider(Math.random)
export function createPlugin(PluginClass, name?: string) {
  const plugin = new PluginClass(provider)
  if (name) {
    provider.set(name, plugin)
  }
  return plugin
}