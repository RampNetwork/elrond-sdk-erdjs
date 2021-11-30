"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const bignumber_js_1 = require("bignumber.js");
const errors_1 = require("./errors");
const balanceBuilder_1 = require("./balanceBuilder");
/**
 * The number of decimals handled when working with EGLD or ESDT values.
 */
const DEFAULT_BIGNUMBER_DECIMAL_PLACES = 18;
bignumber_js_1.BigNumber.set({ DECIMAL_PLACES: DEFAULT_BIGNUMBER_DECIMAL_PLACES, ROUNDING_MODE: 1 });
/**
 * Balance, as an immutable object.
 */
class Balance {
    /**
     * Creates a Balance object.
     */
    constructor(token, nonce, value) {
        this.nonce = new bignumber_js_1.BigNumber(0);
        this.value = new bignumber_js_1.BigNumber(0);
        this.token = token;
        this.nonce = new bignumber_js_1.BigNumber(nonce);
        this.value = new bignumber_js_1.BigNumber(value);
    }
    /**
     * Creates a balance object from an EGLD value (denomination will be applied).
     */
    static egld(value) {
        return balanceBuilder_1.Egld(value);
    }
    /**
     * Creates a balance object from a string (with denomination included).
     */
    static fromString(value) {
        return balanceBuilder_1.Egld.raw(value || "0");
    }
    /**
     * Creates a zero-valued EGLD balance object.
     */
    static Zero() {
        return balanceBuilder_1.Egld(0);
    }
    isZero() {
        return this.value.isZero();
    }
    isEgld() {
        return this.token.isEgld();
    }
    isSet() {
        return !this.isZero();
    }
    /**
     * Returns the string representation of the value (as EGLD currency).
     */
    toCurrencyString() {
        return `${this.toDenominated()} ${this.token.getTokenIdentifier()}`;
    }
    toDenominated() {
        return this.value.shiftedBy(-this.token.decimals).toFixed(this.token.decimals);
    }
    /**
     * Returns the string representation of the value (its big-integer form).
     */
    toString() {
        return this.value.toFixed();
    }
    /**
     * Converts the balance to a pretty, plain JavaScript object.
     */
    toJSON() {
        return {
            asString: this.toString(),
            asCurrencyString: this.toCurrencyString()
        };
    }
    getNonce() {
        return this.nonce;
    }
    valueOf() {
        return this.value;
    }
    plus(other) {
        this.checkSameToken(other);
        return new Balance(this.token, this.nonce, this.value.plus(other.value));
    }
    minus(other) {
        this.checkSameToken(other);
        return new Balance(this.token, this.nonce, this.value.minus(other.value));
    }
    times(n) {
        return new Balance(this.token, this.nonce, this.value.times(n));
    }
    div(n) {
        return new Balance(this.token, this.nonce, this.value.div(n));
    }
    isEqualTo(other) {
        this.checkSameToken(other);
        return this.value.isEqualTo(other.value);
    }
    checkSameToken(other) {
        if (this.token != other.token) {
            throw new errors_1.ErrInvalidArgument("Different token types");
        }
        if (!this.nonce.isEqualTo(other.nonce)) {
            throw new errors_1.ErrInvalidArgument("Different nonces");
        }
    }
}
exports.Balance = Balance;
//# sourceMappingURL=balance.js.map