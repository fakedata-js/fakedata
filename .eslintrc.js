module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  ignorePatterns: ['src/**/*.test.ts'],
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    "@typescript-eslint/no-empty-interface": ['warn'],
    "@typescript-eslint/consistent-type-assertions": ['warn'],
    "@typescript-eslint/no-dynamic-delete": ['warn']
  }
}
