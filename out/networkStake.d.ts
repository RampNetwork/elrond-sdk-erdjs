import { IApiProvider } from "./interface";
import BigNumber from "bignumber.js";
/**
 * An object holding Network stake parameters.
 */
export declare class NetworkStake {
    private static default;
    /**
     * The Total Validators Number.
     */
    TotalValidators: number;
    /**
     * The Active Validators Number.
     */
    ActiveValidators: number;
    /**
     * The Queue Size.
     */
    QueueSize: number;
    /**
     * The Total Validators Number.
     */
    TotalStaked: BigNumber;
    constructor();
    /**
     * Gets the default configuration object (think of the Singleton pattern).
     */
    static getDefault(): NetworkStake;
    /**
     * Synchronizes a configuration object by querying the Network, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider: IApiProvider): Promise<void>;
    /**
     * Constructs a configuration object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload: any): NetworkStake;
}
