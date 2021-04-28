const { describe, expect, test } = require('@jest/globals');

const CarbonChain = require('../carbonchain');
const { NETWORKS } = require('../contractKit');

const privateKey = '0x8c5d63543d26797c41b0384e2d6c0e62822221e82fb4850d1b96d71d8452baf5'

describe('integrated CarbonChain test', () => {
  test('Does CarbonChain check bring a boolean as a result?', async () => {

    const { check } = await CarbonChain(privateKey, NETWORKS.TESTNET)

    const result = await check(1, 0)

    expect(result).not.toBeNull()
    expect(typeof result).toBe('boolean')

  })

  // test('Does CarbonChain check bring true as a result?', () => { })
  // test('Does CarbonChain check bring false as a result?', () => { })
})
