/**
 * @typedef {import('@celo/contractkit').ContractKit} Kit
 * @typedef {import('web3-utils/types').AbiItem} AbiItem
 * @typedef {import('./node_modules/web3-eth-contract/types').Contract} Contract
 */

/**
 * 
 * @param {Kit} kit 
 * @returns {function(AbiItem | AbiItem[], string): Contract}
 */
const instanceContract = kit => (abiItem, address) => new kit.web3.eth.Contract(abiItem, address);

module.exports = instanceContract;
