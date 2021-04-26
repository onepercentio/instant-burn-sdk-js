const pick = require('./pick')
const recalculateHashChain = require('./recalculateHashChain')

const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const CARBON_CHAIN_ADDRESS = '0xF4Db08607786253BCE3cc55Ad504E34335655337'
const DEPLOYMENT_BLOCK_NUMBER = 4822000

const OFFSET_FIELDS = ['carbonTon', 'transactionInfo', 'onBehalfOf', 'sender', 'offsetHash', 'batchNumber']
const BATCH_FIELDS = ['totalCarbonOffset', 'hashChain', 'timestamp']

const instantBurn = (kit, cMCO2Instance, carbonChainInstance) => ({
  getBalances: async () => {
    const [cMCO2balance, { CELO, cUSD }] = await Promise.all([
      cMCO2Instance.methods.balanceOf(kit.defaultAccount).call(),
      kit.getTotalBalance(kit.defaultAccount)
    ])

    return {
      celo: CELO.toString(),
      cUSD: cUSD.toString(),
      cMCO2: cMCO2balance
    }
  },
  getAllowance: async () => {
    const allowance = await cMCO2Instance.methods.allowance(kit.defaultAccount, CARBON_CHAIN_ADDRESS).call()

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
    const numberOfOffsets = await carbonChainInstance.methods.numberOfTransactions().call()

    if (index >= numberOfOffsets) {
      throw new Error(`No offset at index ${index}`)
    };

    const offset = await carbonChainInstance.methods.transactions(index).call()

    if (!offset) return false

    return pick(offset, OFFSET_FIELDS)
  },
  getBatch: async (index) => {
    // @todo add batches length to carbon chain? this will fail if there's no such index
    const numberOfBatches = await carbonChainInstance.methods.numberOfBatches().call()

    if (index >= numberOfBatches) {
      throw new Error(`No batch at index ${index}`)
    };

    const batch = await carbonChainInstance.methods.batches(index).call()

    if (!batch) return false

    return pick(batch, BATCH_FIELDS)

  },
  /**
   * 
   * @param {number} offsetIndex 
   * @return {Promise<boolean>}
   */
  check: async (offsetIndex) => {
    const numberOfBatches = await carbonChainInstance.methods.numberOfBatches().call()

    if (offsetIndex >= numberOfBatches) {
      throw new Error(`No offset at index ${offsetIndex}`)
    };

    const { offsetHash, batchNumber: batchIndex } = await carbonChainInstance.methods.transactions(offsetIndex).call()

    const carbonChainInstancePromises = [
      carbonChainInstance.methods.batches(batchIndex).call(),
      batchIndex === 0
        ? { hashChain: 0, blockNumber: DEPLOYMENT_BLOCK_NUMBER }
        : carbonChainInstance.methods.batches(batchIndex - 1).call()
    ]

    const [
      { hashChain, blockNumber: offsetBlockNumber },
      { hashChain: previousHashChain, blockNumber: previousBlockNumber }
    ] = await Promise.all(carbonChainInstancePromises)

    const options = {
      fromBlock: previousBlockNumber,
      toBlock: offsetBlockNumber,
      filter: {
        batchIndex: [batchIndex]
      }
    }

    const offsets = await carbonChainInstance.getPastEvents('CarbonOffset', options)

    const includedInBatch = offsets
      .find(({ returnValues: { offsetHash: hash } }) => hash === offsetHash)

    if (!includedInBatch) return false

    return recalculateHashChain(offsets, previousHashChain) === hashChain
  }
})

module.exports = instantBurn;
