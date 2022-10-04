import util from './util'

describe('Tests utility', () => {
    describe('Tests random method', () => {
        it ('Generates random values betwen a range', () => {
            for(let i = 0; i < 10000; i++) {
                const random = util.random(25, 10000000)
                expect(random).toBeGreaterThanOrEqual(25)
                expect(random).toBeLessThanOrEqual(10000000)
            }
        })
    })
})