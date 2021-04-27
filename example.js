const carbonChain = require('./index')
const { NETWORKS } = require('./src/contractKit');

const constants = require('./src/constants');

(async () => {
  const cc = await carbonChain('0x8c5d63543d26797c41b0384e2d6c0e62822221e82fb4850d1b96d71d8452baf5', NETWORKS.TESTNET)
  // const cc = await carbonChain('0x8c5d63543d26797c41b0384e2d6c0e62822221e82fb4850d1b96d71d8452baf5', NETWORKS.TESTNET)
  // console.log(await cc.getBalances())
  // console.log(await cc.approve())
  // console.log(await cc.getAllowance())
  // console.log(await cc.getOffset(7))
  // console.log(await cc.getBatch(1))
  console.log(await cc.check(3, 1))

  // console.log(await cc.offset(1, 'txinfo', 'me'))
})()