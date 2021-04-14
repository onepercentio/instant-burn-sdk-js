const { newKit } = require('@celo/contractkit')

const NETWORKS = {
  TESTNET: 'https://alfajores-forno.celo-testnet.org',
  MAINNET: 'https://forno.celo.org',
}

module.exports = {
  newKit: (privateKey, network) => {
    if (!privateKey) throw Error('Invalid private key')

    const kit = newKit(network ?? NETWORKS.TESTNET)
    kit.connection.addAccount(privateKey)

    return kit
  },
  NETWORKS
}
