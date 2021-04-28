const pick = require('./pick')
const recalculateHashChain = require('./recalculateHashChain')

const { OFFSET_FIELDS, BATCH_FIELDS, DEPLOYMENT_BLOCK_NUMBER, MAX_UINT256 } = require('../constants')

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
    const allowance = await cMCO2Instance.methods.allowance(kit.defaultAccount, cMCO2Instance._address).call()

    return allowance
  },
  approve: async (amount) => {
    const txObject = await cMCO2Instance.methods.approve(cMCO2Instance._address, amount ?? MAX_UINT256)
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
    const numberOfOffsets = await carbonChainInstance.methods.numberOfTransactions().call()

    if (index >= numberOfOffsets) {
      throw new Error(`No offset at index ${index}`)
    };

    const offset = await carbonChainInstance.methods.transactions(index).call()

    if (!offset) return false

    return pick(offset, OFFSET_FIELDS)
  },
  getBatch: async (index) => {
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
    try {

      const numberOfTransactions = await carbonChainInstance.methods.numberOfTransactions().call()
      console.log("🚀 ~ file: instantBurn.js ~ line 74 ~ check: ~ numberOfTransactions", numberOfTransactions)

      if (offsetIndex >= numberOfTransactions) {
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
    } catch (error) {
      throw error
    }
  }
})

module.exports = instantBurn;
