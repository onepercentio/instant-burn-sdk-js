/**
 * @description igual a funcionalidade nativa do Lodash.pick retorna um novo Objeto apartir de um array que faz a comparação dos objetos e do valores que estão no array
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
