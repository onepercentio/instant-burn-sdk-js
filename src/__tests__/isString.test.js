const { describe, test, expect } = require('@jest/globals')

const isString = require('../components/isString')

describe('Test for the isString module', () => {
  test('test if the value is a valid string', () => {
    const hasString = isString('hello world')
    expect(hasString).toBe(true)
    expect(hasString).toBeTruthy()
  })

  test('values that do not match a valid string', () => {
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString(1)).toBe(false)
    expect(isString(Symbol('teste'))).toBe(false)
    expect(isString('[object String]')).toBe(false)
    expect(isString('[object Object]')).toBe(false)
    expect(isString('{"a":"a"}')).toBe(false)
  })
})