"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrInvalidTxSignReturnValue = exports.ErrNotImplemented = exports.ErrInvalidEsdtTransferDataField = exports.ErrInvalidScCallDataField = exports.ErrBadPEM = exports.ErrContractInteraction = exports.ErrWrongMnemonic = exports.ErrWallet = exports.ErrCodec = exports.ErrStructTyping = exports.ErrTypingSystem = exports.ErrSerialization = exports.ErrTest = exports.ErrMock = exports.ErrContractQuery = exports.ErrContract = exports.ErrExpectedTransactionStatusNotReached = exports.ErrTransactionWatcherTimeout = exports.ErrAsyncTimerAborted = exports.ErrAsyncTimerAlreadyRunning = exports.ErrApiProviderPost = exports.ErrApiProviderGet = exports.ErrInvalidFunctionName = exports.ErrSignatureEmpty = exports.ErrSignatureCannotCreate = exports.ErrTransactionNotSigned = exports.ErrTransactionHashUnknown = exports.ErrGasPriceModifierInvalid = exports.ErrTransactionOptionsInvalid = exports.ErrTransactionVersionInvalid = exports.ErrChainIDInvalid = exports.ErrNonceInvalid = exports.ErrNotEnoughGas = exports.ErrGasLimitInvalid = exports.ErrGasPriceInvalid = exports.ErrBalanceInvalid = exports.ErrSignerCannotSign = exports.ErrAddressEmpty = exports.ErrAddressBadHrp = exports.ErrAddressCannotCreate = exports.ErrInvariantFailed = exports.ErrBadType = exports.ErrUnsupportedOperation = exports.ErrInvalidArgument = exports.Err = void 0;
class Err extends Error {
    constructor(message, inner) {
        super(message);
        this.inner = undefined;
        this.inner = inner;
    }
    /**
     * Returns a pretty, friendly summary for the error or for the chain of errros (if appropriate).
     */
    summary() {
        let result = [];
        result.push({ name: this.name, message: this.message });
        let inner = this.inner;
        while (inner) {
            result.push({ name: inner.name, message: inner.message });
            inner = inner.inner;
        }
        return result;
    }
    /**
     * Returns a HTML-friendly summary for the error or for the chain of errros (if appropriate).
     */
    html() {
        let summary = this.summary();
        let error = summary[0];
        let causedBy = summary.slice(1);
        let html = `
            An error of type <strong>${error.name}</strong> occurred: ${error.message}.
        `;
        causedBy.forEach((cause) => {
            html += `<br /> ... <strong>${cause.name}</strong>: ${cause.message}`;
        });
        return html;
    }
    /**
     * Returns a HTML-friendly summary for the error or for the chain of errros (if appropriate).
     */
    static html(error) {
        if (error instanceof Err) {
            return error.html();
        }
        else {
            return `Unexpected error of type <strong>${error.name}</strong> occurred: ${error.message}.`;
        }
    }
}
exports.Err = Err;
/**
 * Signals invalid arguments for a function, for an operation.
 */
class ErrInvalidArgument extends Err {
    constructor(name, value, reason = "not specified", inner) {
        super(ErrInvalidArgument.getMessage(name, value, reason), inner);
    }
    static getMessage(name, value, reason) {
        if (value) {
            return `Invalid argument "${name}": ${value}. Reason: ${reason}`;
        }
        return `Invalid argument "${name}"`;
    }
}
exports.ErrInvalidArgument = ErrInvalidArgument;
/**
 * Signals an unsupported operation.
 */
class ErrUnsupportedOperation extends Err {
    constructor(operation, reason = "not specified") {
        super(`Operation "${operation}" not supported. Reason: ${reason}`);
    }
}
exports.ErrUnsupportedOperation = ErrUnsupportedOperation;
/**
 * Signals the provisioning of objects of unexpected (bad) types.
 */
class ErrBadType extends Err {
    constructor(name, type, value) {
        super(`Bad type of "${name}": ${value}. Expected type: ${type}`);
    }
}
exports.ErrBadType = ErrBadType;
/**
 * Signals that an invariant failed.
 */
class ErrInvariantFailed extends Err {
    constructor(message) {
        super(`"Invariant failed: ${message}`);
    }
}
exports.ErrInvariantFailed = ErrInvariantFailed;
/**
 * Signals issues with {@link Address} instantiation.
 */
class ErrAddressCannotCreate extends Err {
    constructor(input, inner) {
        let message = `Cannot create address from: ${input}`;
        super(message, inner);
    }
}
exports.ErrAddressCannotCreate = ErrAddressCannotCreate;
/**
 * Signals issues with the HRP of an {@link Address}.
 */
class ErrAddressBadHrp extends Err {
    constructor(expected, got) {
        super(`Wrong address HRP. Expected: ${expected}, got ${got}`);
    }
}
exports.ErrAddressBadHrp = ErrAddressBadHrp;
/**
 * Signals the presence of an empty / invalid address.
 */
