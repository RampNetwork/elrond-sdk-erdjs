"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalValue = exports.OptionalType = void 0;
const utils_1 = require("../../utils");
const types_1 = require("./types");
/**
 * An optional is an algebraic type. It holds zero or one values.
 */
class OptionalType extends types_1.Type {
    constructor(typeParameter) {
        super("Optional", [typeParameter], types_1.TypeCardinality.variable(1));
    }
}
exports.OptionalType = OptionalType;
class OptionalValue extends types_1.TypedValue {
    constructor(type, value = null) {
        super(type);
        // TODO: assert value is of type type.getFirstTypeParameter()
        this.value = value;
    }
    isSet() {
        return this.value ? true : false;
    }
    getTypedValue() {
        utils_1.guardValueIsSet("value", this.value);
        return this.value;
    }
    valueOf() {
        return this.value ? this.value.valueOf() : null;
    }
    equals(other) {
        var _a;
        return ((_a = this.value) === null || _a === void 0 ? void 0 : _a.equals(other.value)) || false;
    }
}
exports.OptionalValue = OptionalValue;
//# sourceMappingURL=algebraic.js.map