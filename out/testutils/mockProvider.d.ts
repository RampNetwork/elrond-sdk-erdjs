import { IProvider } from "../interface";
import { Transaction, TransactionHash, TransactionStatus } from "../transaction";
import { TransactionOnNetwork } from "../transactionOnNetwork";
import { NetworkConfig } from "../networkConfig";
import { Address } from "../address";
import { AccountOnNetwork } from "../account";
import { Balance } from "../balance";
import { Query } from "../smartcontracts/query";
import { QueryResponse } from "../smartcontracts/queryResponse";
import { NetworkStatus } from "../networkStatus";
import { BalanceBuilder } from "../balanceBuilder";
import BigNumber from "bignumber.js";
/**
 * A mock {@link IProvider}, used for tests only.
 */
export declare class MockProvider implements IProvider {
    static AddressOfAlice: Address;
    static AddressOfBob: Address;
    static AddressOfCarol: Address;
    private readonly transactions;
    private readonly onTransactionSent;
    private readonly accounts;
    private readonly queryResponders;
    constructor();
    getAccountEsdtBalance(_address: Address, _tokenBalanceBuilder: BalanceBuilder): Promise<Balance>;
    doPostGeneric(_resourceUrl: string, _payload: any, _callback: (response: any) => any): Promise<any>;
    doGetGeneric(_resourceUrl: string, _callback: (response: any) => any): Promise<any>;
    mockUpdateAccount(address: Address, mutate: (item: AccountOnNetwork) => void): void;
    mockUpdateTransaction(hash: TransactionHash, mutate: (item: TransactionOnNetwork) => void): void;
    mockPutTransaction(hash: TransactionHash, item: TransactionOnNetwork): void;
    mockQueryResponseOnFunction(functionName: string, response: QueryResponse): void;
    mockQueryResponse(predicate: (query: Query) => boolean, response: QueryResponse): void;
    mockTransactionTimeline(transaction: Transaction, timelinePoints: any[]): Promise<void>;
    mockNextTransactionTimeline(timelinePoints: any[]): Promise<void>;
    nextTransactionSent(): Promise<Transaction>;
    mockTransactionTimelineByHash(hash: TransactionHash, timelinePoints: any[]): Promise<void>;
    getAccount(address: Address): Promise<AccountOnNetwork>;
    getAddressEsdt(_address: Address, _tokenIdentifier: string): Promise<any>;
    getAddressEsdtList(_address: Address): Promise<any>;
    getAddressNft(_address: Address, _tokenIdentifier: string, _nonce: BigNumber): Promise<any>;
    sendTransaction(transaction: Transaction): Promise<TransactionHash>;
    simulateTransaction(_transaction: Transaction): Promise<any>;
    getTransaction(txHash: TransactionHash, _hintSender?: Address, _withResults?: boolean): Promise<TransactionOnNetwork>;
    getTransactionStatus(txHash: TransactionHash): Promise<TransactionStatus>;
    getNetworkConfig(): Promise<NetworkConfig>;
    getNetworkStatus(): Promise<NetworkStatus>;
    queryContract(query: Query): Promise<QueryResponse>;
}
export declare class Wait {
    readonly milliseconds: number;
    constructor(milliseconds: number);
}
export declare class MarkNotarized {
}
export declare class AddImmediateResult {
    readonly data: string;
    constructor(data: string);
}
