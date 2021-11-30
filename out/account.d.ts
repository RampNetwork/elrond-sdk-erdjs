import { IProvider } from "./interface";
import { Address } from "./address";
import { Nonce } from "./nonce";
import { Balance } from "./balance";
/**
 * An abstraction representing an account (user or Smart Contract) on the Network.
 */
export declare class Account {
    /**
     * The address of the account.
     */
    readonly address: Address;
    /**
     * The nonce of the account (the account sequence number).
     */
    nonce: Nonce;
    /**
     * The balance of the account.
     */
    balance: Balance;
    private asOnNetwork;
    /**
     * Creates an account object from an address
     */
    constructor(address: Address);
    /**
     * Queries the details of the account on the Network
     * @param provider the Network provider
     * @param cacheLocally whether to save the query response within the object, locally
     */
    getAsOnNetwork(provider: IProvider, cacheLocally?: boolean): Promise<AccountOnNetwork>;
    /**
     * Gets a previously saved query response
     */
    getAsOnNetworkCached(): AccountOnNetwork;
    /**
     * Synchronizes account properties (such as nonce, balance) with the ones queried from the Network
     * @param provider the Network provider
     */
    sync(provider: IProvider): Promise<void>;
    /**
     * Increments (locally) the nonce (the account sequence number).
     */
    incrementNonce(): void;
    /**
     * Gets then increments (locally) the nonce (the account sequence number).
     */
    getNonceThenIncrement(): Nonce;
    /**
     * Converts the account to a pretty, plain JavaScript object.
     */
    toJSON(): any;
}
/**
 * A plain view of an account, as queried from the Network.
 */
export declare class AccountOnNetwork {
    address: Address;
    nonce: Nonce;
    balance: Balance;
    code: string;
    userName: string;
    constructor(init?: Partial<AccountOnNetwork>);
    static fromHttpResponse(payload: any): AccountOnNetwork;
}
