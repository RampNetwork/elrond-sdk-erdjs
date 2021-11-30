import { AxiosRequestConfig } from "axios";
import { IApiProvider } from "./interface";
import { NetworkStake } from "./networkStake";
import { Stats } from "./stats";
import { TransactionHash } from "./transaction";
import { TransactionOnNetwork } from "./transactionOnNetwork";
import { Token } from "./token";
import { NFTToken } from "./nftToken";
/**
 * This is a temporary change, this will be the only provider used, ProxyProvider will be deprecated
 */
export declare class ApiProvider implements IApiProvider {
    private url;
    private config;
    /**
     * Creates a new ApiProvider.
     * @param url the URL of the Elrond Api
     * @param config axios request config options
     */
    constructor(url: string, config?: AxiosRequestConfig);
    /**
     * Fetches the Network Stake.
     */
    getNetworkStake(): Promise<NetworkStake>;
    /**
     * Fetches the Network Stats.
     */
    getNetworkStats(): Promise<Stats>;
    /**
     * Fetches the state of a {@link Transaction}.
     */
    getTransaction(txHash: TransactionHash): Promise<TransactionOnNetwork>;
    getToken(tokenIdentifier: string): Promise<Token>;
    getNFTToken(tokenIdentifier: string): Promise<NFTToken>;
    /**
     * Get method that receives the resource url and on callback the method used to map the response.
     */
    doGetGeneric(resourceUrl: string, callback: (response: any) => any): Promise<any>;
    private doGet;
    private handleApiError;
}
