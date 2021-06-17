const { describe, expect, test, beforeAll } = require('@jest/globals');

const CarbonChain = require('../carbonchain');
const { TESTNET } = require('../constants');

const privateKey = process.env.PRIVATE_KEY;

let check;

describe('integrated CarbonChain test', () => {

  beforeAll(async () => {
    const cc = await CarbonChain(privateKey, TESTNET)
    check = cc.check
  })

  test('Does CarbonChain check bring a boolean as a result?', async () => {

    const result = await check(1)

    expect(result).not.toBeNull()
    expect(typeof result).toBe('boolean')

  })

  test('offset is greater than number of transactions returns an error?', async () => {
    const offsetIndex = 1000000
    try {
      await check(offsetIndex)
    } catch (error) {
      expect(error.message).toBe('No offset at index 1000000')
    }

  })

  test('Does CarbonChain check bring false as a result?', async () => {
    check = jest.fn(index => Promise.resolve(false))
    const result = await check(1)
    expect(result).toBeFalsy()
  })

})
