"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Egld = exports.createBalanceBuilder = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const _1 = require(".");
const errors_1 = require("./errors");
const token_1 = require("./token");
class BalanceBuilderImpl {
    constructor(token) {
        this.token = token;
        this.nonce_ = null;
        if (token.isFungible()) {
            this.setNonce(0);
        }
    }
    value(value) {
        value = applyDenomination(value, this.token.decimals);
        return new _1.Balance(this.token, this.getNonce(), value);
    }
    raw(value) {
        return new _1.Balance(this.token, this.getNonce(), value);
    }
    nonce(nonce) {
        let builder = createBalanceBuilder(this.token);
        builder.setNonce(nonce);
        return builder;
    }
    setNonce(nonce) {
        this.nonce_ = new bignumber_js_1.default(nonce);
    }
    one() {
        return this.value(1);
    }
    hasNonce() {
        return this.token.isFungible() || this.nonce_ != null;
    }
    getNonce() {
        if (this.nonce_ == null) {
            throw new _1.ErrInvariantFailed("Nonce was not provided");
        }
        return new bignumber_js_1.default(this.nonce_);
    }
    getToken() {
        return this.token;
    }
    getTokenIdentifier() {
        return this.getToken().getTokenIdentifier();
    }
}
function createBalanceBuilder(token) {
    let impl = new BalanceBuilderImpl(token);
    let denominated = impl.value.bind(impl);
    let others = {
        value: impl.value.bind(impl),
        raw: impl.raw.bind(impl),
        nonce: impl.nonce.bind(impl),
        setNonce: impl.setNonce.bind(impl),
        one: impl.one.bind(impl),
        hasNonce: impl.hasNonce.bind(impl),
        getNonce: impl.getNonce.bind(impl),
        getToken: impl.getToken.bind(impl),
        getTokenIdentifier: impl.getTokenIdentifier.bind(impl)
    };
    return Object.assign(denominated, others);
}
exports.createBalanceBuilder = createBalanceBuilder;
/**
 * Builder for an EGLD value.
 */
exports.Egld = createBalanceBuilder(new token_1.Token({ identifier: "EGLD", name: "eGold", decimals: 18, type: token_1.TokenType.Fungible }));
function applyDenomination(value, decimals) {
    if (decimals < 0) {
        throw new errors_1.ErrInvalidArgument("The number of decimals must be positive");
    }
    return new bignumber_js_1.default(value).shiftedBy(decimals).decimalPlaces(0);
}
//# sourceMappingURL=balanceBuilder.js.map