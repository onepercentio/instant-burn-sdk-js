const { describe, expect, test } = require('@jest/globals');

const getOwnPropertySymbol = require('../components/getOwnPropertySymbol')

const constants = require('../constants')

describe('Function test getOwnPropertySymbol', () => {
  test('the function brings all the symbols of constants ?', () => {
    const propertySymbol = getOwnPropertySymbol(constants)(0)
    console.log("🚀 ~ file: getOwnPropertySymbol.test.js ~ line 10 ~ bringsallthesymbolsofconstants?', ~ propertySymbol", propertySymbol)
  })
})