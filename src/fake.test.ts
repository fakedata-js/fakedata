import { normalizeConfig } from "./fake"

describe('Test helpers for all fake data', () => {
  describe('normalizeConfig', () => {
    it('Removes undefined and null values before normalization', () => {
      const config = normalizeConfig({ upper: true, lower: true, digits: true }, { upper: undefined, lower: undefined, digits: undefined })
      expect(config).toMatchObject({
        upper: true,
        lower: true,
        digits: true
      })
    })
  })
})