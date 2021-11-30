"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValue = exports.StringType = void 0;
const types_1 = require("./types");
class StringType extends types_1.PrimitiveType {
    constructor() {
        super("utf-8 string");
    }
}
exports.StringType = StringType;
class StringValue extends types_1.PrimitiveValue {
    constructor(value) {
        super(new StringType());
        this.value = value;
    }
    /**
     * Creates a StringValue from a utf-8 string.
     */
    static fromUTF8(value) {
        return new StringValue(value);
    }
    /**
     * Creates a StringValue from a hex-encoded string.
     */
    static fromHex(value) {
        let decodedValue = Buffer.from(value, "hex").toString();
        return new StringValue(decodedValue);
    }
    getLength() {
        return this.value.length;
    }
    /**
     * Returns whether two objects have the same value.
     */
    equals(other) {
        return this.value === other.value;
    }
    valueOf() {
        return this.value;
    }
}
exports.StringValue = StringValue;
//# sourceMappingURL=string.js.map