class ErrAddressEmpty extends Err {
    constructor() {
        super(`Address is empty`);
    }
}
exports.ErrAddressEmpty = ErrAddressEmpty;
/**
 * Signals an error related to signing a message (a transaction).
 */
class ErrSignerCannotSign extends Err {
    constructor(inner) {
        super(`Cannot sign`, inner);
    }
}
exports.ErrSignerCannotSign = ErrSignerCannotSign;
/**
 * Signals an invalid value for {@link Balance} objects.
 */
class ErrBalanceInvalid extends Err {
    constructor(value) {
        super(`Invalid balance: ${value.toString()}`);
    }
}
exports.ErrBalanceInvalid = ErrBalanceInvalid;
/**
 * Signals an invalid value for {@link GasPrice} objects.
 */
class ErrGasPriceInvalid extends Err {
    constructor(value) {
        super(`Invalid gas price: ${value}`);
    }
}
exports.ErrGasPriceInvalid = ErrGasPriceInvalid;
/**
 * Signals an invalid value for {@link GasLimit} objects.
 */
class ErrGasLimitInvalid extends Err {
    constructor(value) {
        super(`Invalid gas limit: ${value}`);
    }
}
exports.ErrGasLimitInvalid = ErrGasLimitInvalid;
/**
 * Signals an invalid value for {@link GasLimit} objects.
 */
class ErrNotEnoughGas extends Err {
    constructor(value) {
        super(`Not enough gas provided: ${value}`);
    }
}
exports.ErrNotEnoughGas = ErrNotEnoughGas;
/**
 * Signals an invalid value for {@link Nonce} objects.
 */
class ErrNonceInvalid extends Err {
    constructor(value) {
        super(`Invalid nonce: ${value}`);
    }
}
exports.ErrNonceInvalid = ErrNonceInvalid;
/**
 * Signals an invalid value for {@link ChainID} objects.
 */
class ErrChainIDInvalid extends Err {
    constructor(value) {
        super(`Invalid chain ID: ${value}`);
    }
}
exports.ErrChainIDInvalid = ErrChainIDInvalid;
/**
 * Signals an invalid value for {@link TransactionVersion} objects.
 */
class ErrTransactionVersionInvalid extends Err {
    constructor(value) {
        super(`Invalid transaction version: ${value}`);
    }
}
exports.ErrTransactionVersionInvalid = ErrTransactionVersionInvalid;
/**
 * Signals an invalid value for {@link TransactionOptions} objects.
 */
class ErrTransactionOptionsInvalid extends Err {
    constructor(value) {
        super(`Invalid transaction options: ${value}`);
    }
}
exports.ErrTransactionOptionsInvalid = ErrTransactionOptionsInvalid;
/**
 * Signals an invalid value for {@link GasPriceModifier} objects.
 */
class ErrGasPriceModifierInvalid extends Err {
    constructor(value) {
        super(`Invalid gas price modifier: ${value}`);
    }
}
exports.ErrGasPriceModifierInvalid = ErrGasPriceModifierInvalid;
/**
 * Signals that the hash of the {@link Transaction} is not known (not set).
 */
class ErrTransactionHashUnknown extends Err {
    constructor() {
        super(`Transaction hash isn't known`);
    }
}
exports.ErrTransactionHashUnknown = ErrTransactionHashUnknown;
/**
 * Signals that a {@link Transaction} cannot be used within an operation, since it isn't signed.
 */
class ErrTransactionNotSigned extends Err {
    constructor() {
        super(`Transaction isn't signed`);
    }
}
exports.ErrTransactionNotSigned = ErrTransactionNotSigned;
/**
 * Signals an error related to signing a message (a transaction).
 */
class ErrSignatureCannotCreate extends Err {
    constructor(input, inner) {
        let message = `Cannot create signature from: ${input}`;
        super(message, inner);
    }
}
exports.ErrSignatureCannotCreate = ErrSignatureCannotCreate;
/**
 * Signals the usage of an empty signature.
 */
class ErrSignatureEmpty extends Err {
    constructor() {
        super(`Signature is empty`);
    }
}
exports.ErrSignatureEmpty = ErrSignatureEmpty;
/**
 * Signals an invalid value for the name of a {@link ContractFunction}.
 */
class ErrInvalidFunctionName extends Err {
    constructor() {
        super(`Invalid function name`);
    }
}
exports.ErrInvalidFunctionName = ErrInvalidFunctionName;
/**
 * Signals an error that happened during a HTTP GET request.
 */
class ErrApiProviderGet extends Err {
    constructor(url, error, inner) {
        let message = `Cannot GET ${url}: [${error}]`;
        super(message, inner);
    }
}
exports.ErrApiProviderGet = ErrApiProviderGet;
/**
 * Signals an error that happened during a HTTP POST request.
 */
