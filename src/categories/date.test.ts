import DataProvider from '../core/provider'
import DateFaker from './date'

let faker: DateFaker
describe('Date Faker', () => {
  beforeEach(() => {
    faker = new DateFaker(new DataProvider)
  })
  it ('Generates todays date', () => {
    const expected = new Date()
    const date = faker.today()

    expect(date.getDate()).toBe(expected.getDate())
    expect(date.getMonth()).toBe(expected.getMonth())
    expect(date.getFullYear()).toBe(expected.getFullYear())
  })
})