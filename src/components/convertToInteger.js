const _ = require('lodash')
const { UNCAUGHT_ERROR } = require('iate-components/src/errors')
const BigNumber = require('bignumber.js')

const TEN = new BigNumber(10)

module.exports = (value, decimals) => {
  if (!_.isString(value)) throw new UNCAUGHT_ERROR('Value must be a string')
  if (_.isNaN(decimals) || _.isNil(decimals)) throw new UNCAUGHT_ERROR('Decimals must be a valid number')
  if (decimals === 0) return value

  const multiplier = TEN.pow(decimals)

  return new BigNumber(value, 10)
    .mul(multiplier)
    .round(0, BigNumber.ROUND_DOWN)
    .toString(10)
}