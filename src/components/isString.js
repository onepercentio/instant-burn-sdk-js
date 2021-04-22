/**
 * @description checar se o valor é um objeto ou um json
 * @param {*} value
 * @return boolean
 *
 * @example
 *
 * isObjectOrJson('a') // false
 * isObjectOrJson('{"a":"a"}') // true
 */
const isObjectOrJSON = value => {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * @description checa se o valor recevido é uma string e retorna um booleano
 * @param {*} value
 * @return boolean
 *
 * @example
 *
 * isString('teste') // true
 * isString({}) // false
 * isString([]) // false
 * isString(1) // false
 * isString(Symbol('teste')) // false
 * isString('[object String]') // false
 * isString('[object Object]') // false
 * isString('{"a":"a"}') // false
 */
const isString = (value) => !!value
  && value !== '[object Object]'
  && value !== '[object String]'
  && typeof value.valueOf() === 'string'
  && !isObjectOrJSON(value)

module.exports = isString;
