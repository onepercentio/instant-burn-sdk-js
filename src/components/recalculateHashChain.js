const { soliditySha3 } = require('web3-utils')

const recalculateHashChain = (offsets, previousHashChain) =>
  offsets
    .reduce(
      (memo, { returnValues: { offsetHash: hash } }) => (soliditySha3(memo, hash)),
      previousHashChain
    )

module.exports = recalculateHashChain;
