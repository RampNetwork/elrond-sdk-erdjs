/**
 * The base class for `erdjs` exceptions (errors).
 */
import BigNumber from "bignumber.js";
export declare class Err extends Error {
    inner: Error | undefined;
    constructor(message: string, inner?: Error);
    /**
     * Returns a pretty, friendly summary for the error or for the chain of errros (if appropriate).
     */
    summary(): any[];
    /**
     * Returns a HTML-friendly summary for the error or for the chain of errros (if appropriate).
     */
    html(): string;
    /**
     * Returns a HTML-friendly summary for the error or for the chain of errros (if appropriate).
     */
    static html(error: Error): string;
}
/**
 * Signals invalid arguments for a function, for an operation.
 */
export declare class ErrInvalidArgument extends Err {
    constructor(name: string, value?: any, reason?: string, inner?: Error);
    static getMessage(name: string, value?: any, reason?: string): string;
}
/**
 * Signals an unsupported operation.
 */
export declare class ErrUnsupportedOperation extends Err {
    constructor(operation: string, reason?: string);
}
/**
 * Signals the provisioning of objects of unexpected (bad) types.
 */
export declare class ErrBadType extends Err {
    constructor(name: string, type: any, value?: any);
}
/**
 * Signals that an invariant failed.
 */
export declare class ErrInvariantFailed extends Err {
    constructor(message: string);
}
/**
 * Signals issues with {@link Address} instantiation.
 */
export declare class ErrAddressCannotCreate extends Err {
    constructor(input: any, inner?: Error);
}
/**
 * Signals issues with the HRP of an {@link Address}.
 */
export declare class ErrAddressBadHrp extends Err {
    constructor(expected: string, got: string);
}
/**
 * Signals the presence of an empty / invalid address.
 */
export declare class ErrAddressEmpty extends Err {
    constructor();
}
/**
 * Signals an error related to signing a message (a transaction).
 */
export declare class ErrSignerCannotSign extends Err {
    constructor(inner: Error);
}
/**
 * Signals an invalid value for {@link Balance} objects.
 */
export declare class ErrBalanceInvalid extends Err {
    constructor(value: BigNumber);
}
/**
 * Signals an invalid value for {@link GasPrice} objects.
 */
export declare class ErrGasPriceInvalid extends Err {
    constructor(value: number);
}
/**
 * Signals an invalid value for {@link GasLimit} objects.
 */
export declare class ErrGasLimitInvalid extends Err {
    constructor(value: number);
}
/**
 * Signals an invalid value for {@link GasLimit} objects.
 */
export declare class ErrNotEnoughGas extends Err {
    constructor(value: number);
}
/**
 * Signals an invalid value for {@link Nonce} objects.
 */
export declare class ErrNonceInvalid extends Err {
    constructor(value: number);
}
/**
 * Signals an invalid value for {@link ChainID} objects.
 */
export declare class ErrChainIDInvalid extends Err {
    constructor(value: string);
}
/**
 * Signals an invalid value for {@link TransactionVersion} objects.
 */
export declare class ErrTransactionVersionInvalid extends Err {
    constructor(value: number);
}
/**
 * Signals an invalid value for {@link TransactionOptions} objects.
 */
export declare class ErrTransactionOptionsInvalid extends Err {
    constructor(value: number);
}
/**
 * Signals an invalid value for {@link GasPriceModifier} objects.
 */
export declare class ErrGasPriceModifierInvalid extends Err {
    constructor(value: number);
}
/**
 * Signals that the hash of the {@link Transaction} is not known (not set).
 */
export declare class ErrTransactionHashUnknown extends Err {
    constructor();
}
/**
 * Signals that a {@link Transaction} cannot be used within an operation, since it isn't signed.
 */
export declare class ErrTransactionNotSigned extends Err {
    constructor();
}
/**
 * Signals an error related to signing a message (a transaction).
 */
export declare class ErrSignatureCannotCreate extends Err {
    constructor(input: any, inner?: Error);
}
/**
 * Signals the usage of an empty signature.
 */
export declare class ErrSignatureEmpty extends Err {
    constructor();
}
/**
 * Signals an invalid value for the name of a {@link ContractFunction}.
 */
export declare class ErrInvalidFunctionName extends Err {
    constructor();
}
/**
 * Signals an error that happened during a HTTP GET request.
 */
export declare class ErrApiProviderGet extends Err {
    constructor(url: string, error: string, inner?: Error);
}
/**
 * Signals an error that happened during a HTTP POST request.
 */
export declare class ErrApiProviderPost extends Err {
    readonly originalErrorMessage: string;
    constructor(url: string, error: string, inner?: Error);
}
/**
 * Signals a failed operation, since the Timer is already running.
 */
export declare class ErrAsyncTimerAlreadyRunning extends Err {
    constructor();
}
/**
 * Signals a failed operation, since the Timer has been aborted.
 */
export declare class ErrAsyncTimerAborted extends Err {
    constructor();
}
/**
 * Signals a timout for a {@link TransactionWatcher}.
 */
export declare class ErrTransactionWatcherTimeout extends Err {
    constructor();
}
/**
 * Signals an issue related to waiting for a specific {@link TransactionStatus}.
 */
export declare class ErrExpectedTransactionStatusNotReached extends Err {
    constructor();
}
/**
 * Signals a generic error in the context of Smart Contracts.
 */
export declare class ErrContract extends Err {
    constructor(message: string);
}
/**
 * Signals a generic error in the context of querying Smart Contracts.
 */
export declare class ErrContractQuery extends Err {
    constructor(message: string);
    static increaseSpecificity(err: Err): Err;
}
/**
 * Signals an error thrown by the mock-like test objects.
 */
export declare class ErrMock extends Err {
    constructor(message: string);
}
/**
 * Signals an error thrown when setting up a test.
 */
export declare class ErrTest extends Err {
    constructor(message: string);
}
/**
 * Signals a generic serialization error.
 */
export declare class ErrSerialization extends Err {
    constructor(message: string);
}
/**
 * Signals a generic type error.
 */
export declare class ErrTypingSystem extends Err {
    constructor(message: string);
}
/**
 * Signals a generic struct typing error.
 */
export declare class ErrStructTyping extends Err {
    constructor(reason: string);
}
/**
 * Signals a generic codec (encode / decode) error.
 */
export declare class ErrCodec extends Err {
    constructor(message: string);
}
/**
 * Signals a generic wallet error.
 */
export declare class ErrWallet extends Err {
    constructor(message: string);
}
/**
 * Signals a wrong mnemonic format.
 */
export declare class ErrWrongMnemonic extends ErrWallet {
    constructor();
}
/**
 * Signals a generic contract interaction error.
 */
export declare class ErrContractInteraction extends Err {
    constructor(message: string);
}
/**
 * Signals a bad PEM file.
 */
export declare class ErrBadPEM extends ErrWallet {
    constructor(message?: string);
}
/**
 * Signals an invalid smart contract call data field
 */
export declare class ErrInvalidScCallDataField extends Err {
    constructor(message?: string);
}
/**
 * Signals an invalid ESDT transfer data field
 */
export declare class ErrInvalidEsdtTransferDataField extends Err {
    constructor();
}
/**
 * Signals that a method is not yet implemented
 */
export declare class ErrNotImplemented extends Err {
    constructor();
}
/**
 * Signals that the data inside the url is not a valid one for a transaction sign response
 */
export declare class ErrInvalidTxSignReturnValue extends Err {
    constructor();
}
