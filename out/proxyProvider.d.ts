import { AxiosRequestConfig } from "axios";
import { IProvider } from "./interface";
import { Transaction, TransactionHash, TransactionStatus } from "./transaction";
import { NetworkConfig } from "./networkConfig";
import { Address } from "./address";
import { AccountOnNetwork } from "./account";
import { Query } from "./smartcontracts/query";
import { QueryResponse } from "./smartcontracts/queryResponse";
import { NetworkStatus } from "./networkStatus";
import { TransactionOnNetwork } from "./transactionOnNetwork";
import BigNumber from "bignumber.js";
/**
 * This will be deprecated once all the endpoints move to ApiProvider
 */
export declare class ProxyProvider implements IProvider {
    private url;
    private config;
    /**
     * Creates a new ProxyProvider.
     * @param url the URL of the Elrond Proxy
     * @param config axios request config options
     */
    constructor(url: string, config?: AxiosRequestConfig);
    /**
     * Fetches the state of an {@link Account}.
     */
    getAccount(address: Address): Promise<AccountOnNetwork>;
    getAddressEsdtList(address: Address): Promise<any>;
    getAddressEsdt(address: Address, tokenIdentifier: string): Promise<any>;
    getAddressNft(address: Address, tokenIdentifier: string, nonce: BigNumber): Promise<any>;
    /**
     * Queries a Smart Contract - runs a pure function defined by the contract and returns its results.
     */
    queryContract(query: Query): Promise<QueryResponse>;
    /**
     * Broadcasts an already-signed {@link Transaction}.
     */
    sendTransaction(tx: Transaction): Promise<TransactionHash>;
    /**
     * Simulates the processing of an already-signed {@link Transaction}.
     */
    simulateTransaction(tx: Transaction): Promise<any>;
    /**
     * Fetches the state of a {@link Transaction}.
     */
    getTransaction(txHash: TransactionHash, hintSender?: Address, withResults?: boolean): Promise<TransactionOnNetwork>;
    /**
     * Queries the status of a {@link Transaction}.
     */
    getTransactionStatus(txHash: TransactionHash): Promise<TransactionStatus>;
    /**
     * Fetches the Network configuration.
     */
    getNetworkConfig(): Promise<NetworkConfig>;
    /**
     * Fetches the network status configuration.
     */
    getNetworkStatus(): Promise<NetworkStatus>;
    /**
     * Get method that receives the resource url and on callback the method used to map the response.
     */
    doGetGeneric(resourceUrl: string, callback: (response: any) => any): Promise<any>;
    /**
     * Post method that receives the resource url, the post payload and on callback the method used to map the response.
     */
    doPostGeneric(resourceUrl: string, payload: any, callback: (response: any) => any): Promise<any>;
    private doGet;
    private doPost;
    private buildUrlWithQueryParameters;
    private handleApiError;
}
