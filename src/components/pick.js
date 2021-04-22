/**
 * @description just like the native functionality of Lodash.pick returns a new object from an array that compares the objects and values that are in the array
 *
 * @param {Object} object
 * @param {Array<String>} keys
 * @return Object
 *
 * @example
 *
 * const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
 *
 * result // { a:1, c: 2 }
 *
 */
const pick = (object, keys) => keys.reduce((obj, key) => {
  if (object && Object.prototype.hasOwnProperty.call(object, key)) {
    Object.assign(obj, { [key]: object[key] })
  }
  return obj
}, {})

module.exports = pick
