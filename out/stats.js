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
exports.Stats = void 0;
/**
 * An object holding Network stats parameters.
 */
class Stats {
    constructor() {
        this.Shards = 0;
        this.Blocks = 0;
        this.Accounts = 0;
        this.Transactions = 0;
        this.RefreshRate = 0;
        this.Epoch = 0;
        this.RoundsPassed = 0;
        this.RoundsPerEpoch = 0;
    }
    /**
     * Synchronizes a stats object by querying the Network, through a {@link IProvider}.
     * @param provider The provider to use
     */
    sync(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let fresh = yield provider.getNetworkStats();
            Object.assign(this, fresh);
        });
    }
    /**
     * Constructs a stats object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload) {
        let stats = new Stats();
        stats.Shards = Number(payload["shards"]);
        stats.Blocks = Number(payload["blocks"]);
        stats.Accounts = Number(payload["accounts"]);
        stats.Transactions = Number(payload["transactions"]);
        stats.RefreshRate = Number(payload["refreshRate"]);
        stats.Epoch = Number(payload["epoch"]);
        stats.RoundsPassed = Number(payload["roundsPassed"]);
        stats.RoundsPerEpoch = Number(payload["roundsPerEpoch"]);
        return stats;
    }
}
exports.Stats = Stats;
//# sourceMappingURL=stats.js.map