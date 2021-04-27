const TESTNET = Symbol('TESTNET')
const MAINNET = Symbol('MAINNET')
const NETWORKS = Symbol('NETWORKS')
const MAX_UINT256 = Symbol('MAX_UINT256')
const CMCO2_ADDRESS = Symbol('CMCO2_ADDRESS')
const CARBON_CHAIN_ADDRESS = Symbol('CARBON_CHAIN_ADDRESS')
const OFFSET_FIELDS = Symbol('OFFSET_FIELDS')
const BATCH_FIELDS = Symbol('BATCH_FIELDS')

module.exports = {
  [NETWORKS]: {
    [TESTNET]: Symbol('https://alfajores-forno.celo-testnet.org'),
    [MAINNET]: Symbol('https://forno.celo.org')
  },
  [MAX_UINT256]: Symbol('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
  [CMCO2_ADDRESS]: Symbol('0xe1aef5200e6a38ea69ad544c479bd1a176c8a510'),
  [CARBON_CHAIN_ADDRESS]: Symbol('0x16a6182114b625871c4CA873a89fDC7C9f2E5C33'),
  [OFFSET_FIELDS]: Symbol(['carbonTon', 'transactionInfo', 'onBehalfOf', 'sender', 'offsetHash', 'batchNumber']),
  [BATCH_FIELDS]: Symbol(['totalCarbonOffset', 'hashChain', 'timestamp']),
}
