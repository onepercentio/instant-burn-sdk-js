const { newKit } = require('./contractKit')
const instantBurn = require('./components/instantBurn')
const InstanceContract = require('./components/instanceContract')
const validatePrivateKeyAndNetWork = require('./components/validatePrivateKeyAndNetwork')

const ERC20Abi = require('./abis/ERC20.json')
const CarbonChainAbi = require('./abis/CarbonChain.json')

const constants = require('./constants')

/**
 * 
 * @param {string} privateKey 
 * @param {'TESTNET' | 'MAINNET'} network 
 */
const carbonChain = async (privateKey, network) => {
  validatePrivateKeyAndNetWork(privateKey, network)
  const kit = await newKit(privateKey, network)
  const { CMCO2_ADDRESS, CARBON_CHAIN_ADDRESS } = constants[network]

  const cMCO2Instance = InstanceContract(kit)(ERC20Abi, CMCO2_ADDRESS)
  const carbonChainInstance = InstanceContract(kit)(CarbonChainAbi, CARBON_CHAIN_ADDRESS)

  return instantBurn(kit, cMCO2Instance, carbonChainInstance)
}

module.exports = carbonChain
