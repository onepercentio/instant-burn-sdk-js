/**
 * 
 * @param {string} privateKey 
 * @param {'TESTNET' | 'MAINNET'} network 
 */
const validatePrivateKeyAndNetwork = (privateKey, network) => {
  if (!privateKey) throw Error('Invalid private key')
  if (!network) throw Error('Invalid network')
}

module.exports = validatePrivateKeyAndNetwork
