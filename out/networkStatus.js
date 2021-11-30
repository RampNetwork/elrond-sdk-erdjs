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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStatus = void 0;
/**
 * An object holding network status configuration parameters.
 */
class NetworkStatus {
    constructor() {
        this.CurrentRound = 0;
        this.EpochNumber = 0;
        this.HighestFinalNonce = 0;
        this.Nonce = 0;
        this.NonceAtEpochStart = 0;
        this.NoncesPassedInCurrentEpoch = 0;
        this.RoundAtEpochStart = 0;
        this.RoundsPassedInCurrentEpoch = 0;
        this.RoundsPerEpoch = 0;
    }
    /**
     * Gets the default network status object (think of the Singleton pattern).
     */
    static getDefault() {
        if (!NetworkStatus.default) {
            NetworkStatus.default = new NetworkStatus();
        }
        return NetworkStatus.default;
    }
    /**
     * Synchronizes a configuration object by querying the node, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let fresh = yield provider.getNetworkStatus();
            Object.assign(this, fresh);
        });
    }
    /**
     * Constructs a configuration object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload) {
        let networkStatus = new NetworkStatus();
        networkStatus.CurrentRound = Number(payload["erd_current_round"]);
        networkStatus.EpochNumber = Number(payload["erd_epoch_number"]);
        networkStatus.HighestFinalNonce = Number(payload["erd_highest_final_nonce"]);
        networkStatus.Nonce = Number(payload["erd_nonce"]);
        networkStatus.NonceAtEpochStart = Number(payload["erd_nonce_at_epoch_start"]);
        networkStatus.NoncesPassedInCurrentEpoch = Number(payload["erd_nonces_passed_in_current_epoch"]);
        networkStatus.RoundAtEpochStart = Number(payload["erd_round_at_epoch_start"]);
        networkStatus.RoundsPassedInCurrentEpoch = Number(payload["erd_rounds_passed_in_current_epoch"]);
        networkStatus.RoundsPerEpoch = Number(payload["erd_rounds_per_epoch"]);
        return networkStatus;
    }
}
exports.NetworkStatus = NetworkStatus;
//# sourceMappingURL=networkStatus.js.map