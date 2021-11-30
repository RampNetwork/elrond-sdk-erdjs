"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanValue = exports.BooleanType = void 0;
const types_1 = require("./types");
class BooleanType extends types_1.PrimitiveType {
    constructor() {
        super("bool");
    }
}
exports.BooleanType = BooleanType;
/**
 * A boolean value fed to or fetched from a Smart Contract contract, as an immutable abstraction.
 */
class BooleanValue extends types_1.PrimitiveValue {
    constructor(value) {
        super(new BooleanType());
        this.value = value;
    }
    /**
     * Returns whether two objects have the same value.
     *
     * @param other another BooleanValue
     */
    equals(other) {
        return this.value === other.value;
    }
    isTrue() {
        return this.value === true;
    }
    isFalse() {
        return !this.isTrue();
    }
    valueOf() {
        return this.value;
    }
}
exports.BooleanValue = BooleanValue;
//# sourceMappingURL=boolean.js.map