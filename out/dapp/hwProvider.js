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
exports.HWProvider = void 0;
const hw_transport_u2f_1 = __importDefault(require("@ledgerhq/hw-transport-u2f"));
const hw_transport_webusb_1 = __importDefault(require("@ledgerhq/hw-transport-webusb"));
// @ts-ignore
const hw_app_elrond_1 = __importDefault(require("@elrondnetwork/hw-app-elrond"));
const platform_1 = __importDefault(require("platform"));
const address_1 = require("../address");
const signature_1 = require("../signature");
const versioning_1 = require("../versioning");
const constants_1 = require("./constants");
const networkParams_1 = require("../networkParams");
class HWProvider {
    constructor(httpProvider) {
        this.addressIndex = 0;
        this.provider = httpProvider;
    }
    /**
     * Creates transport and initialises ledger app.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let webUSBSupported = yield hw_transport_webusb_1.default.isSupported();
                webUSBSupported =
                    webUSBSupported && !!platform_1.default.os && platform_1.default.os.family !== "Windows" && platform_1.default.name !== "Opera";
                const transport = webUSBSupported ? yield hw_transport_webusb_1.default.create() : yield hw_transport_u2f_1.default.create();
                this.hwApp = new hw_app_elrond_1.default(transport);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    /**
     * Returns true if init() was previously called successfully
     */
    isInitialized() {
        return !!this.hwApp;
    }
    /**
     * Mocked function, returns isInitialized as an async function
     */
    isConnected() {
        return new Promise((resolve, _) => resolve(this.isInitialized()));
    }
    /**
     * Performs a login request by setting the selected index in Ledger and returning that address
     */
    login(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hwApp) {
                throw new Error("HWApp not initialised, call init() first");
            }
            if (options && options.addressIndex) {
                this.addressIndex = options.addressIndex;
            }
            yield this.hwApp.setAddress(0, this.addressIndex);
            const { address } = yield this.hwApp.getAddress(0, this.addressIndex, true);
            return address;
        });
    }
    getAccounts(page = 0, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hwApp) {
                throw new Error("HWApp not initialised, call init() first");
            }
            const addresses = [];
            const startIndex = page * pageSize;
            for (let index = startIndex; index < startIndex + pageSize; index++) {
                const { address } = yield this.hwApp.getAddress(0, index);
                addresses.push(address);
            }
            return addresses;
        });
    }
    /**
     * Mocks a logout request by returning true
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hwApp) {
                throw new Error("HWApp not initialised, call init() first");
            }
            return true;
        });
    }
    /**
     * Fetches current selected ledger address
     */
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getCurrentAddress();
        });
    }
    /**
     * Signs and sends a transaction. Returns the transaction hash
     * @param transaction
     */
    sendTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            transaction = yield this.signTransaction(transaction);
            yield transaction.send(this.provider);
            return transaction;
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hwApp) {
                throw new Error("HWApp not initialised, call init() first");
            }
            const address = yield this.getCurrentAddress();
            let signUsingHash = yield this.shouldSignUsingHash();
            if (signUsingHash) {
                transaction.options = networkParams_1.TransactionOptions.withTxHashSignOptions();
                transaction.version = networkParams_1.TransactionVersion.withTxHashSignVersion();
            }
            const sig = yield this.hwApp.signTransaction(transaction.serializeForSigning(new address_1.Address(address)), signUsingHash);
            transaction.applySignature(new signature_1.Signature(sig), new address_1.Address(address));
            return transaction;
        });
    }
    signTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            let retTx = [];
            for (let tx of transactions) {
                retTx.push(yield this.signTransaction(tx));
            }
            return retTx;
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hwApp) {
                throw new Error("HWApp not initialised, call init() first");
            }
            const signature = yield this.hwApp.signMessage(message.serializeForSigningRaw());
            message.applySignature(new signature_1.Signature(signature));
            return message;
        });
    }
    shouldSignUsingHash() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hwApp) {
                throw new Error("HWApp not initialised, call init() first");
            }
            const config = yield this.hwApp.getAppConfiguration();
            let diff = versioning_1.compareVersions(config.version, constants_1.LEDGER_TX_HASH_SIGN_MIN_VERSION);
            return diff >= 0;
        });
    }
    getCurrentAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hwApp) {
                throw new Error("HWApp not initialised, call init() first");
            }
            const { address } = yield this.hwApp.getAddress(0, this.addressIndex);
            return address;
        });
    }
}
exports.HWProvider = HWProvider;
//# sourceMappingURL=hwProvider.js.map