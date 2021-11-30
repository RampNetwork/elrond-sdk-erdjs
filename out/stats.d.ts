import { IApiProvider } from "./interface";
/**
 * An object holding Network stats parameters.
 */
export declare class Stats {
    private static default;
    /**
     * The number of Shards.
     */
    Shards: number;
    /**
     * The Number of Blocks.
     */
    Blocks: number;
    /**
     * The Number of Accounts.
     */
    Accounts: number;
    /**
     * The Number of transactions.
     */
    Transactions: number;
    /**
     * The Refresh rate.
     */
    RefreshRate: number;
    /**
     * The Number of the current Epoch.
     */
    Epoch: number;
    /**
     * The Number of rounds passed.
     */
    RoundsPassed: number;
    /**
     * The Number of Rounds per epoch.
     */
    RoundsPerEpoch: number;
    constructor();
    /**
     * Synchronizes a stats object by querying the Network, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider: IApiProvider): Promise<void>;
    /**
     * Constructs a stats object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload: any): Stats;
}
