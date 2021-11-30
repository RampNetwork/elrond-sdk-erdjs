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
exports.NetworkStake = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
/**
 * An object holding Network stake parameters.
 */
class NetworkStake {
    constructor() {
        this.TotalValidators = 0;
        this.ActiveValidators = 0;
        this.QueueSize = 0;
        this.TotalStaked = new bignumber_js_1.default(0);
    }
    /**
     * Gets the default configuration object (think of the Singleton pattern).
     */
    static getDefault() {
        if (!NetworkStake.default) {
            NetworkStake.default = new NetworkStake();
        }
        return NetworkStake.default;
    }
    /**
     * Synchronizes a configuration object by querying the Network, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let fresh = yield provider.getNetworkStake();
            Object.assign(this, fresh);
        });
    }
    /**
     * Constructs a configuration object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload) {
        let networkStake = new NetworkStake();
        networkStake.TotalValidators = Number(payload["totalValidators"]);
        networkStake.ActiveValidators = Number(payload["activeValidators"]);
        networkStake.QueueSize = Number(payload["queueSize"]);
        networkStake.TotalStaked = new bignumber_js_1.default(payload["totalStaked"]);
        return networkStake;
    }
}
exports.NetworkStake = NetworkStake;
//# sourceMappingURL=networkStake.js.map