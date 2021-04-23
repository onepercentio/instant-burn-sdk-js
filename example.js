const carbonChain = require('./index')
const { NETWORKS } = require('./src/contractKit');

(async () => {
  try {

    const cc = await carbonChain('0x8c5d63543d26797c41b0384e2d6c0e62822221e82fb4850d1b96d71d8452baf5', NETWORKS.TESTNET)
    // const cc = await carbonChain('0x8c5d63543d26797c41b0384e2d6c0e62822221e82fb4850d1b96d71d8452baf5', NETWORKS.TESTNET)
    // console.log(await cc.getBalances())
    // console.log(await cc.approve())
    // console.log(await cc.getAllowance())
    // console.log('getOffset', await cc.getOffset(0))
    // console.log('getBatch', await cc.getBatch(0))

    console.time('check function')
    console.log(await cc.check(0, 0))
    console.timeEnd('check function')
  } catch (error) {
    console.log("🚀 ~ file: example.js ~ line 16 ~ error", error)

  }

  // console.log(await cc.offset(1, 'txinfo', 'me'))
})()