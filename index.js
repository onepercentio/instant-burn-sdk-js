const { NETWORKS } = require('./src/contractKit')
const carbonChain = require('./src/carbonchain')

module.exports = carbonChain

;(async () => {
  const cc = carbonChain('', NETWORKS.MAINNET)
  console.log(cc)
  console.log(await cc.getCMCO2Balance())
})()