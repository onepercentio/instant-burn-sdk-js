const { carbonChain } = require('./index')

const privateKey = '0x8c5d63543d26797c41b0384e2d6c0e62822221e82fb4850d1b96d71d8452baf5';
const network = 'TESTNET';

(async () => {
  try {

    const cc = await carbonChain(privateKey, network)
    // console.log(await cc.getBalances())
    // console.log(await cc.approve())
    // console.log(await cc.getAllowance())
    // console.log('getOffset', await cc.getOffset(0))
    // console.log('getBatch', await cc.getBatch(1))

    // console.log(await cc.offset(1, 'txinfo', 'me'))

    console.time('check function')
    console.log(await cc.check(1))
    console.timeEnd('check function')
  } catch (error) {
    console.log(error)
    console.log("🚀 ~ file: example.js ~ line 16 ~ error", error.message)

  }

  // console.log(await cc.offset(1, 'txinfo', 'me'))
})()
