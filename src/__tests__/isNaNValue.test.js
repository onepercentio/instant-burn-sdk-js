const { describe, expect, test } = require('@jest/globals');

const isNaNValue = require('../components/isNaNValue')

describe('IsNaNValue module test', () => {

  test('testing cases that isNaNValue is false', () => {
    expect(isNaNValue(12)).toBeFalsy()
    expect(isNaNValue('12')).toBeFalsy()
    expect(isNaNValue(0)).toBeFalsy()
  })

  test('testing cases that isNaNValue is true', () => {
    expect(isNaNValue({})).toBeTruthy()
    expect(isNaNValue([])).toBeTruthy()
    expect(isNaNValue(Symbol(12))).toBeTruthy()
    expect(isNaNValue(null)).toBeTruthy()
    expect(isNaNValue(undefined)).toBeTruthy()
  })

})
