const { newKit } = require('@celo/contractkit')

const constants = require('./constants')

module.exports = {
  /**
   * 
   * @param {string} privateKey 
   * @param {'TESTNET' | 'MAINNET'} network 
   */
  newKit: async (privateKey, network) => {
    if (!privateKey) throw Error('Invalid private key')
    if (!network) throw Error('Invalid network')

    const kit = newKit(constants[network].URL)
    kit.connection.addAccount(privateKey)

    const [account] = await kit.web3.eth.getAccounts()
    kit.defaultAccount = account

    return kit
  },
}
