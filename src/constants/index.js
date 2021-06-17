const constants = Object.freeze({
  TESTNET: Object.freeze({
    URL: 'https://alfajores-forno.celo-testnet.org',
    CMCO2_ADDRESS: '0xe1aef5200e6a38ea69ad544c479bd1a176c8a510',
    CARBON_CHAIN_ADDRESS: '0xF4Db08607786253BCE3cc55Ad504E34335655337',
  }),
  MAINNET: Object.freeze({
    URL: 'https://forno.celo.org',
    CMCO2_ADDRESS: '0x32a9fe697a32135bfd313a6ac28792dae4d9979d',
    CARBON_CHAIN_ADDRESS: '0x6c25425886c00d765cccf7f2A4fB785f42e40855',
  }),
  MAX_UINT256: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  OFFSET_FIELDS: ['carbonTon', 'transactionInfo', 'onBehalfOf', 'sender', 'offsetHash', 'batchNumber'],
  BATCH_FIELDS: ['totalCarbonOffset', 'hashChain', 'timestamp'],
  DEPLOYMENT_BLOCK_NUMBER: 4822000
})

module.exports = constants
