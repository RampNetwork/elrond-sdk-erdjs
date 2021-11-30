"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeValue = exports.CompositeType = void 0;
const utils_1 = require("../../utils");
const types_1 = require("./types");
class CompositeType extends types_1.Type {
    constructor(...typeParameters) {
        super("Composite", typeParameters, types_1.TypeCardinality.variable(typeParameters.length));
    }
}
exports.CompositeType = CompositeType;
class CompositeValue extends types_1.TypedValue {
    constructor(type, items) {
        super(type);
        utils_1.guardLength(items, type.getTypeParameters().length);
        // TODO: assert type of each item (wrt. type.getTypeParameters()).
        this.items = items;
    }
    static fromItems(...items) {
        let typeParameters = items.map(value => value.getType());
        let type = new CompositeType(...typeParameters);
        return new CompositeValue(type, items);
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
exports.CompositeValue = CompositeValue;
//# sourceMappingURL=composite.js.map