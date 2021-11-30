"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenIdentifierValue = exports.TokenIdentifierType = void 0;
const types_1 = require("./types");
class TokenIdentifierType extends types_1.PrimitiveType {
    constructor() {
        super("TokenIdentifier");
    }
}
exports.TokenIdentifierType = TokenIdentifierType;
class TokenIdentifierValue extends types_1.PrimitiveValue {
    constructor(value) {
        super(new TokenIdentifierType());
        this.value = value;
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
exports.TokenIdentifierValue = TokenIdentifierValue;
//# sourceMappingURL=tokenIdentifier.js.map