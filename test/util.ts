import DataProvider from "../src/core/provider";

export function createPlugin(PluginClass) {
  return new PluginClass(new DataProvider(Math.random))
}