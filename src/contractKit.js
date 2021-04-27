const { newKit } = require('@celo/contractkit')

const NETWORKS = {
  TESTNET: 'https://alfajores-forno.celo-testnet.org',
  MAINNET: 'https://forno.celo.org',
}

module.exports = {
  newKit: async (privateKey, network) => {
    if (!privateKey) throw Error('Invalid private key')
    if (!network) throw Error('Invalid network')

    const kit = newKit(network)
    kit.connection.addAccount(privateKey)

    const [account] = await kit.web3.eth.getAccounts()
    kit.defaultAccount = account

    return kit
  },
  NETWORKS
}
