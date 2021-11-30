import { IProvider } from "./interface";
/**
 * An object holding network status configuration parameters.
 */
export declare class NetworkStatus {
    private static default;
    /**
     * The current round.
     */
    CurrentRound: number;
    /**
     * The epoch number.
     */
    EpochNumber: number;
    /**
     * The Highest final nonce.
     */
    HighestFinalNonce: number;
    /**
     * The erd nonce.
     */
    Nonce: number;
    /**
     * The nonce at epoch start.
     */
    NonceAtEpochStart: number;
    /**
     * The nonces passed in current epoch.
     */
    NoncesPassedInCurrentEpoch: number;
    /**
     * The round at epoch start
     */
    RoundAtEpochStart: number;
    /**
     * The rounds passed in current epoch
     */
    RoundsPassedInCurrentEpoch: number;
    /**
     * The rounds per epoch
     */
    RoundsPerEpoch: number;
    constructor();
    /**
     * Gets the default network status object (think of the Singleton pattern).
     */
    static getDefault(): NetworkStatus;
    /**
     * Synchronizes a configuration object by querying the node, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider: IProvider): Promise<void>;
    /**
     * Constructs a configuration object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload: any): NetworkStatus;
}
