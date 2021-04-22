/**
 * @description checa se o valor é NaN({}, null, undefined, {}, [], Symbol) e retorna true caso seja NaN
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
