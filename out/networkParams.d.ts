import { TransactionPayload } from "./transactionPayload";
/**
 * The gas price, as an immutable object.
 */
export declare class GasPrice {
    /**
     * The actual numeric value.
     */
    private readonly value;
    /**
     * Creates a GasPrice object given a value.
     */
    constructor(value: number);
    toDenominated(): string;
    /**
     * Creates a GasPrice object using the minimum value.
     */
    static min(): GasPrice;
    valueOf(): number;
}
/**
 * The gas limit, as an immutable object.
 */
export declare class GasLimit {
    /**
     * The actual numeric value.
     */
    private readonly value;
    /**
     * Creates a GasLimit object given a value.
     */
    constructor(value: number);
    /**
     * Creates a GasLimit object for a value-transfer {@link Transaction}.
     */
    static forTransfer(data: TransactionPayload): GasLimit;
    /**
     * Creates a GasLimit object using the minimum value.
     */
    static min(): GasLimit;
    valueOf(): number;
}
export declare class ChainID {
    /**
     * The actual value, as a string.
     */
    private readonly value;
    /**
     * Creates a ChainID object given a value.
     */
    constructor(value: string);
    valueOf(): string;
}
export declare class TransactionVersion {
    /**
     * The actual numeric value.
     */
    private readonly value;
    /**
     * Creates a TransactionVersion object given a value.
     */
    constructor(value: number);
    /**
     * Creates a TransactionVersion object with the default version setting
     */
    static withDefaultVersion(): TransactionVersion;
    /**
     * Creates a TransactionVersion object with the VERSION setting for hash signing
     */
    static withTxHashSignVersion(): TransactionVersion;
    valueOf(): number;
}
export declare class TransactionOptions {
    /**
     * The actual numeric value.
     */
    private readonly value;
    /**
     * Creates a TransactionOptions object given a value.
     */
    constructor(value: number);
    /**
     * Creates a TransactionOptions object with the default options setting
     */
    static withDefaultOptions(): TransactionOptions;
    /**
     * Created a TransactionsOptions object with the setting for hash signing
     */
    static withTxHashSignOptions(): TransactionOptions;
    valueOf(): number;
}
export declare class GasPriceModifier {
    /**
     * The actual numeric value.
     */
    private readonly value;
    /**
     * Creates a GasPriceModifier object given a value.
     */
    constructor(value: number);
    valueOf(): number;
}
