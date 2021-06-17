# instant-burn-sdk-js &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/onepercentio/instant-burn-sdk-js/blob/main/LICENSE)

SDK for interacting with on-chain Instant Burn solution. 

## Installing

Using npm:

```bash
$ npm install carbon-chain
```

Using yarn:

```bash
$ yarn add carbon-chain
```

## Context

Moss's Instant Burn solution was developed to allow micro offset transactions to be registered on chain with (much) lower fees, making them economically viable. This is done by batching offset transactions on Celo before sending them to ethereum, therefore several offsets can be made with just one transaction.

Single offsets are hashed and added to a hashchain, which in turn is added to each batch before it is closed and sent to ethereum, providing mathematical proof that a given offset was indeed included in a given batch. 

To offset carbon you'll need cMCO2 tokens. cMCO2 tokens are MCO2 that were bridged from ethereum to Celo so 1 cMCO2 = 1 MCO2 = 1 carbon ton.

When you send an offset transaction to the blockchain, the smart contract will collect cMCO2 from you wallet at the amount of carbon ton you're offsetting. For example, if you're offsetting 1Kg of carbon, the smart contract will transfer 0.001 cMCO2 from your wallet. So in order to allow the Carbon Chain smart contract to transfer cMCO2 from your wallet, you first need to ``approve`` at least the amount you intend to offset. Don't worry, the smart contract will only collect cMCO2 from your wallet if you call the offset transaction from your account!


## Example

### Initialize carbonChain SDK:

```js
const { carbonChain, NETWORKS } = require('carbon-chain');

const privateKey = '0x0000000000000000000000000000000000000'; // private key to your account

const cc = await carbonChain(privateKey, NETWORKS.TESTNET);
```

### Approve:

```js
await cc.approve(); // default: approves the MAX_UINT amount to carbon chain smart contract
// or
await cc.approve('1000000000000000'); // approves only 0.001 cMCO2
```

You can freely choose the amount to approve, just be sure you have approved enough tokens for your offset transactions.

Please notice all amounts are in ``wei``.

You can check current allowance with:

### Get Allowance:

```js
const allowance = await cc.getAllowance();

console.log(allowance);
```

Output:

```bash
115792089237316195423570985008687907853269984665640564039457584007913129639935
```

Also, in order to send transactions on Celo, you'll need to top up your account with celo. To check your account balance, use:

### Get Balances:

```js
const balances = await cc.getBalances();

console.log(balances);
```

Output

```bash
{
  celo: '420521951500000000',
  cUSD: '10000000000000000000',
  cMCO2: '9197119809999999994'
}

```

To offset, just call ``offset(string: amount, string: info, string: onBehalfOf)``:

### Offset:

```js
const receipt = await cc.offset('1000000000000000', 'myOffsetId', 'Chuck Norris');

console.log(receipt);
```

Output

```bash
{
  address: '0xF4Db08607786253BCE3cc55Ad504E34335655337',
  blockNumber: 5721162,
  transactionHash: '0xe69527fdc3a2f8e924ca2011f15469985e94ef73355c650e90f99b95132fb31c',
  transactionIndex: 2,
  blockHash: '0x125a78b699cbb74f5001de8a05407ee89a65d9de386b8f46693e1ab6f0b3132e',
  logIndex: 6,
  removed: false,
  id: 'log_5e9a3497',
  returnValues: Result {
    '0': '1',
    '1': 'txinfo',
    '2': 'me',
    '3': '0xE42DD19efaCaF0339A5634Dcdf563754E7d98743',
    '4': '0x62ec252201017b52960ca962a65f02b552f0049c17f39fe7ce10e0c17cc6744f',
    '5': '10007',
    '6': '5',
    carbonTon: '1',
    transactionInfo: 'txinfo',
    onBehalfOf: 'me',
    sender: '0xE42DD19efaCaF0339A5634Dcdf563754E7d98743',
    offsetHash: '0x62ec252201017b52960ca962a65f02b552f0049c17f39fe7ce10e0c17cc6744f',
    transactionIndex: '10007',
    batchIndex: '5'
  },
  event: 'CarbonOffset',
  signature: '0x3668d6e993c027eb1eef040fc4c9bc6fb4ec209d1c6e95061e085d5f4b09f750',
  raw: {
    data: '0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000e42dd19efacaf0339a5634dcdf563754e7d9874362ec252201017b52960ca962a65f02b552f0049c17f39fe7ce10e0c17cc6744f00000000000000000000000000000000000000000000000000000000000000067478696e666f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026d65000000000000000000000000000000000000000000000000000000000000',
    topics: [
      '0x3668d6e993c027eb1eef040fc4c9bc6fb4ec209d1c6e95061e085d5f4b09f750',
      '0x0000000000000000000000000000000000000000000000000000000000002717',
      '0x0000000000000000000000000000000000000000000000000000000000000005'
    ]
  }
}

```

The output is the transaction receipt. If you want to check this offset transaction later, please save the transactionIndex in `returnedValues`.

### Get Offset:

```js
await cc.getOffset('10007');
```

Output:

```bash
{
  carbonTon: '1',
  transactionInfo: 'txinfo',
  onBehalfOf: 'me',
  sender: '0xE42DD19efaCaF0339A5634Dcdf563754E7d98743',
  offsetHash: '0xc3b2da0d316475340e8fbc6b21074daa40539d34f67de9c3a97dedc10de302ee',
  batchNumber: '2'
}
```

### Get Batch:

```js
const batch = await cc.getBatch('5');

console.log(batch);
```

Output:

```bash
{
  totalCarbonOffset: '4000000000000000001',
  hashChain: '0x7ae42fc02fe70282661b6587cd6a3642f7101e23ae79bae5067e96e0fee86ed7',
  timestamp: '1618498797'
}
```

Batches are only available after they're closed, which can happen by reaching the maximum amount of transaction in each batch (currently at 8000 txs) or a maximum amount of time between each batch (currently at 24h). These values are still being tweaked and can be changed to achieve better optimization.

Finally, to check whether a transaction was included in a batch, you can call the check method passing the transaction index. This method will recalculate the hashchain of the batch using the previous batch hashchain and all transactions in the batch, including the one you're checking. If you get a `true` boolean (and of course you will), this means we've got a mathematical proof that the transaction is in the batch.

### Check:

```js
const isChecked = await cc.check(3);

console.log(isChecked);
```

Output:

```bash
true
```

## License

[MIT](LICENSE)
