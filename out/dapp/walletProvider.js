"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProvider = void 0;
const qs_1 = __importDefault(require("qs"));
const constants_1 = require("./constants");
const transaction_1 = require("../transaction");
const errors_1 = require("../errors");
const __1 = require("../");
const signature_1 = require("../signature");
class WalletProvider {
    /**
     * Creates a new WalletProvider
     * @param walletURL
     */
    constructor(walletURL = '') {
        this.walletUrl = walletURL;
    }
    /**
     * Waits for the wallet iframe to ping that it has been initialised
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    /**
     * Returns if the wallet iframe is up and running
     */
    isInitialized() {
        return true;
    }
    /**
     * Unlike isInitialized, isConnected returns true if the user alredy went through the login process
     *  and has the wallet session active
     */
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    /**
     * Fetches the login hook url and redirects the client to the wallet login.
     */
    login(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let callbackUrl = `callbackUrl=${window.location.href}`;
            if (options && options.callbackUrl) {
                callbackUrl = `callbackUrl=${options.callbackUrl}`;
            }
            let token = '';
            if (options && options.token) {
                token = `&token=${options.token}`;
            }
            window.location.href = `${this.baseWalletUrl()}${constants_1.WALLET_PROVIDER_CONNECT_URL}?${callbackUrl}${token}`;
            return window.location.href;
        });
    }
    /**
    * Fetches the logout hook url and redirects the client to the wallet logout.
    */
    logout(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let callbackUrl = `callbackUrl=${window.location.href}`;
            if (options && options.callbackUrl) {
                callbackUrl = `callbackUrl=${options.callbackUrl}`;
            }
            window.location.href = `${this.baseWalletUrl()}${constants_1.WALLET_PROVIDER_DISCONNECT_URL}?${callbackUrl}`;
            return true;
        });
    }
    /**
     * Returns currently connected address. Empty string if not connected
     */
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new errors_1.ErrNotImplemented();
        });
    }
    /**
     * Packs a {@link Transaction} and fetches correct redirect URL from the wallet API. Then redirects
     *   the client to the send transaction hook
     * @param transaction
     * @param options
     */
    sendTransaction(transaction, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let plainTransaction = WalletProvider.prepareWalletTransaction(transaction);
            let url = `${this.baseWalletUrl()}${constants_1.WALLET_PROVIDER_SEND_TRANSACTION_URL}?${this.buildTransactionUrl(plainTransaction)}`;
            window.location.href = `${url}&callbackUrl=${options !== undefined && options.callbackUrl !== undefined ? options.callbackUrl : window.location.href}`;
            return transaction;
        });
    }
    /**
     * Packs an array of {$link Transaction} and redirects to the correct transaction sigining hook
     *
     * @param transactions
     * @param options
     */
    signTransactions(transactions, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonToSend = {};
            transactions.map(tx => {
                let plainTx = WalletProvider.prepareWalletTransaction(tx);
                for (let txProp in plainTx) {
                    if (plainTx.hasOwnProperty(txProp) && !jsonToSend.hasOwnProperty(txProp)) {
                        jsonToSend[txProp] = [];
                    }
                    jsonToSend[txProp].push(plainTx[txProp]);
                }
            });
            let url = `${this.baseWalletUrl()}${constants_1.WALLET_PROVIDER_SIGN_TRANSACTION_URL}?${qs_1.default.stringify(jsonToSend)}`;
            window.location.href = `${url}&callbackUrl=${options !== undefined && options.callbackUrl !== undefined ? options.callbackUrl : window.location.href}`;
            return transactions;
        });
    }
    /**
     * Packs a {@link Transaction} and fetches correct redirect URL from the wallet API. Then redirects
     *   the client to the sign transaction hook
     * @param transaction
     * @param options
     */
    signTransaction(transaction, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let plainTransaction = WalletProvider.prepareWalletTransaction(transaction);
            let url = `${this.baseWalletUrl()}${constants_1.WALLET_PROVIDER_SIGN_TRANSACTION_URL}?${this.buildTransactionUrl(plainTransaction)}`;
            window.location.href = `${url}&callbackUrl=${options !== undefined && options.callbackUrl !== undefined ? options.callbackUrl : window.location.href}`;
            return transaction;
        });
    }
    getTransactionsFromWalletUrl() {
        const transactions = [];
        const urlParams = qs_1.default.parse(window.location.search.slice(1));
        if (!WalletProvider.isTxSignReturnSuccess(urlParams)) {
            return transactions;
        }
        return WalletProvider.getTxSignReturnValue(urlParams);
    }
    /**
     * Method will be available once the ElrondWallet hook will be implemented
     * @param _
     */
    signMessage(_) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new errors_1.ErrNotImplemented();
        });
    }
    static isTxSignReturnSuccess(urlParams) {
        return urlParams.hasOwnProperty(constants_1.WALLET_PROVIDER_CALLBACK_PARAM) && urlParams[constants_1.WALLET_PROVIDER_CALLBACK_PARAM] === constants_1.WALLET_PROVIDER_CALLBACK_PARAM_TX_SIGNED;
    }
    static getTxSignReturnValue(urlParams) {
        const expectedProps = ["nonce", "value", "receiver", "sender", "gasPrice",
            "gasLimit", "data", "chainID", "version", "signature"];
        for (let txProp of expectedProps) {
            if (!urlParams[txProp] || !Array.isArray(urlParams[txProp])) {
                throw new errors_1.ErrInvalidTxSignReturnValue();
            }
        }
        const expectedLength = urlParams["nonce"].length;
        for (let txProp of expectedProps) {
            if (urlParams[txProp].length !== expectedLength) {
                throw new errors_1.ErrInvalidTxSignReturnValue();
            }
        }
        const transactions = [];
        for (let i = 0; i < expectedLength; i++) {
            let tx = new transaction_1.Transaction({
                nonce: new __1.Nonce(urlParams["nonce"][i]),
                value: __1.Balance.fromString(urlParams["value"][i]),
                receiver: __1.Address.fromString(urlParams["receiver"][i]),
                gasPrice: new __1.GasPrice(parseInt(urlParams["gasPrice"][i])),
                gasLimit: new __1.GasLimit(parseInt(urlParams["gasLimit"][i])),
                data: new __1.TransactionPayload(urlParams["data"][i]),
                chainID: new __1.ChainID(urlParams["chainID"][i]),
                version: new __1.TransactionVersion(parseInt(urlParams["version"][i])),
            });
            tx.applySignature(new signature_1.Signature(urlParams["signature"][i]), __1.Address.fromString(urlParams["sender"][i]));
            transactions.push(tx);
        }
        return transactions;
    }
    static prepareWalletTransaction(transaction) {
        let plainTransaction = transaction.toPlainObject();
        // We adjust the fields, in order to make them compatible with what the wallet expected
        plainTransaction["nonce"] = transaction.getNonce().valueOf();
        plainTransaction["data"] = transaction.getData().valueOf().toString();
        plainTransaction["value"] = transaction.getValue().toString();
        plainTransaction["gasPrice"] = transaction.getGasPrice().valueOf();
        plainTransaction["gasLimit"] = transaction.getGasLimit().valueOf();
        return plainTransaction;
    }
    buildTransactionUrl(transaction) {
        let urlString = `receiver=${transaction.receiver}&value=${transaction.value}`;
        if (transaction.gasLimit) {
            urlString += `&gasLimit=${transaction.gasLimit}`;
        }
        if (transaction.gasPrice) {
            urlString += `&gasPrice=${transaction.gasPrice}`;
        }
        if (transaction.data) {
            urlString += `&data=${transaction.data}`;
        }
        if (transaction.nonce) {
            urlString += `&nonce=${transaction.nonce}`;
        }
        return urlString;
    }
    baseWalletUrl() {
        const pathArray = this.walletUrl.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];
        return protocol + '//' + host;
    }
}
exports.WalletProvider = WalletProvider;
//# sourceMappingURL=walletProvider.js.map