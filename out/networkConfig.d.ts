import BigNumber from "bignumber.js";
import { IProvider } from "./interface";
import { GasPrice, GasLimit, TransactionVersion, ChainID, GasPriceModifier } from "./networkParams";
/**
 * An object holding Network configuration parameters.
 */
export declare class NetworkConfig {
    private static default;
    /**
     * The chain ID. E.g. "1" for the Mainnet.
     */
    ChainID: ChainID;
    /**
     * The gas required by the Network to process a byte of the {@link TransactionPayload}.
     */
    GasPerDataByte: number;
    /**
     * The round duration.
     */
    RoundDuration: number;
    /**
     * The number of rounds per epoch.
     */
    RoundsPerEpoch: number;
    /**
     * The Top Up Factor for APR calculation
     */
    TopUpFactor: number;
    /**
     * The Top Up Factor for APR calculation
     */
    TopUpRewardsGradientPoint: BigNumber;
    /**
     *
     */
    GasPriceModifier: GasPriceModifier;
    /**
     * The minimum gas limit required to be set when broadcasting a {@link Transaction}.
     */
    MinGasLimit: GasLimit;
    /**
     * The minimum gas price required to be set when broadcasting a {@link Transaction}.
     */
    MinGasPrice: GasPrice;
    /**
     * The oldest {@link TransactionVersion} accepted by the Network.
     */
    MinTransactionVersion: TransactionVersion;
    constructor();
    /**
     * Gets the default configuration object (think of the Singleton pattern).
     */
    static getDefault(): NetworkConfig;
    /**
     * Synchronizes a configuration object by querying the Network, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider: IProvider): Promise<void>;
    /**
     * Constructs a configuration object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload: any): NetworkConfig;
}
