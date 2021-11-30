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
exports.Address = void 0;
const bech32 = __importStar(require("bech32"));
const errors = __importStar(require("./errors"));
/**
 * The human-readable-part of the bech32 addresses.
 */
const HRP = "erd";
/**
 * The length (in bytes) of a public key (from which a bech32 address can be obtained).
 */
const PUBKEY_LENGTH = 32;
const SMART_CONTRACT_HEX_PUBKEY_PREFIX = "0".repeat(16);
/**
 * An Elrond Address, as an immutable object.
 */
class Address {
    /**
     * Creates an address object, given a raw string (whether a hex pubkey or a Bech32 address), a sequence of bytes, or another Address object.
     */
    constructor(value) {
        // We keep a hex-encoded string as the "backing" value
        this.valueHex = "";
        if (!value) {
            return;
        }
        if (value instanceof Address) {
            return Address.fromAddress(value);
        }
        if (value instanceof Buffer) {
            return Address.fromBuffer(value);
        }
        if (typeof value === "string") {
            return Address.fromString(value);
        }
        throw new errors.ErrAddressCannotCreate(value);
    }
    /**
     * Creates an address object from another address object
     */
    static fromAddress(address) {
        return Address.fromValidHex(address.valueHex);
    }
    static fromValidHex(value) {
        let result = new Address();
        result.valueHex = value;
        return result;
    }
    /**
     * Creates an address object from a Buffer
     */
    static fromBuffer(buffer) {
        if (buffer.length != PUBKEY_LENGTH) {
            throw new errors.ErrAddressCannotCreate(buffer);
        }
        return Address.fromValidHex(buffer.toString("hex"));
    }
    /**
     * Creates an address object from a string (hex or bech32)
     */
    static fromString(value) {
        if (Address.isValidHex(value)) {
            return Address.fromValidHex(value);
        }
        return Address.fromBech32(value);
    }
    static isValidHex(value) {
        return Buffer.from(value, "hex").length == PUBKEY_LENGTH;
    }
    /**
     * Creates an address object from a hex-encoded string
     */
    static fromHex(value) {
        if (!Address.isValidHex(value)) {
            throw new errors.ErrAddressCannotCreate(value);
        }
        return Address.fromValidHex(value);
    }
    /**
     * Creates an address object from a bech32-encoded string
     */
    static fromBech32(value) {
        let decoded;
        try {
            decoded = bech32.decode(value);
        }
        catch (err) {
            throw new errors.ErrAddressCannotCreate(value, err);
        }
        let prefix = decoded.prefix;
        if (prefix != HRP) {
            throw new errors.ErrAddressBadHrp(HRP, prefix);
        }
        let pubkey = Buffer.from(bech32.fromWords(decoded.words));
        if (pubkey.length != PUBKEY_LENGTH) {
            throw new errors.ErrAddressCannotCreate(value);
        }
        return Address.fromValidHex(pubkey.toString("hex"));
    }
    /**
     * Returns the hex representation of the address (pubkey)
     */
    hex() {
        this.assertNotEmpty();
        return this.valueHex;
    }
    /**
     * Returns the bech32 representation of the address
     */
    bech32() {
        this.assertNotEmpty();
        let words = bech32.toWords(this.pubkey());
        let address = bech32.encode(HRP, words);
        return address;
    }
    /**
     * Returns the pubkey as raw bytes (buffer)
     */
    pubkey() {
        this.assertNotEmpty();
        return Buffer.from(this.valueHex, "hex");
    }
    /**
     * Throws an error if the address is empty.
     */
    assertNotEmpty() {
        if (this.isEmpty()) {
            throw new errors.ErrAddressEmpty();
        }
    }
    /**
     * Returns whether the address is empty.
     */
    isEmpty() {
        return !this.valueHex;
    }
    /**
     * Compares the address to another address
     */
    equals(other) {
        if (!other) {
            return false;
        }
        return this.valueHex == other.valueHex;
    }
    /**
     * Returns the bech32 representation of the address
     */
    toString() {
        return this.bech32();
    }
    /**
     * Converts the address to a pretty, plain JavaScript object.
     */
    toJSON() {
        return {
            bech32: this.bech32(),
            pubkey: this.hex()
        };
    }
    /**
     * Creates the Zero address (the one that should be used when deploying smart contracts)
     */
    static Zero() {
        return new Address("0".repeat(64));
    }
    isContractAddress() {
        return this.hex().startsWith(SMART_CONTRACT_HEX_PUBKEY_PREFIX);
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map