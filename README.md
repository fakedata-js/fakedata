A library to generate fake data for testing purpose with focus on usability and customization

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/fakedata-js/fakedata/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/fakedata-js/fakedata/tree/main)

## Installation
```sh
npm i --save-dev @fakejs/fake
```

## Usage
```js
// Import fake object
import fake from '@fakejs/fake'

// Generate a random value from the available APIs
fake.bool()
```

## API
- [Boolean](#boolean)
  - [fake.bool](#fakebool)
- [Number](#number)
  - [fake.int](#fakeint)
  - [fake.number](#fakenumber)
- [String](#string)
  - [fake.string](#fakestring)
  - [fake.string.t](#fakestringt)
- [Array and Objects](#array-and-objects)
  - [fake.array](#fakearray)
  - [fake.object](#fakeobject)
- [Choice](#choice)
  - [fake.from](#fakefrom)
- [Alias](#alias)

## WIP
 - `Date`
 - `Time`
 - `Person`
 - `Internet and communication`
 - `Location`
 - `Currency`

### Boolean
Generate a random boolean value
#### fake.bool
```js
fake.bool() // true or false
```

### Number
#### fake.int
```js
// generate a natural number
fake.int()                      // generates an integer between -10000000 and 10000000

// generate an integer within a custom range
fake.int({ min: 0, max: 100 })  // generates a value between 0 and 100
fake.int({ min: 0 })            // generates a value between 0 and 10000000
fake.int({ max: 0 })            // generates a value between -10000000 and 0

// generate an integer with fix digits
fake.int({ digits: 3 })         // generates a value with 3 digits (i.e. between 100 and 999)
```

#### fake.number
```js
// generate a floating point number
fake.number()                      // generates a float between -10000000 and 10000000

// generate a floating point number within a custom range
fake.number({ min: 0, max: 100 })  // generates a value between 0 and 100
fake.number({ min: 0 })            // generates a value between 0 and 10000000
fake.number({ max: 0 })            // generates a value between -10000000 and 0
```

### String
#### fake.string
```js
// generate a random string
fake.string() // generate a alpha numeric string with length between 2 and 10

// generate a string which only contains letters `a`, `b` and `c` (e.g. abcbbca)
fake.string({ charset: 'abc' })
```

`fake.string` also accepts optional configuration object which can be used to customize how the strings are generated
Name|Type|Default|Description
----|----|-------|-----------
`min`|`number`|2|Minimum length of string
`max`|`number`|10|Maximum length of string
`length`|`number`||Exact length of string. This takes precidence over `min` and `max` values
`upper`|`boolean`|`true`|Include uppercase letters(A-Z) in string
`lower`|`boolean`|`true`|Include lowercase letters(a-z) in string
`digits`|`boolean`|`false`|Include digits(0-9) in string
`charset`|`string`||Provide custom characters to be used to generate the string. If this is provided then `upper`, `lower`, and `digits` options are ignored.
`hex`|`boolean`|`false`|Generate a hexadecimal string. This option can be combined with `upper` option to generate hexadecimal string with upper case and lower case letters. If this option is set to `true` then `lower`, `digits` and `charset` options are ignored

#### fake.string.t
Generate a custom formatted string using literal string syntax
```js
fake.string.t`I have ${fake.int.with({ digits: 1 })} eggs.`

// Returns a string which looks like
'I have 4 eggs.'
```
### Array and Objects
### fake.array
Generates an array from given generator function
```js
// generate an array of any type
fake.array(10, fake.int)    // generates an array of integer with 10 elements
fake.array(5, fake.string)  // generates an array of string with 5 elements

fake.array(10, () => Math.random()) // generates an array of random numbers with 10 elements
```
`fake.array` function accepts two arguments 1st argument is length of the array and 2nd argument is a random value generator function which can be one of the `fake.xxx` functions or any custom function

### fake.object
Generates an object from of defined shape
```js
// Generate a object
const person = fake.object({
  name: fake.string({ length: 5, upper: false }),
  age: fake.int({ min: 18, max: 65 }),
})
// Generates an object which looks like
{
  name: 'abxfg',
  age: 20
}
```
##### Nested objects
```js
const person = fake.object({
  name: fake.string({ length: 5, upper: false }),
  age: fake.int({ min: 18, max: 65 }),
  address: {
    city: fake.string({ length: 5, upper: false }),
    pincode: fake.int({ digits: 6 })
  }
})

// Generates an object which looks like
{
  name: 'abxfg',
  age: 20,
  address: {
    city: 'hdked',
    pin: 201301
  }
}
```
### Choice
### fake.from
This api can be used to generate a random value from a fixed set of values. 
```js
fake.from(['Yes', 'No']) // returns either 'Yes' or 'No'

fake.from(['Apple', 'Banana', 'Kiwi']) // retturns one of 'Apple', 'Banana' or 'Kiwi'
```

### Alias
Alias functions can be used to create an alias for any fake value generators. This is really helpful when we want to generate fake values with same configuration at multiple places but don't want to keep repeating your self.

For example you can use it to generate multiple fake objects with same configuration then you can simply create an alias for with `fake.object.with` api
```js
const personFn = fake.object.with({
  name: fake.string({ length: 5, upper: false }),
  age: fake.int({ min: 18, max: 65 }),
  address: {
    city: fake.string({ length: 5, upper: false }),
    pincode: fake.int({ digits: 6 })
  }
})

const person1 = personFn()
const person2 = personFn()
```
In above example `person1` and `person2` will have same structure but different values.