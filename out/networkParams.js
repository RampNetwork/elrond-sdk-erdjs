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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasPriceModifier = exports.TransactionOptions = exports.TransactionVersion = exports.ChainID = exports.GasLimit = exports.GasPrice = void 0;
const networkConfig_1 = require("./networkConfig");
const errors = __importStar(require("./errors"));
const balanceBuilder_1 = require("./balanceBuilder");
const constants_1 = require("./constants");
/**
 * The gas price, as an immutable object.
 */
class GasPrice {
    /**
     * Creates a GasPrice object given a value.
     */
    constructor(value) {
        value = Number(value);
        if (Number.isNaN(value) || value < 0) {
            throw new errors.ErrGasPriceInvalid(value);
        }
        this.value = value;
    }
    toDenominated() {
        let asBalance = balanceBuilder_1.Egld.raw(this.value.toString(10));
        return asBalance.toDenominated();
    }
    /**
     * Creates a GasPrice object using the minimum value.
     */
    static min() {
        let value = networkConfig_1.NetworkConfig.getDefault().MinGasPrice.value;
        return new GasPrice(value);
    }
    valueOf() {
        return this.value;
    }
}
exports.GasPrice = GasPrice;
/**
 * The gas limit, as an immutable object.
 */
class GasLimit {
    /**
     * Creates a GasLimit object given a value.
     */
    constructor(value) {
        value = Number(value);
        if (Number.isNaN(value) || value < 0) {
            throw new errors.ErrGasLimitInvalid(value);
        }
        this.value = value;
    }
    /**
     * Creates a GasLimit object for a value-transfer {@link Transaction}.
     */
    static forTransfer(data) {
        let value = networkConfig_1.NetworkConfig.getDefault().MinGasLimit.value;
        if (data) {
            value += networkConfig_1.NetworkConfig.getDefault().GasPerDataByte * data.length();
        }
        return new GasLimit(value);
    }
    /**
     * Creates a GasLimit object using the minimum value.
     */
    static min() {
        let value = networkConfig_1.NetworkConfig.getDefault().MinGasLimit.value;
        return new GasLimit(value);
    }
    valueOf() {
        return this.value;
    }
}
exports.GasLimit = GasLimit;
class ChainID {
    /**
     * Creates a ChainID object given a value.
     */
    constructor(value) {
        if (!value) {
            throw new errors.ErrChainIDInvalid(value);
        }
        this.value = value;
    }
    valueOf() {
        return this.value;
    }
}
exports.ChainID = ChainID;
class TransactionVersion {
    /**
     * Creates a TransactionVersion object given a value.
     */
    constructor(value) {
        value = Number(value);
        if (value < 1) {
            throw new errors.ErrTransactionVersionInvalid(value);
        }
        this.value = value;
    }
    /**
     * Creates a TransactionVersion object with the default version setting
     */
    static withDefaultVersion() {
        return new TransactionVersion(constants_1.TRANSACTION_VERSION_DEFAULT);
    }
    /**
     * Creates a TransactionVersion object with the VERSION setting for hash signing
     */
    static withTxHashSignVersion() {
        return new TransactionVersion(constants_1.TRANSACTION_VERSION_TX_HASH_SIGN);
    }
    valueOf() {
        return this.value;
    }
}
exports.TransactionVersion = TransactionVersion;
class TransactionOptions {
    /**
     * Creates a TransactionOptions object given a value.
     */
    constructor(value) {
        value = Number(value);
        if (value < 0) {
            throw new errors.ErrTransactionOptionsInvalid(value);
        }
        this.value = value;
    }
    /**
     * Creates a TransactionOptions object with the default options setting
     */
    static withDefaultOptions() {
        return new TransactionOptions(constants_1.TRANSACTION_OPTIONS_DEFAULT);
    }
    /**
     * Created a TransactionsOptions object with the setting for hash signing
     */
    static withTxHashSignOptions() {
        return new TransactionOptions(constants_1.TRANSACTION_OPTIONS_TX_HASH_SIGN);
    }
    valueOf() {
        return this.value;
    }
}
exports.TransactionOptions = TransactionOptions;
class GasPriceModifier {
    /**
     * Creates a GasPriceModifier object given a value.
     */
    constructor(value) {
        value = Number(value);
        if (value <= 0 || value > 1) {
            throw new errors.ErrGasPriceModifierInvalid(value);
        }
        this.value = value;
    }
    valueOf() {
        return this.value;
    }
}
exports.GasPriceModifier = GasPriceModifier;
//# sourceMappingURL=networkParams.js.map