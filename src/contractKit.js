const { newKit } = require('@celo/contractkit')

const constants = require('./constants')

module.exports = {
  /**
   * 
   * @param {string} privateKey 
   * @param {'TESTNET' | 'MAINNET'} network 
   */
  newKit: async (privateKey, network) => {
    const kit = newKit(network.URL)
    kit.connection.addAccount(privateKey)

    const [account] = await kit.web3.eth.getAccounts()
    kit.defaultAccount = account

    return kit
  },
}
