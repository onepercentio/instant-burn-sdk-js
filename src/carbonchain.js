const { newKit } = require('./contractKit')
const ERC20abi = require('./abis/ERC20.json')

const getCMCO2Instance = kit => new kit.web3.eth.Contract(ERC20abi, '0x32a9fe697a32135bfd313a6ac28792dae4d9979d')

const carbonChain = (privateKey, network) => {
  const kit = newKit(privateKey, network)

  return {
    getCMCO2Balance: async () => {
      const [ account ] = await kit.web3.eth.getAccounts()
      const instance = getCMCO2Instance(kit)
      const balance = await instance.methods.balanceOf(account).call()
      // const balance = await instance.methods.balanceOf('0x0338d1A2A653230b59C2ed7f7Bc96843FB40342E').call()
      return balance
    }
  }
}

module.exports = carbonChain