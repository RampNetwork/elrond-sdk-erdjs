"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValue = exports.AddressType = void 0;
const types_1 = require("./types");
class AddressType extends types_1.PrimitiveType {
    constructor() {
        super("Address");
    }
}
exports.AddressType = AddressType;
/**
 * An address fed to or fetched from a Smart Contract contract, as an immutable abstraction.
 */
class AddressValue extends types_1.PrimitiveValue {
    constructor(value) {
        super(new AddressType());
        this.value = value;
    }
    /**
     * Returns whether two objects have the same value.
     *
     * @param other another AddressValue
     */
    equals(other) {
        return this.value.equals(other.value);
    }
    valueOf() {
        return this.value;
    }
}
exports.AddressValue = AddressValue;
//# sourceMappingURL=address.js.map