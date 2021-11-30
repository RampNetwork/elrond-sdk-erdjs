"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.OptionValue = exports.ListType = exports.OptionType = void 0;
const utils_1 = require("../../utils");
const types_1 = require("./types");
class OptionType extends types_1.Type {
    constructor(typeParameter) {
        super("Option", [typeParameter]);
    }
    isAssignableFrom(type) {
        if (!(type instanceof OptionType)) {
            return false;
        }
        let invariantTypeParameters = this.getFirstTypeParameter().equals(type.getFirstTypeParameter());
        let fakeCovarianceToNull = type.getFirstTypeParameter() instanceof types_1.NullType;
        return invariantTypeParameters || fakeCovarianceToNull;
    }
}
exports.OptionType = OptionType;
class ListType extends types_1.Type {
    constructor(typeParameter) {
        super("List", [typeParameter]);
    }
}
exports.ListType = ListType;
class OptionValue extends types_1.TypedValue {
    constructor(type, value = null) {
        super(type);
        // TODO: assert value is of type type.getFirstTypeParameter()
        this.value = value;
    }
    /**
     * Creates an OptionValue, as a missing option argument.
     */
    static newMissing() {
        let type = new OptionType(new types_1.NullType());
        return new OptionValue(type);
    }
    static newMissingType(type) {
        return new OptionValue(new OptionType(type));
    }
    /**
     * Creates an OptionValue, as a provided option argument.
     */
    static newProvided(typedValue) {
        let type = new OptionType(typedValue.getType());
        return new OptionValue(type, typedValue);
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
exports.OptionValue = OptionValue;
// TODO: Rename to ListValue, for consistency (though the term is slighly unfortunate).
// Question for review: or not?
class List extends types_1.TypedValue {
    /**
     *
     * @param type the type of this TypedValue (an instance of ListType), not the type parameter of the ListType
     * @param items the items, having the type type.getFirstTypeParameter()
     */
    constructor(type, items) {
        super(type);
        // TODO: assert items are of type type.getFirstTypeParameter()
        this.items = items;
    }
    static fromItems(items) {
        if (items.length == 0) {
            return new List(new types_1.TypePlaceholder(), []);
        }
        let typeParameter = items[0].getType();
        return new List(typeParameter, items);
    }
    getLength() {
        return this.items.length;
    }
    getItems() {
        return this.items;
    }
    valueOf() {
        return this.items.map((item) => item.valueOf());
    }
    equals(other) {
        if (this.getLength() != other.getLength()) {
            return false;
        }
        for (let i = 0; i < this.getLength(); i++) {
            let selfItem = this.items[i];
            let otherItem = other.items[i];
            if (!selfItem.equals(otherItem)) {
                return false;
            }
        }
        return true;
    }
}
exports.List = List;
//# sourceMappingURL=generic.js.map