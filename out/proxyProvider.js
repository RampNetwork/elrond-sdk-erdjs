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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const transaction_1 = require("./transaction");
const networkConfig_1 = require("./networkConfig");
const errors = __importStar(require("./errors"));
const account_1 = require("./account");
const queryResponse_1 = require("./smartcontracts/queryResponse");
const logger_1 = require("./logger");
const networkStatus_1 = require("./networkStatus");
const transactionOnNetwork_1 = require("./transactionOnNetwork");
const JSONbig = require("json-bigint");
/**
 * This will be deprecated once all the endpoints move to ApiProvider
 */
class ProxyProvider {
    /**
     * Creates a new ProxyProvider.
     * @param url the URL of the Elrond Proxy
     * @param config axios request config options
     */
    constructor(url, config) {
        this.url = url;
        this.config = Object.assign({}, config, {
            timeout: 1000,
            // See: https://github.com/axios/axios/issues/983 regarding transformResponse
            transformResponse: [
                function (data) {
                    return JSONbig.parse(data);
                },
            ],
        });
    }
    /**
     * Fetches the state of an {@link Account}.
     */
    getAccount(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`address/${address.bech32()}`, (response) => account_1.AccountOnNetwork.fromHttpResponse(response.account));
        });
    }
    getAddressEsdtList(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`address/${address.bech32()}/esdt`, (response) => response.esdts);
        });
    }
    getAddressEsdt(address, tokenIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`address/${address.bech32()}/esdt/${tokenIdentifier}`, (response) => response.tokenData);
        });
    }
    getAddressNft(address, tokenIdentifier, nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`address/${address.bech32()}/nft/${tokenIdentifier}/nonce/${nonce}`, (response) => response.tokenData);
        });
    }
    /**
     * Queries a Smart Contract - runs a pure function defined by the contract and returns its results.
     */
    queryContract(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = query.toHttpRequest();
                return this.doPostGeneric("vm-values/query", data, (response) => queryResponse_1.QueryResponse.fromHttpResponse(response.data || response.vmOutput));
            }
            catch (err) {
                throw errors.ErrContractQuery.increaseSpecificity(err);
            }
        });
    }
    /**
     * Broadcasts an already-signed {@link Transaction}.
     */
    sendTransaction(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doPostGeneric("transaction/send", tx.toSendable(), (response) => new transaction_1.TransactionHash(response.txHash));
        });
    }
    /**
     * Simulates the processing of an already-signed {@link Transaction}.
     */
    simulateTransaction(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doPostGeneric("transaction/simulate", tx.toSendable(), (response) => response);
        });
    }
    /**
     * Fetches the state of a {@link Transaction}.
     */
    getTransaction(txHash, hintSender, withResults) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.buildUrlWithQueryParameters(`transaction/${txHash.toString()}`, {
                withSender: hintSender ? hintSender.bech32() : "",
                withResults: withResults ? "true" : "",
            });
            return this.doGetGeneric(url, (response) => transactionOnNetwork_1.TransactionOnNetwork.fromHttpResponse(response.transaction));
        });
    }
    /**
     * Queries the status of a {@link Transaction}.
     */
    getTransactionStatus(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`transaction/${txHash.toString()}/status`, (response) => new transaction_1.TransactionStatus(response.status));
        });
    }
    /**
     * Fetches the Network configuration.
     */
    getNetworkConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric("network/config", (response) => networkConfig_1.NetworkConfig.fromHttpResponse(response.config));
        });
    }
    /**
     * Fetches the network status configuration.
     */
    getNetworkStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric("network/status/4294967295", (response) => networkStatus_1.NetworkStatus.fromHttpResponse(response.status));
        });
    }
    /**
     * Get method that receives the resource url and on callback the method used to map the response.
     */
    doGetGeneric(resourceUrl, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.doGet(resourceUrl);
            return callback(response);
        });
    }
    /**
     * Post method that receives the resource url, the post payload and on callback the method used to map the response.
     */
    doPostGeneric(resourceUrl, payload, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.doPost(resourceUrl, payload);
            return callback(response);
        });
    }
    doGet(resourceUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${this.url}/${resourceUrl}`;
                let response = yield axios_1.default.get(url, this.config);
                let payload = response.data.data;
                return payload;
            }
            catch (error) {
                this.handleApiError(error, resourceUrl);
            }
        });
    }
    doPost(resourceUrl, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${this.url}/${resourceUrl}`;
                let response = yield axios_1.default.post(url, payload, Object.assign(Object.assign({}, this.config), { headers: {
                        "Content-Type": "application/json",
                    } }));
                let responsePayload = response.data.data;
                return responsePayload;
            }
            catch (error) {
                this.handleApiError(error, resourceUrl);
            }
        });
    }
    buildUrlWithQueryParameters(endpoint, params) {
        let searchParams = new URLSearchParams();
        for (let [key, value] of Object.entries(params)) {
            if (value) {
                searchParams.append(key, value);
            }
        }
        return `${endpoint}?${searchParams.toString()}`;
    }
    handleApiError(error, resourceUrl) {
        if (!error.response) {
            logger_1.Logger.warn(error);
            throw new errors.ErrApiProviderGet(resourceUrl, error.toString(), error);
        }
        let errorData = error.response.data;
        let originalErrorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
        throw new errors.ErrApiProviderGet(resourceUrl, originalErrorMessage, error);
    }
}
exports.ProxyProvider = ProxyProvider;
//# sourceMappingURL=proxyProvider.js.map