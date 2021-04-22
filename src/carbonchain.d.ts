export = carbonChain;
declare function carbonChain(privateKey: any, network: any): Promise<{
    getBalances: () => Promise<{
        celo: any;
        cUSD: any;
        cMCO2: any;
    }>;
    getAllowance: () => Promise<any>;
    approve: (amount: any) => Promise<any>;
    offset: (amount: any, transactionInfo: any, onBehalfOf: any) => Promise<any>;
    getOffset: (index: any) => Promise<any>;
    getBatch: (index: any) => Promise<any>;
    check: (offsetIndex: number, batchIndex: number) => Promise<boolean>;
}>;