const { describe, expect, test } = require('@jest/globals');

const validatePrivateKeyAndNetwork = require('../components/validatePrivateKeyAndNetwork')

describe('test to validate privateKey and network', () => {
  test('privateKey Falsy needs to be returns an error', () => {

    expect(() =>
      validatePrivateKeyAndNetwork(null, 'TESTNET')
    ).toThrow(Error)

  })

  test('network Falsy needs to be returns an error', () => {

    expect(() =>
      validatePrivateKeyAndNetwork('0x00000000000000000000',)
    ).toThrow(Error)

  })

  test('privateKey error message is "Invalid private key"?', () => {
    try {
      validatePrivateKeyAndNetwork(null, 'TESTNET')
      // expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Invalid private key')
    }
  })

  test('network error message is "Invalid private key"?', () => {
    try {
      validatePrivateKeyAndNetwork('0x000000000000000000')
      // expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Invalid network')
    }
  })

})
