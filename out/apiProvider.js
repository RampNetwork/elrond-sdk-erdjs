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
exports.ApiProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const errors = __importStar(require("./errors"));
const logger_1 = require("./logger");
const networkStake_1 = require("./networkStake");
const stats_1 = require("./stats");
const transactionOnNetwork_1 = require("./transactionOnNetwork");
const token_1 = require("./token");
const nftToken_1 = require("./nftToken");
const JSONbig = require("json-bigint");
/**
 * This is a temporary change, this will be the only provider used, ProxyProvider will be deprecated
 */
class ApiProvider {
    /**
     * Creates a new ApiProvider.
     * @param url the URL of the Elrond Api
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
     * Fetches the Network Stake.
     */
    getNetworkStake() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric("stake", (response) => networkStake_1.NetworkStake.fromHttpResponse(response));
        });
    }
    /**
     * Fetches the Network Stats.
     */
    getNetworkStats() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric("stats", (response) => stats_1.Stats.fromHttpResponse(response));
        });
    }
    /**
     * Fetches the state of a {@link Transaction}.
     */
    getTransaction(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`transactions/${txHash.toString()}`, (response) => transactionOnNetwork_1.TransactionOnNetwork.fromHttpResponse(response));
        });
    }
    getToken(tokenIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`tokens/${tokenIdentifier}`, (response) => token_1.Token.fromHttpResponse(response));
        });
    }
    getNFTToken(tokenIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetGeneric(`nfts/${tokenIdentifier}`, (response) => nftToken_1.NFTToken.fromHttpResponse(response));
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
    doGet(resourceUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${this.url}/${resourceUrl}`;
                let response = yield axios_1.default.get(url, this.config);
                return response.data;
            }
            catch (error) {
                this.handleApiError(error, resourceUrl);
            }
        });
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
exports.ApiProvider = ApiProvider;
//# sourceMappingURL=apiProvider.js.map