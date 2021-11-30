import { Address } from "./address";
import { Balance } from "./balance";
import { GasPrice, GasLimit } from "./networkParams";
import { Nonce } from "./nonce";
import { Signature } from "./signature";
import { TransactionPayload } from "./transactionPayload";
import { Hash } from "./hash";
import { TransactionHash, TransactionStatus } from "./transaction";
import { SmartContractResults } from "./smartcontracts/smartContractResults";
/**
 * A plain view of a transaction, as queried from the Network.
 */
export declare class TransactionOnNetwork {
    type: TransactionOnNetworkType;
    nonce: Nonce;
    round: number;
    epoch: number;
    value: Balance;
    receiver: Address;
    sender: Address;
    gasPrice: GasPrice;
    gasLimit: GasLimit;
    data: TransactionPayload;
    signature: Signature;
    status: TransactionStatus;
    hyperblockNonce: Nonce;
    hyperblockHash: Hash;
    private receipt;
    private smartContractResults;
    constructor(init?: Partial<TransactionOnNetwork>);
    static fromHttpResponse(response: {
        type: string;
        nonce: number;
        round: number;
        epoch: number;
        value: string;
        sender: string;
        receiver: string;
        gasPrice: number;
        gasLimit: number;
        data: string;
        status: string;
        hyperblockNonce: number;
        hyperblockHash: string;
        receipt: any;
        smartContractResults: any[];
    }): TransactionOnNetwork;
    getReceipt(): Receipt;
    getSmartContractResults(): SmartContractResults;
}
/**
 * Not yet implemented.
 */
export declare class TransactionOnNetworkType {
    readonly value: string;
    constructor(value?: string);
}
export declare class Receipt {
    value: Balance;
    sender: Address;
    message: string;
    hash: TransactionHash;
    static fromHttpResponse(response: {
        value: string;
        sender: string;
        data: string;
        txHash: string;
    }): Receipt;
}
