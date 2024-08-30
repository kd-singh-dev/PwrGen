type PwrProvider = {
    name: string;
    version: string;
    getConnections: () => Promise<any>;
    connect: () => Promise<any>;
    disconnect: (e: { address: string }) => Promise<string>;
    restablishConnection: () => Promise<any[]>;
    setAutoFeature: (e: any) => Promise<void>;
    areAutomatedTransactionsEnabled: () => Promise<any>;
    removeAutoFeature: (e: any) => Promise<void>;
    transferPwr: (e: { from: string; to: string; amount: number }) => Promise<string>;
    dataTransaction: (e: { from: string; to: string; data: any }) => Promise<string>;
    bytesDataTransaction: (e: { from: string; to: string; data: Uint8Array }) => Promise<string>;
    claimIdVm: (e: { from: string; id: string }) => Promise<string>;
    payableVmDataTransaction: (e: { from: string; to: string; data: any; value: number }) => Promise<string>;
    moveStake: (e: { from: string; to: string; amount: number }) => Promise<string>;
    earlyWithdrawPenalty: (e: { from: string; amount: number }) => Promise<string>;
    feePerByte: (e: { from: string; fee: number }) => Promise<string>;
    maxBlockSize: (e: { from: string; size: number }) => Promise<string>;
    maxTransactionSize: (e: { from: string; size: number }) => Promise<string>;
    overallBurnPercentage: (e: { from: string; percentage: number }) => Promise<string>;
    rewardPerYear: (e: { from: string; reward: number }) => Promise<string>;
    validatorCountLimit: (e: { from: string; limit: number }) => Promise<string>;
    validatorJoiningFee: (e: { from: string; fee: number }) => Promise<string>;
    vmIdClaimingFee: (e: { from: string; fee: number }) => Promise<string>;
    vmOwnerTransactionFeeShare: (e: { from: string; share: number }) => Promise<string>;
    otherProposal: (e: { from: string; proposal: any }) => Promise<string>;
    voteOnProposal: (e: { from: string; proposalId: string; vote: boolean }) => Promise<string>;
    delegate: (e: { from: string; to: string; amount: number }) => Promise<string>;
    withdraw: (e: { from: string; amount: number }) => Promise<string>;
    onConnect: {
        addListener: (callback: (addresses: string[]) => void) => void;
    };
    onDisconnect: {
        addListener: (callback: (address: string) => void) => void;
    };
    onAccountChange: {
        addListener: (callback: (addresses: string[]) => void) => void;
    };
};

export default PwrProvider;
