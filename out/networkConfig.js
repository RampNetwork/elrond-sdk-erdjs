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
exports.NetworkConfig = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const networkParams_1 = require("./networkParams");
/**
 * An object holding Network configuration parameters.
 */
class NetworkConfig {
    constructor() {
        this.ChainID = new networkParams_1.ChainID("T");
        this.GasPerDataByte = 1500;
        this.TopUpFactor = 0;
        this.RoundDuration = 0;
        this.RoundsPerEpoch = 0;
        this.TopUpRewardsGradientPoint = new bignumber_js_1.default(0);
        this.MinGasLimit = new networkParams_1.GasLimit(50000);
        this.MinGasPrice = new networkParams_1.GasPrice(1000000000);
        this.GasPriceModifier = new networkParams_1.GasPriceModifier(1);
        this.MinTransactionVersion = new networkParams_1.TransactionVersion(1);
    }
    /**
     * Gets the default configuration object (think of the Singleton pattern).
     */
    static getDefault() {
        if (!NetworkConfig.default) {
            NetworkConfig.default = new NetworkConfig();
        }
        return NetworkConfig.default;
    }
    /**
     * Synchronizes a configuration object by querying the Network, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let fresh = yield provider.getNetworkConfig();
            Object.assign(this, fresh);
        });
    }
    /**
     * Constructs a configuration object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload) {
        let networkConfig = new NetworkConfig();
        networkConfig.ChainID = new networkParams_1.ChainID(payload["erd_chain_id"]);
        networkConfig.GasPerDataByte = Number(payload["erd_gas_per_data_byte"]);
        networkConfig.TopUpFactor = Number(payload["erd_top_up_factor"]);
        networkConfig.RoundDuration = Number(payload["erd_round_duration"]);
        networkConfig.RoundsPerEpoch = Number(payload["erd_rounds_per_epoch"]);
        networkConfig.TopUpRewardsGradientPoint = new bignumber_js_1.default(payload["erd_rewards_top_up_gradient_point"]);
        networkConfig.MinGasLimit = new networkParams_1.GasLimit(payload["erd_min_gas_limit"]);
        networkConfig.MinGasPrice = new networkParams_1.GasPrice(payload["erd_min_gas_price"]);
        networkConfig.MinTransactionVersion = new networkParams_1.TransactionVersion(payload["erd_min_transaction_version"]);
        networkConfig.GasPriceModifier = new networkParams_1.GasPriceModifier(payload["erd_gas_price_modifier"]);
        return networkConfig;
    }
}
exports.NetworkConfig = NetworkConfig;
//# sourceMappingURL=networkConfig.js.map