const { newKit } = require('./contractKit')

const pick = require('./components/pick')
const recalculateHashChain = require('./components/recalculateHashChain')

const ERC20Abi = require('./abis/ERC20.json')
const CarbonChainAbi = require('./abis/CarbonChain.json')

const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
const CMCO2_ADDRESS = '0xe1aef5200e6a38ea69ad544c479bd1a176c8a510'
const CARBON_CHAIN_ADDRESS = '0x16a6182114b625871c4CA873a89fDC7C9f2E5C33'
const OFFSET_FIELDS = ['carbonTon', 'transactionInfo', 'onBehalfOf', 'sender', 'offsetHash', 'batchNumber']
const BATCH_FIELDS = ['totalCarbonOffset', 'hashChain', 'timestamp']

/**
 * @typedef {import('@celo/contractkit').ContractKit} Kit
 */

/**
 * 
 * @param {Kit} kit 
 */
const getCMCO2Instance = kit => new kit.web3.eth.Contract(ERC20Abi, CMCO2_ADDRESS)
/**
 * 
 * @param {Kit} kit 
 */
const getCarbonChainInstance = kit => new kit.web3.eth.Contract(CarbonChainAbi, CARBON_CHAIN_ADDRESS)

const carbonChain = async (privateKey, network) => {
  const kit = await newKit(privateKey, network)
  const [account] = await kit.web3.eth.getAccounts()

  const cMCO2Instance = getCMCO2Instance(kit)
  const carbonChainInstance = getCarbonChainInstance(kit)

  return {
    getBalances: async () => {
      const [cMCO2balance, { CELO, cUSD }] = await Promise.all([
        cMCO2Instance.methods.balanceOf(account).call(),
        kit.getTotalBalance(account)
      ])

      return {
        celo: CELO.toString(),
        cUSD: cUSD.toString(),
        cMCO2: cMCO2balance
      }
    },
    getAllowance: async () => {
      const allowance = await cMCO2Instance.methods.allowance(account, CARBON_CHAIN_ADDRESS).call()

      return allowance
    },
    approve: async (amount) => {
      const txObject = await cMCO2Instance.methods.approve(CARBON_CHAIN_ADDRESS, amount ?? MAX_UINT256)
      const tx = await kit.sendTransactionObject(txObject)

      return tx.waitReceipt()
    },
    offset: async (amount, transactionInfo, onBehalfOf) => {
      const txObject = await carbonChainInstance.methods.offsetCarbon(amount, transactionInfo, onBehalfOf)
      const tx = await kit.sendTransactionObject(txObject)

      const { events: { CarbonOffset } } = await tx.waitReceipt()

      return CarbonOffset
    },
    getOffset: async (index) => {
      // @todo add offsets length to carbon chain? this will fail if there's no such index
      const offset = await carbonChainInstance.methods.transactions(index).call()

      if (!offset) return false

      return pick(offset, OFFSET_FIELDS)
    },
    getBatch: async (index) => {
      // @todo add batches length to carbon chain? this will fail if there's no such index
      const batch = await carbonChainInstance.methods.batches(index).call()

      if (!batch) return false

      return pick(batch, BATCH_FIELDS)
    },
    /**
     * 
     * @param {number} offsetIndex 
     * @param {number} batchIndex 
     * @return {Promise<boolean>}
     */
    check: async (offsetIndex, batchIndex) => {

      // @todo fromBlock - toBlock?
      const options = { fromBlock: 'earliest', filter: { batchIndex: [batchIndex] } }

      const carbonChainInstancePromises = [
        carbonChainInstance.getPastEvents('CarbonOffset', options),
        carbonChainInstance.methods.transactions(offsetIndex).call(),
        carbonChainInstance.methods.batches(batchIndex).call(),
        batchIndex === 0
          ? { hashChain: 0 }
          : carbonChainInstance.methods.batches(batchIndex - 1).call()
      ]

      const [
        offsets,
        { offsetHash },
        { hashChain },
        { hashChain: previousHashChain }
      ] = await Promise.all(carbonChainInstancePromises)

      const includedInBatch = offsets
        .find(({ returnValues: { offsetHash: hash } }) => hash === offsetHash)

      if (!includedInBatch) return false

      return recalculateHashChain(offsets, previousHashChain) === hashChain
    }
  }
}

module.exports = carbonChain
