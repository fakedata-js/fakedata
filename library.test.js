const fake = require('./dist/index')

describe('library test', () => {
  it ('Generates a boolean', () => {
    expect(`${fake.bool()}`).toMatch(/^true|false$/)
  })
  it ('Generates a number', () => {
    expect(`${fake.number()}`).toMatch(/^-?\d+\.\d+$/)
  })
  it ('Generates a integer', () => {
    expect(`${fake.int()}`).toMatch(/^-?\d+$/)
  })
  it ('Generates a string', () => {
    expect(fake.string()).toMatch(/^[a-zA-z]{2,10}$/)
  })
  it ('Generates a array', () => {
    expect(fake.array(2, fake.string)).toStrictEqual([expect.stringMatching(/^[a-zA-z]{2,10}$/), expect.stringMatching(/^[a-zA-z]{2,10}$/)])
  })
  it ('Generates a object', () => {
    expect(fake.object({ key: fake.string })).toMatchObject({ key: expect.stringMatching(/^[a-zA-z]{2,10}$/) })
  })
  it ('Generates a choice', () => {
    expect(fake.select(['Yes', 'No'])).toMatch(/^Yes|No$/)
  })
})