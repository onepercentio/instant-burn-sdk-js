# instant-burn-sdk-js &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/onepercentio/instant-burn-sdk-js/blob/main/LICENSE)

SDK for interacting with on-chain Instant Burn solution. 

Moss's Instant Burn solution was develop to allow micro offset transactions to be registered on chain with (much) lower fees, making them economically viable.
This is done by batching offset transactions on Celo before sending them to ethereum, therefore several offsets can be made with just one transaction.

Single offsets are hashed and added to a hashchain, which in turn is added to each batch before it is closed and sent to ethereum, providing mathematical proof that a given offset was indeed included in a given batch. 

To offset carbon you'll need cMCO2 tokens. cMCO2 tokens are MCO2 that were bridged from ethereum to Celo so 1 cMCO2 = 1 MCO2 = 1 carbon ton.

When you send an offset transaction to the blockchain, the smart contract will collect cMCO2 from you wallet at the amount of carbon ton you're offsetting. For example, if you're offsetting 1Kg of carbon, the smart contract will transfer 0.001 cMCO2 from your wallet. So in order to allow the Carbon Chain smart contract to transfer cMCO2 from your wallet, you first need to ``approve`` at least the amount you intend to offset. Don't worry, the smart contract will only collect cMCO2 from your wallet if you call the offset transaction from your account!



## Installing

Using npm:

```bash
$ npm install carbon-chain
```

Using yarn:

```bash
$ yarn add carbon-chain
```

## Example

### To initialize carbonChain:

```js
const { carbonChain, NETWORKS } = require('carbon-chain');

const privateKey = '0x0000000000000000000000000000000000000'; // private key to your account

const cc = await carbonChain(privateKey, NETWORKS.TESTNET);
```

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

### Approve:

```js
const result = await cc.approve();

console.log(result);
```

Output:

```bash
{
  "blockHash": "0x4b3c67f73c945e4dc2911569956cf27b7ea872ba28b3655ff83ba35075f4826d",
  "blockNumber": 4817720,
  "contractAddress": null,
  "cumulativeGasUsed": 222547,
  "from": "0xe42dd19efacaf0339a5634dcdf563754e7d98743",
  "gasUsed": 25306,
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000004000000000000000000000200000200000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000010000000000000040000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000800002000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000010000",
  "status": true,
  "to": "0xe1aef5200e6a38ea69ad544c479bd1a176c8a510",
  "transactionHash": "0x2c6147c4da17070f57a6805f20dcb480e1e1d05605040dc05528d882e0332f50",
  "transactionIndex": 1,
  "events": {
    "Approval": {
      "address": "0xe1Aef5200e6A38Ea69aD544c479bD1a176C8a510",
      "blockNumber": 4817720,
      "transactionHash": "0x2c6147c4da17070f57a6805f20dcb480e1e1d05605040dc05528d882e0332f50",
      "transactionIndex": 1,
      "blockHash": "0x4b3c67f73c945e4dc2911569956cf27b7ea872ba28b3655ff83ba35075f4826d",
      "logIndex": 2,
      "removed": false,
      "id": "log_e286e7ba",
      "returnValues": {
        "0": "0xE42DD19efaCaF0339A5634Dcdf563754E7d98743",
        "1": "0x16a6182114b625871c4CA873a89fDC7C9f2E5C33",
        "2": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "owner": "0xE42DD19efaCaF0339A5634Dcdf563754E7d98743",
        "spender": "0x16a6182114b625871c4CA873a89fDC7C9f2E5C33",
        "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      },
      "event": "Approval",
      "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
      "raw": {
        "data": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "topics": [
          "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
          "0x000000000000000000000000e42dd19efacaf0339a5634dcdf563754e7d98743",
          "0x00000000000000000000000016a6182114b625871c4ca873a89fdc7c9f2e5c33"
        ]
      }
    }
  }
}
```

### Get Allowance:

```js
const allowance = await cc.getAllowance();

console.log(allowonce);
```

Output:

```bash
115792089237316195423570985008687907853269984665640564039457584007913129639935
```

### Get Offset:

```js
await cc.getOffset(7);
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
const batch = await cc.getBatch(1);

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
