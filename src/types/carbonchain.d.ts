import { ContractKit } from "@celo/contractkit"

export type Network = 'TESTNET' | 'MAINNET'

export type Approve = {
  blockHash: string;
  blockNumber: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: boolean;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  events: {
    Approval: {
      address: string;
      blockNumber: number;
      transactionHash: string;
      transactionIndex: number;
      blockHash: string;
      logIndex: number;
      removed: boolean;
      id: string;
      returnValues: {
        [k: string]: unknown;
        owner: string;
        spender: string;
        value: string;
      },
      event: string;
      signature: string;
      raw: {
        data: string;
        topics: string[];
      }
    }
  }
}

export type CreatedOffset = {
  address: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
  id: string;
  returnValues: {
    [k: string]: unknown;
    carbonTon: string;
    transactionInfo: string;
    onBehalfOf: string;
    sender: string;
    offsetHash: string;
    transactionIndex: string;
    batchIndex: string;
  },
  event: string;
  signature: string;
  raw: {
    data: string;
    topics: string[]
  }
}

export type Batch = {
  totalCarbonOffset: string;
  hashChain: string;
  timestamp: string;
}

export type Offset = {
  carbonTon: string;
  transactionInfo: string;
  onBehalfOf: string;
  sender: string;
  offsetHash: string;
  batchNumber: string;
}

export type Balance = {
  celo: string;
  cUSD: string;
  cMCO2: string;
}

export interface InstantBurnMethods {
  getBalances: () => Promise<Balance>;
  getAllowance: () => Promise<string>;
  approve: (amount: any) => Promise<Approve>;
  offset: (amount: number, transactionInfo: string, onBehalfOf: string) => Promise<any>;
  getOffset: (index: number) => Promise<Offset>;
  getBatch: (index: number) => Promise<Batch>;
  check: (offsetIndex: number) => Promise<boolean>;
}

export type instantBurn = (
  kit: ContractKit,
  cMCO2Instance: unknown,
  carbonChainInstance: unknown
) => InstantBurnMethods;

export type carbonChain = (privateKey: string, network: Network) => Promise<instantBurn>;
