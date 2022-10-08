import StringFake, { defaults } from "./string";

describe('StringFake', () => {
    it ('Generates a string of length betwwen default range', () => {
        const value = StringFake()

        expect(value).toBeTruthy()
        expect(value.length).toBeGreaterThanOrEqual(defaults.minLength)
        expect(value.length).toBeLessThanOrEqual(defaults.maxLength)
    })

    it ('Generates a string of fixed length when length is given', () => {
        const value = StringFake({ length: 20 })
        expect(value).toHaveLength(20)
    })
})