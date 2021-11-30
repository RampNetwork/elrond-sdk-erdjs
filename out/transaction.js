"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionHash = exports.Transaction = void 0;
const bignumber_js_1 = require("bignumber.js");
const address_1 = require("./address");
const balance_1 = require("./balance");
const networkParams_1 = require("./networkParams");
const networkConfig_1 = require("./networkConfig");
const nonce_1 = require("./nonce");
const signature_1 = require("./signature");
const utils_1 = require("./utils");
const transactionPayload_1 = require("./transactionPayload");
const errors = __importStar(require("./errors"));
const events_1 = require("./events");
const transactionWatcher_1 = require("./transactionWatcher");
const proto_1 = require("./proto");
const transactionOnNetwork_1 = require("./transactionOnNetwork");
const hash_1 = require("./hash");
const createTransactionHasher = require("blake2b");
const DEFAULT_TRANSACTION_VERSION = networkParams_1.TransactionVersion.withDefaultVersion();
const DEFAULT_TRANSACTION_OPTIONS = networkParams_1.TransactionOptions.withDefaultOptions();
const TRANSACTION_HASH_LENGTH = 32;
/**
 * An abstraction for creating, signing and broadcasting Elrond transactions.
 */
class Transaction {
    /**
     * Creates a new Transaction object.
     */
    constructor({ nonce, value, receiver, sender, gasPrice, gasLimit, data, chainID, version, options }) {
        /**
         * A (cached) representation of the transaction, as fetched from the API.
         */
        this.asOnNetwork = new transactionOnNetwork_1.TransactionOnNetwork();
        this.nonce = nonce || new nonce_1.Nonce(0);
        this.value = value || balance_1.Balance.Zero();
        this.sender = sender || address_1.Address.Zero();
        this.receiver = receiver;
        this.gasPrice = gasPrice || networkConfig_1.NetworkConfig.getDefault().MinGasPrice;
        this.gasLimit = gasLimit || networkConfig_1.NetworkConfig.getDefault().MinGasLimit;
        this.data = data || new transactionPayload_1.TransactionPayload();
        this.chainID = chainID || networkConfig_1.NetworkConfig.getDefault().ChainID;
        this.version = version || DEFAULT_TRANSACTION_VERSION;
        this.options = options || DEFAULT_TRANSACTION_OPTIONS;
        this.signature = signature_1.Signature.empty();
        this.hash = TransactionHash.empty();
        this.status = TransactionStatus.createUnknown();
        this.onSigned = new events_1.TypedEvent();
        this.onSent = new events_1.TypedEvent();
        this.onStatusUpdated = new events_1.TypedEvent();
        this.onStatusChanged = new events_1.TypedEvent();
        // We apply runtime type checks for these fields, since they are the most commonly misused when calling the Transaction constructor
        // in JavaScript (which lacks type safety).
        utils_1.guardType("nonce", nonce_1.Nonce, this.nonce);
        utils_1.guardType("gasLimit", networkParams_1.GasLimit, this.gasLimit);
        utils_1.guardType("gasPrice", networkParams_1.GasPrice, this.gasPrice);
    }
    getNonce() {
        return this.nonce;
    }
    /**
     * Sets the account sequence number of the sender. Must be done prior signing.
     *
     * ```
     * await alice.sync(provider);
     *
     * let tx = new Transaction({
     *      value: Balance.egld(1),
     *      receiver: bob.address
     * });
     *
     * tx.setNonce(alice.nonce);
     * await alice.signer.sign(tx);
     * ```
     */
    setNonce(nonce) {
        this.nonce = nonce;
        this.doAfterPropertySetter();
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
        this.doAfterPropertySetter();
    }
    getSender() {
        return this.sender;
    }
    getReceiver() {
        return this.receiver;
    }
    getGasPrice() {
        return this.gasPrice;
    }
    setGasPrice(gasPrice) {
        this.gasPrice = gasPrice;
        this.doAfterPropertySetter();
    }
    getGasLimit() {
        return this.gasLimit;
    }
    setGasLimit(gasLimit) {
        this.gasLimit = gasLimit;
        this.doAfterPropertySetter();
    }
    getData() {
        return this.data;
    }
    getChainID() {
        return this.chainID;
    }
    getVersion() {
        return this.version;
    }
    getOptions() {
        return this.options;
    }
    doAfterPropertySetter() {
        this.signature = signature_1.Signature.empty();
        this.hash = TransactionHash.empty();
    }
    getSignature() {
        utils_1.guardNotEmpty(this.signature, "signature");
        return this.signature;
    }
    getHash() {
        utils_1.guardNotEmpty(this.hash, "hash");
        return this.hash;
    }
    getStatus() {
        return this.status;
    }
    /**
     * Serializes a transaction to a sequence of bytes, ready to be signed.
     * This function is called internally, by {@link Signer} objects.
     *
     * @param signedBy The address of the future signer
     */
    serializeForSigning(signedBy) {
        // TODO: for appropriate tx.version, interpret tx.options accordingly and sign using the content / data hash
        let plain = this.toPlainObject(signedBy);
        // Make sure we never sign the transaction with another signature set up (useful when using the same method for verification)
        if (plain.signature) {
            delete plain.signature;
        }
        let serialized = JSON.stringify(plain);
        return Buffer.from(serialized);
    }
    /**
     * Converts the transaction object into a ready-to-serialize, plain JavaScript object.
     * This function is called internally within the signing procedure.
     *
     * @param sender The address of the sender (will be provided when called within the signing procedure)
     */
    toPlainObject(sender) {
        return {
            nonce: this.nonce.valueOf(),
            value: this.value.toString(),
            receiver: this.receiver.bech32(),
            sender: sender ? sender.bech32() : this.sender.bech32(),
            gasPrice: this.gasPrice.valueOf(),
            gasLimit: this.gasLimit.valueOf(),
            data: this.data.isEmpty() ? undefined : this.data.encoded(),
            chainID: this.chainID.valueOf(),
            version: this.version.valueOf(),
            options: this.options.valueOf() == 0 ? undefined : this.options.valueOf(),
            signature: this.signature.isEmpty() ? undefined : this.signature.hex(),
        };
    }
    /**
     * Applies the signature on the transaction.
     *
     * @param signature The signature, as computed by a {@link ISigner}.
     * @param signedBy The address of the signer.
     */
    applySignature(signature, signedBy) {
        utils_1.guardEmpty(this.signature, "signature");
        utils_1.guardEmpty(this.hash, "hash");
        this.signature = signature;
        this.sender = signedBy;
        this.hash = TransactionHash.compute(this);
        this.onSigned.emit({ transaction: this, signedBy: signedBy });
    }
    /**
     * Broadcasts a transaction to the Network, via a {@link IProvider}.
     *
     * ```
     * let provider = new ProxyProvider("https://gateway.elrond.com");
     * // ... Prepare, sign the transaction, then:
     * await tx.send(provider);
     * await tx.awaitExecuted(provider);
     * ```
     */
    send(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            this.hash = yield provider.sendTransaction(this);
            this.onSent.emit({ transaction: this });
            return this.hash;
        });
    }
    /**
     * Simulates a transaction on the Network, via a {@link IProvider}.
     */
    simulate(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield provider.simulateTransaction(this);
        });
    }
    /**
     * Converts a transaction to a ready-to-broadcast object.
     * Called internally by the {@link IProvider}.
     */
    toSendable() {
        if (this.signature.isEmpty()) {
            throw new errors.ErrTransactionNotSigned();
        }
        return this.toPlainObject();
    }
    /**
     * Fetches a representation of the transaction (whether pending, processed or finalized), as found on the Network.
     *
     * @param provider The provider to use
     * @param cacheLocally Whether to cache the response locally, on the transaction object
     * @param awaitNotarized Whether to wait for the transaction to be notarized
     * @param withResults Whether to wait for the transaction results
     */
    getAsOnNetwork(provider, cacheLocally = true, awaitNotarized = true, withResults = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hash.isEmpty()) {
                throw new errors.ErrTransactionHashUnknown();
            }
            // For Smart Contract transactions, wait for their full execution & notarization before returning.
            let isSmartContractTransaction = this.receiver.isContractAddress();
            if (isSmartContractTransaction && awaitNotarized) {
                yield this.awaitNotarized(provider);
            }
            let response = yield provider.getTransaction(this.hash, this.sender, withResults);
            if (cacheLocally) {
                this.asOnNetwork = response;
            }
            return response;
        });
    }
    /**
     * Returns the cached representation of the transaction, as previously fetched using {@link Transaction.getAsOnNetwork}.
     */
    getAsOnNetworkCached() {
        return this.asOnNetwork;
    }
    awaitSigned() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.signature.isEmpty()) {
                return;
            }
            return new Promise((resolve, _reject) => {
                this.onSigned.on(() => resolve());
            });
        });
    }
    awaitHashed() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hash.isEmpty()) {
                return;
            }
            return new Promise((resolve, _reject) => {
                this.onSigned.on(() => resolve());
            });
        });
    }
    /**
     * Computes the current transaction fee based on the {@link NetworkConfig} and transaction properties
     * @param networkConfig {@link NetworkConfig}
     */
    computeFee(networkConfig) {
        let moveBalanceGas = networkConfig.MinGasLimit.valueOf() + this.data.length() * networkConfig.GasPerDataByte.valueOf();
        if (moveBalanceGas > this.gasLimit.valueOf()) {
            throw new errors.ErrNotEnoughGas(this.gasLimit.valueOf());
        }
        let gasPrice = new bignumber_js_1.BigNumber(this.gasPrice.valueOf());
        let feeForMove = new bignumber_js_1.BigNumber(moveBalanceGas).multipliedBy(gasPrice);
        if (moveBalanceGas === this.gasLimit.valueOf()) {
            return feeForMove;
        }
        let diff = new bignumber_js_1.BigNumber(this.gasLimit.valueOf() - moveBalanceGas);
        let modifiedGasPrice = gasPrice.multipliedBy(new bignumber_js_1.BigNumber(networkConfig.GasPriceModifier.valueOf()));
        let processingFee = diff.multipliedBy(modifiedGasPrice);
        return feeForMove.plus(processingFee);
    }
    /**
     * Awaits for a transaction to reach its "pending" state - that is, for the transaction to be accepted in the mempool.
     * Performs polling against the provider, via a {@link TransactionWatcher}.
     */
    awaitPending(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let watcher = new transactionWatcher_1.TransactionWatcher(this.hash, provider);
            yield watcher.awaitPending(this.notifyStatusUpdate.bind(this));
        });
    }
    /**
     * Awaits for a transaction to reach its "executed" state - that is, for the transaction to be processed (whether with success or with errors).
     * Performs polling against the provider, via a {@link TransactionWatcher}.
     */
    awaitExecuted(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let watcher = new transactionWatcher_1.TransactionWatcher(this.hash, provider);
            yield watcher.awaitExecuted(this.notifyStatusUpdate.bind(this));
        });
    }
    notifyStatusUpdate(newStatus) {
        let sameStatus = this.status.equals(newStatus);
        this.onStatusUpdated.emit({ transaction: this });
        if (!sameStatus) {
            this.status = newStatus;
            this.onStatusChanged.emit({ transaction: this });
        }
    }
    awaitNotarized(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let watcher = new transactionWatcher_1.TransactionWatcher(this.hash, provider);
            yield watcher.awaitNotarized();
        });
    }
}
exports.Transaction = Transaction;
/**
 * An abstraction for handling and computing transaction hashes.
 */
