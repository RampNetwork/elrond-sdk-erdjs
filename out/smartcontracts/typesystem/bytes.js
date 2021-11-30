"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesValue = exports.BytesType = void 0;
const types_1 = require("./types");
class BytesType extends types_1.PrimitiveType {
    constructor() {
        super("bytes");
    }
}
exports.BytesType = BytesType;
class BytesValue extends types_1.PrimitiveValue {
    constructor(value) {
        super(new BytesType());
        this.value = value;
    }
    /**
     * Creates a BytesValue from a utf-8 string.
     */
    static fromUTF8(value) {
        let buffer = Buffer.from(value, "utf-8");
        return new BytesValue(buffer);
    }
    /**
     * Creates a BytesValue from a hex-encoded string.
     */
    static fromHex(value) {
        let buffer = Buffer.from(value, "hex");
        return new BytesValue(buffer);
    }
    getLength() {
        return this.value.length;
    }
    /**
     * Returns whether two objects have the same value.
     */
    equals(other) {
        if (this.getLength() != other.getLength()) {
            return false;
        }
        return this.value.equals(other.value);
    }
    valueOf() {
        return this.value;
    }
}
exports.BytesValue = BytesValue;
//# sourceMappingURL=bytes.js.map