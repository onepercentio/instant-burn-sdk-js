const carbonChain = require('./src/carbonchain')
const { MAINNET, TESTNET } = require('./src/constants')

module.exports = {
  carbonChain,
  NETWORKS: {
    MAINNET,
    TESTNET
  }
}
