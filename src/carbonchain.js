const { newKit } = require('./contractKit')
const instantBurn = require('./components/instantBurn')

const InstanceContract = require('./components/instanceContract')

const ERC20Abi = require('./abis/ERC20.json')
const CarbonChainAbi = require('./abis/CarbonChain.json')

const CMCO2_ADDRESS = '0xe1aef5200e6a38ea69ad544c479bd1a176c8a510'
const CARBON_CHAIN_ADDRESS = '0xF4Db08607786253BCE3cc55Ad504E34335655337'

const carbonChain = async (privateKey, network) => {
  const kit = await newKit(privateKey, network)

  const cMCO2Instance = InstanceContract(kit)(ERC20Abi, CMCO2_ADDRESS)
  const carbonChainInstance = InstanceContract(kit)(CarbonChainAbi, CARBON_CHAIN_ADDRESS)

  return instantBurn(kit, cMCO2Instance, carbonChainInstance)
}

module.exports = carbonChain
