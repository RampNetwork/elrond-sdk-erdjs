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
exports.ProtoSerializer = void 0;
const errors = __importStar(require("../errors"));
const utils_1 = require("../smartcontracts/codec/utils");
const compiled_1 = require("./compiled");
const constants_1 = require("../constants");
/**
 * Hides away the serialization complexity, for each type of object (e.g. transactions).
 
 * The implementation is non-generic, but practical: there's a pair of `serialize` / `deserialize` method for each type of object.
 */
class ProtoSerializer {
    /**
     * Serializes a Transaction object to a Buffer. Handles low-level conversion logic and field-mappings as well.
     */
    serializeTransaction(transaction) {
        let protoTransaction = new compiled_1.proto.Transaction({
            // elrond-go's serializer handles nonce == 0 differently, thus we treat 0 as "undefined".
            Nonce: transaction.getNonce().valueOf() ? transaction.getNonce().valueOf() : undefined,
            Value: this.serializeBalance(transaction.getValue()),
            RcvAddr: transaction.getReceiver().pubkey(),
            RcvUserName: null,
            SndAddr: transaction.getSender().pubkey(),
            SndUserName: null,
            GasPrice: transaction.getGasPrice().valueOf(),
            GasLimit: transaction.getGasLimit().valueOf(),
            Data: transaction.getData().isEmpty() ? null : transaction.getData().valueOf(),
            ChainID: Buffer.from(transaction.getChainID().valueOf()),
            Version: transaction.getVersion().valueOf(),
            Signature: Buffer.from(transaction.getSignature().hex(), "hex")
        });
        if (transaction.getOptions().valueOf() !== constants_1.TRANSACTION_OPTIONS_DEFAULT) {
            protoTransaction.Options = transaction.getOptions().valueOf();
        }
        let encoded = compiled_1.proto.Transaction.encode(protoTransaction).finish();
        let buffer = Buffer.from(encoded);
        return buffer;
    }
    /**
     * Custom serialization, compatible with elrond-go.
     */
    serializeBalance(balance) {
        let value = balance.valueOf();
        if (value.isZero()) {
            return Buffer.from([0, 0]);
        }
        // Will retain the magnitude, as a buffer.
        let buffer = utils_1.bigIntToBuffer(value);
        // We prepend the "positive" sign marker, in order to be compatible with Elrond Go's "sign & magnitude" proto-representation (a custom one).
        buffer = Buffer.concat([Buffer.from([0x00]), buffer]);
        return buffer;
    }
    deserializeTransaction(_buffer) {
        // Not needed (yet).
        throw new errors.ErrUnsupportedOperation("deserializeTransaction");
    }
}
exports.ProtoSerializer = ProtoSerializer;
//# sourceMappingURL=serializer.js.map