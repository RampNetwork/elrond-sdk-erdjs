"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeMetadata = void 0;
/**
 * The metadata of a Smart Contract, as an abstraction.
 */
class CodeMetadata {
    /**
     * Creates a metadata object. By default, set the `upgradeable` attribute, and uset all others.
     *
     * @param upgradeable Whether the contract is upgradeable
     * @param readable Whether other contracts can read this contract's data (without calling one of its pure functions)
     * @param payable Whether the contract is payable
     */
    constructor(upgradeable = true, readable = false, payable = false) {
        this.upgradeable = upgradeable;
        this.readable = readable;
        this.payable = payable;
    }
    /**
     * Adjust the metadata (the `upgradeable` attribute), when preparing the deployment transaction.
     */
    toggleUpgradeable(value) {
        this.upgradeable = value;
    }
    /**
     * Adjust the metadata (the `readable` attribute), when preparing the deployment transaction.
     */
    toggleReadable(value) {
        this.readable = value;
    }
    /**
     * Adjust the metadata (the `payable` attribute), when preparing the deployment transaction.
     */
    togglePayable(value) {
        this.payable = value;
    }
    /**
     * Converts the metadata to the protocol-friendly representation.
     */
    toBuffer() {
        let byteZero = 0;
        let byteOne = 0;
        if (this.upgradeable) {
            byteZero |= ByteZero.Upgradeable;
        }
        if (this.readable) {
            byteZero |= ByteZero.Readable;
        }
        if (this.payable) {
            byteOne |= ByteOne.Payable;
        }
        return Buffer.from([byteZero, byteOne]);
    }
    /**
     * Converts the metadata to a hex-encoded string.
     */
    toString() {
        return this.toBuffer().toString("hex");
    }
    /**
     * Converts the metadata to a pretty, plain JavaScript object.
     */
    toJSON() {
        return {
            upgradeable: this.upgradeable,
            readable: this.readable,
            payable: this.payable
        };
    }
}
exports.CodeMetadata = CodeMetadata;
var ByteZero;
(function (ByteZero) {
    ByteZero[ByteZero["Upgradeable"] = 1] = "Upgradeable";
    ByteZero[ByteZero["Reserved2"] = 2] = "Reserved2";
    ByteZero[ByteZero["Readable"] = 4] = "Readable";
})(ByteZero || (ByteZero = {}));
var ByteOne;
(function (ByteOne) {
    ByteOne[ByteOne["Reserved1"] = 1] = "Reserved1";
    ByteOne[ByteOne["Payable"] = 2] = "Payable";
})(ByteOne || (ByteOne = {}));
//# sourceMappingURL=codeMetadata.js.map