class ErrApiProviderPost extends Err {
    constructor(url, error, inner) {
        let message = `Cannot POST ${url}: [${error}]`;
        super(message, inner);
        this.originalErrorMessage = error || "";
    }
}
exports.ErrApiProviderPost = ErrApiProviderPost;
/**
 * Signals a failed operation, since the Timer is already running.
 */
class ErrAsyncTimerAlreadyRunning extends Err {
    constructor() {
        super("Async timer already running");
    }
}
exports.ErrAsyncTimerAlreadyRunning = ErrAsyncTimerAlreadyRunning;
/**
 * Signals a failed operation, since the Timer has been aborted.
 */
class ErrAsyncTimerAborted extends Err {
    constructor() {
        super("Async timer aborted");
    }
}
exports.ErrAsyncTimerAborted = ErrAsyncTimerAborted;
/**
 * Signals a timout for a {@link TransactionWatcher}.
 */
class ErrTransactionWatcherTimeout extends Err {
    constructor() {
        super(`TransactionWatcher has timed out`);
    }
}
exports.ErrTransactionWatcherTimeout = ErrTransactionWatcherTimeout;
/**
 * Signals an issue related to waiting for a specific {@link TransactionStatus}.
 */
class ErrExpectedTransactionStatusNotReached extends Err {
    constructor() {
        super(`Expected transaction status not reached`);
    }
}
exports.ErrExpectedTransactionStatusNotReached = ErrExpectedTransactionStatusNotReached;
/**
 * Signals a generic error in the context of Smart Contracts.
 */
class ErrContract extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrContract = ErrContract;
/**
 * Signals a generic error in the context of querying Smart Contracts.
 */
class ErrContractQuery extends Err {
    constructor(message) {
        super(message);
    }
    static increaseSpecificity(err) {
        if (err instanceof ErrApiProviderPost) {
            if (err.originalErrorMessage.indexOf("error running vm func")) {
                let newErrorMessage = err.originalErrorMessage
                    .replace(new RegExp("executeQuery:", "g"), "")
                    .trim();
                return new ErrContractQuery(newErrorMessage);
            }
        }
        return err;
    }
}
exports.ErrContractQuery = ErrContractQuery;
/**
 * Signals an error thrown by the mock-like test objects.
 */
class ErrMock extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrMock = ErrMock;
/**
 * Signals an error thrown when setting up a test.
 */
class ErrTest extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrTest = ErrTest;
/**
 * Signals a generic serialization error.
 */
class ErrSerialization extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrSerialization = ErrSerialization;
/**
 * Signals a generic type error.
 */
class ErrTypingSystem extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrTypingSystem = ErrTypingSystem;
/**
 * Signals a generic struct typing error.
 */
class ErrStructTyping extends Err {
    constructor(reason) {
        super(`Incorrect struct typing: ${reason}`);
    }
}
exports.ErrStructTyping = ErrStructTyping;
/**
 * Signals a generic codec (encode / decode) error.
 */
class ErrCodec extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrCodec = ErrCodec;
/**
 * Signals a generic wallet error.
 */
class ErrWallet extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrWallet = ErrWallet;
/**
 * Signals a wrong mnemonic format.
 */
class ErrWrongMnemonic extends ErrWallet {
    constructor() {
        super("Wrong mnemonic format");
    }
}
exports.ErrWrongMnemonic = ErrWrongMnemonic;
/**
 * Signals a generic contract interaction error.
 */
class ErrContractInteraction extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrContractInteraction = ErrContractInteraction;
/**
 * Signals a bad PEM file.
 */
class ErrBadPEM extends ErrWallet {
    constructor(message) {
        super(message ? `Bad PEM: ${message}` : `Bad PEM`);
    }
}
exports.ErrBadPEM = ErrBadPEM;
/**
 * Signals an invalid smart contract call data field
 */
class ErrInvalidScCallDataField extends Err {
    constructor(message) {
        message = " " + message ? message : ".";
        super("Invalid smart contract call data field" + message);
    }
}
exports.ErrInvalidScCallDataField = ErrInvalidScCallDataField;
/**
 * Signals an invalid ESDT transfer data field
 */
class ErrInvalidEsdtTransferDataField extends Err {
    constructor() {
        super("Invalid ESDT transfer call data field");
    }
}
exports.ErrInvalidEsdtTransferDataField = ErrInvalidEsdtTransferDataField;
/**
 * Signals that a method is not yet implemented
 */
class ErrNotImplemented extends Err {
    constructor() {
        super("Method not yet implemented");
    }
}
exports.ErrNotImplemented = ErrNotImplemented;
/**
 * Signals that the data inside the url is not a valid one for a transaction sign response
 */
class ErrInvalidTxSignReturnValue extends Err {
    constructor() {
        super("Invalid response in transaction sign return url");
    }
}
exports.ErrInvalidTxSignReturnValue = ErrInvalidTxSignReturnValue;
//# sourceMappingURL=errors.js.map