class TransactionHash extends hash_1.Hash {
    constructor(hash) {
        super(hash);
    }
    /**
     * Computes the hash of a transaction.
     * Not yet implemented.
     */
    static compute(transaction) {
        let serializer = new proto_1.ProtoSerializer();
        let buffer = serializer.serializeTransaction(transaction);
        let hash = createTransactionHasher(TRANSACTION_HASH_LENGTH)
            .update(buffer)
            .digest("hex");
        return new TransactionHash(hash);
    }
}
exports.TransactionHash = TransactionHash;
/**
 * An abstraction for handling and interpreting the "status" field of a {@link Transaction}.
 */
class TransactionStatus {
    /**
     * Creates a new TransactionStatus object.
     */
    constructor(status) {
        this.status = (status || "").toLowerCase();
    }
    /**
     * Creates an unknown status.
     */
    static createUnknown() {
        return new TransactionStatus("unknown");
    }
    /**
     * Returns whether the transaction is pending (e.g. in mempool).
     */
    isPending() {
        return this.status == "received" || this.status == "pending" || this.status == "partially-executed";
    }
    /**
     * Returns whether the transaction has been executed (not necessarily with success).
     */
    isExecuted() {
        return this.isSuccessful() || this.isInvalid();
    }
    /**
     * Returns whether the transaction has been executed successfully.
     */
    isSuccessful() {
        return this.status == "executed" || this.status == "success" || this.status == "successful";
    }
    /**
     * Returns whether the transaction has been executed, but with a failure.
     */
    isFailed() {
        return this.status == "fail" || this.status == "failed" || this.status == "unsuccessful" || this.isInvalid();
    }
    /**
     * Returns whether the transaction has been executed, but marked as invalid (e.g. due to "insufficient funds").
     */
    isInvalid() {
        return this.status == "invalid";
    }
    toString() {
        return this.status;
    }
    valueOf() {
        return this.status;
    }
    equals(other) {
        if (!other) {
            return false;
        }
        return this.status == other.status;
    }
}
exports.TransactionStatus = TransactionStatus;
//# sourceMappingURL=transaction.js.map