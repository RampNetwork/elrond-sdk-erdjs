import { Address, NetworkConfig, Query, QueryResponse, SmartContractResults, Transaction } from "../..";
/**
 * Provides a simple interface in order to easily call or query the smart contract's methods.
 */
export declare class ContractLogger {
    synchronizedNetworkConfig(networkConfig: NetworkConfig): void;
    transactionCreated(transaction: Transaction): void;
    deployComplete(transaction: Transaction, smartContractResults: SmartContractResults, smartContractAddress: Address): void;
    transactionSent(_transaction: Transaction): void;
    transactionComplete(_result: any, _resultData: string, transaction: Transaction, smartContractResults: SmartContractResults): void;
    queryCreated(_query: Query): void;
    queryComplete(_result: any, _response: QueryResponse): void;
}
