const { describe, test, expect } = require('@jest/globals');

const pick = require('../components/pick');

const arrayOfKeys = ['a', 'd'];

const oldObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 10
}

const newObject = pick(oldObject, arrayOfKeys)

describe('pick module test', () => {
  test('pick create a new object from the values of the array that comes as the second parameter?', () => {

    expect(newObject).toHaveProperty('a');
    expect(newObject).toHaveProperty('d');

  })

  test('the b c properties do not exist in the new object?', () => {

    expect(newObject).not.toHaveProperty('c');
    expect(newObject).not.toHaveProperty('b');

  })
})
