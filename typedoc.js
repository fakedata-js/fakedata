module.exports = {
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": [
    "./src/index.ts",
    "./src/core/provider.ts",
    "./src/categories/array.ts",
    "./src/categories/boolean.ts",
    "./src/categories/date.ts",
    "./src/categories/integer.ts",
    "./src/categories/number.ts",
    "./src/categories/object.ts",
    "./src/categories/select.ts",
    "./src/categories/string.ts",
  ],
  "out": "docs",
  "plugin": [
    // "typedoc-plugin-markdown",
    "typedoc-plugin-merge-modules"
  ],
  "excludeNotDocumented": true
}