const constants = Object.freeze({
  TESTNET: Object.freeze({
    URL: 'https://alfajores-forno.celo-testnet.org',
    CMCO2_ADDRESS: '0xe1aef5200e6a38ea69ad544c479bd1a176c8a510',
    CARBON_CHAIN_ADDRESS: '0x16a6182114b625871c4CA873a89fDC7C9f2E5C33',
  }),
  MAINNET: Object.freeze({
    URL: 'https://forno.celo.org',
    CMCO2_ADDRESS: '0x32a9fe697a32135bfd313a6ac28792dae4d9979d',
    CARBON_CHAIN_ADDRESS: '',
  }),
  MAX_UINT256: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  OFFSET_FIELDS: ['carbonTon', 'transactionInfo', 'onBehalfOf', 'sender', 'offsetHash', 'batchNumber'],
  BATCH_FIELDS: ['totalCarbonOffset', 'hashChain', 'timestamp'],
})

module.exports = constants
