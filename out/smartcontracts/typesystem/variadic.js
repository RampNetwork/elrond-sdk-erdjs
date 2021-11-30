"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariadicValue = exports.VariadicType = void 0;
const types_1 = require("./types");
class VariadicType extends types_1.Type {
    constructor(typeParameter) {
        super("Variadic", [typeParameter], types_1.TypeCardinality.variable());
    }
}
exports.VariadicType = VariadicType;
/**
 * An abstraction that represents a sequence of values held under the umbrella of a variadic input / output parameter.
 *
 * Since at the time of constructing input parameters or decoding output parameters, the length is known,
 * this TypedValue behaves similar to a List.
 */
class VariadicValue extends types_1.TypedValue {
    /**
     *
     * @param type the type of this TypedValue (an instance of VariadicType), not the type parameter of the VariadicType
     * @param items the items, having the type type.getFirstTypeParameter()
     */
    constructor(type, items) {
        super(type);
        // TODO: assert items are of type type.getFirstTypeParameter()
        this.items = items;
    }
    static fromItems(...items) {
        if (items.length == 0) {
            return new VariadicValue(new VariadicType(new types_1.TypePlaceholder()), []);
        }
        let typeParameter = items[0].getType();
        return new VariadicValue(new VariadicType(typeParameter), items);
    }
    getItems() {
        return this.items;
    }
    valueOf() {
        return this.items.map(item => item.valueOf());
    }
    equals(other) {
        if (this.getType().differs(other.getType())) {
            return false;
        }
        for (let i = 0; i < this.items.length; i++) {
            let selfItem = this.items[i];
            let otherItem = other.items[i];
            if (!selfItem.equals(otherItem)) {
                return false;
            }
        }
        return true;
    }
}
exports.VariadicValue = VariadicValue;
//# sourceMappingURL=variadic.js.map