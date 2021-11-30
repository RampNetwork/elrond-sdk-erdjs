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
exports.WalletConnectProvider = void 0;
const client_1 = __importDefault(require("@walletconnect/client"));
const address_1 = require("../address");
const signature_1 = require("../signature");
const constants_1 = require("./constants");
const logger_1 = require("../logger");
const errors_1 = require("../errors");
class WalletConnectProvider {
    constructor(httpProvider, walletConnectBridge = "", onClientConnect) {
        this.address = "";
        this.signature = "";
        this.provider = httpProvider;
        this.walletConnectBridge = walletConnectBridge;
        this.onClientConnect = onClientConnect;
    }
    /**
     * Initiates wallet connect client.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.walletConnector = new client_1.default({
                bridge: this.walletConnectBridge,
            });
            this.walletConnector.on("connect", this.onConnect.bind(this));
            this.walletConnector.on("session_update", this.onDisconnect.bind(this));
            this.walletConnector.on("disconnect", this.onDisconnect.bind(this));
            if (this.walletConnector.connected &&
                this.walletConnector.accounts.length) {
                const [account] = this.walletConnector.accounts;
                const [address, signature] = account.split(".");
                yield this.loginAccount(address, signature);
            }
            return true;
        });
    }
    /**
     * Returns true if init() was previously called successfully
     */
    isInitialized() {
        return !!this.walletConnector;
    }
    /**
     * Mocked function, returns isInitialized as an async function
     */
    isConnected() {
        return new Promise((resolve, _) => resolve(this.isInitialized()));
    }
    /**
     *
     */
    login() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                yield this.init();
            }
            if ((_a = this.walletConnector) === null || _a === void 0 ? void 0 : _a.connected) {
                yield this.walletConnector.killSession();
                logger_1.Logger.trace("WalletConnect login started but walletConnect not initialized");
                return "";
            }
            yield ((_b = this.walletConnector) === null || _b === void 0 ? void 0 : _b.createSession({ chainId: constants_1.WALLETCONNECT_ELROND_CHAIN_ID }));
            if (!((_c = this.walletConnector) === null || _c === void 0 ? void 0 : _c.uri)) {
                return "";
            }
            return (_d = this.walletConnector) === null || _d === void 0 ? void 0 : _d.uri;
        });
    }
    /**
     * Mocks a logout request by returning true
     */
    logout() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                logger_1.Logger.error("logout: Wallet Connect not initialised, call init() first");
                throw new Error("Wallet Connect not initialised, call init() first");
            }
            if ((_a = this.walletConnector) === null || _a === void 0 ? void 0 : _a.connected) {
                yield ((_b = this.walletConnector) === null || _b === void 0 ? void 0 : _b.killSession());
            }
            return true;
        });
    }
    /**
     * Fetches the wallet connect address
     */
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                logger_1.Logger.error("getAddress: Wallet Connect not initialised, call init() first");
                throw new Error("Wallet Connect not initialised, call init() first");
            }
            return this.address;
        });
    }
    /**
     * Fetches the wallet connect signature
     */
    getSignature() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                logger_1.Logger.error("getSignature: Wallet Connect not initialised, call init() first");
                throw new Error("Wallet Connect not initialised, call init() first");
            }
            return this.signature;
        });
    }
    /**
     * Signs and sends a transaction. Returns the transaction hash
     * @param transaction
     */
    sendTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                logger_1.Logger.error("sendTransaction: Wallet Connect not initialised, call init() first");
                throw new Error("Wallet Connect not initialised, call init() first");
            }
            transaction = yield this.signTransaction(transaction);
            yield transaction.send(this.provider);
            return transaction;
        });
    }
    /**
     * Method will be available once the Maiar wallet connect hook is implemented
     * @param _
     */
    signMessage(_) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new errors_1.ErrNotImplemented();
        });
    }
    /**
     * Signs a transaction and returns it
     * @param transaction
     */
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                logger_1.Logger.error("signTransaction: Wallet Connect not initialised, call init() first");
                throw new Error("Wallet Connect not initialised, call init() first");
            }
            const address = yield this.getAddress();
            const sig = yield this.walletConnector.sendCustomRequest({
                method: "erd_sign",
                params: this.prepareWalletConnectMessage(transaction, address)
            });
            if (!sig || !sig.signature) {
                logger_1.Logger.error("signTransaction: Wallet Connect could not sign the transaction");
                throw new Error("Wallet Connect could not sign the transaction");
            }
            transaction.applySignature(new signature_1.Signature(sig.signature), new address_1.Address(address));
            return transaction;
        });
    }
    /**
     * Signs an array of transactions and returns it
     * @param transactions
     */
    signTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                logger_1.Logger.error("signTransactions: Wallet Connect not initialised, call init() first");
                throw new Error("Wallet Connect not initialised, call init() first");
            }
            const address = yield this.getAddress();
            const params = transactions.map((transaction) => this.prepareWalletConnectMessage(transaction, address));
            const signatures = yield this.walletConnector.sendCustomRequest({
                method: "erd_batch_sign",
                params
            });
            if (!signatures) {
                logger_1.Logger.error("signTransactions: Wallet Connect could not sign the transactions");
                throw new Error("Wallet Connect could not sign the transactions");
            }
            if (Array.isArray(signatures)) {
                if (transactions.length !== signatures.length) {
                    logger_1.Logger.error("signTransactions: Wallet Connect could not sign the transactions. Invalid signatures.");
                    throw new Error("Wallet Connect could not sign the transactions. Invalid signatures.");
                }
                transactions.map((transaction, key) => transaction.applySignature(new signature_1.Signature(signatures[key].signature), new address_1.Address(address)));
                return transactions;
            }
            transactions[0].applySignature(new signature_1.Signature(signatures.signature), new address_1.Address(address));
            return transactions;
        });
    }
    /**
     * Sends a custom method and params and returns the response object
     */
    sendCustomMessage({ method, params, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnector) {
                logger_1.Logger.error("sendCustomMessage: Wallet Connect not initialised, call init() first");
                throw new Error("Wallet Connect not initialised, call init() first");
            }
            const customMessageResponse = yield this.walletConnector.sendCustomRequest({
                method,
                params,
            });
            if (!customMessageResponse) {
                logger_1.Logger.error("sendCustomMessage: Wallet Connect could not send the message");
                throw new Error("Wallet Connect could not send the message");
            }
            return customMessageResponse;
        });
    }
    onConnect(error, { params }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                throw error;
            }
            if (!params || !params[0]) {
                logger_1.Logger.error("Wallet Connect missing payload");
                throw new Error("missing payload");
            }
            const { accounts: [account], } = params[0];
            const [address, signature] = account.split(".");
            yield this.loginAccount(address, signature);
        });
    }
    onDisconnect(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                throw error;
            }
            this.onClientConnect.onClientLogout();
        });
    }
    loginAccount(address, signature) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.addressIsValid(address)) {
                this.address = address;
                if (signature) {
                    this.signature = signature;
                }
                this.onClientConnect.onClientLogin();
                return;
            }
            logger_1.Logger.error(`Wallet Connect invalid address ${address}`);
            if ((_a = this.walletConnector) === null || _a === void 0 ? void 0 : _a.connected) {
                yield ((_b = this.walletConnector) === null || _b === void 0 ? void 0 : _b.killSession());
            }
        });
    }
    prepareWalletConnectMessage(transaction, address) {
        return {
            nonce: transaction.getNonce().valueOf(),
            from: address,
            to: transaction.getReceiver().toString(),
            amount: transaction.getValue().toString(),
            gasPrice: transaction
                .getGasPrice()
                .valueOf()
                .toString(),
            gasLimit: transaction
                .getGasLimit()
                .valueOf()
                .toString(),
            data: Buffer.from(transaction
                .getData()
                .toString()
                .trim()).toString(),
            chainId: transaction.getChainID().valueOf(),
            version: transaction.getVersion().valueOf(),
        };
    }
    addressIsValid(destinationAddress) {
        try {
            const addr = new address_1.Address(destinationAddress);
            return !!addr;
        }
        catch (_a) {
            return false;
        }
    }
}
exports.WalletConnectProvider = WalletConnectProvider;
//# sourceMappingURL=walletConnectProvider.js.map