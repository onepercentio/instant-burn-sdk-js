/**
 * @description checks if the value is NaN ({}, null, undefined, {}, [], Symbol) and returns true if it is NaN
 * @param {*} value
 * @return boolean
 *
 * @example
 * isNaNValue(12)// false
 * isNaNValue('12')// false
 * isNaNValue(0) // false
 * isNaNValue(null) // true
 * isNaNValue(undefined) // true
 * isNaNValue({}) // true
 * isNaNValue([]) // true
 * isNaNValue(Symbol(12)) // true
 */
const isNaNValue = (value) => (typeof value === 'object' || typeof value === 'undefined' || typeof value === 'symbol') && !Number.isNaN(value)

module.exports = isNaNValue;
