"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumValue = exports.EnumVariantDefinition = exports.EnumType = void 0;
const utils_1 = require("../../utils");
const types_1 = require("./types");
const SimpleEnumMaxDiscriminant = 256;
class EnumType extends types_1.CustomType {
    constructor(name, variants) {
        super(name);
        this.variants = [];
        this.variants = variants;
    }
    static fromJSON(json) {
        let variants = (json.variants || []).map(variant => EnumVariantDefinition.fromJSON(variant));
        return new EnumType(json.name, variants);
    }
    getVariantByDiscriminant(discriminant) {
        let result = this.variants.find(e => e.discriminant == discriminant);
        utils_1.guardValueIsSet("result", result);
        return result;
    }
    getVariantByName(name) {
        let result = this.variants.find(e => e.name == name);
        utils_1.guardValueIsSet("result", result);
        return result;
    }
}
exports.EnumType = EnumType;
class EnumVariantDefinition {
    constructor(name, discriminant) {
        utils_1.guardTrue(discriminant < SimpleEnumMaxDiscriminant, `discriminant for simple enum should be less than ${SimpleEnumMaxDiscriminant}`);
        this.name = name;
        this.discriminant = discriminant;
    }
    static fromJSON(json) {
        return new EnumVariantDefinition(json.name, json.discriminant);
    }
}
exports.EnumVariantDefinition = EnumVariantDefinition;
class EnumValue extends types_1.TypedValue {
    constructor(type, variant) {
        super(type);
        this.name = variant.name;
        this.discriminant = variant.discriminant;
    }
    static fromName(type, name) {
        let variant = type.getVariantByName(name);
        return new EnumValue(type, variant);
    }
    static fromDiscriminant(type, discriminant) {
        let variant = type.getVariantByDiscriminant(discriminant);
        return new EnumValue(type, variant);
    }
    equals(other) {
        if (!this.getType().equals(other.getType())) {
            return false;
        }
        return this.name == other.name && this.discriminant == other.discriminant;
    }
    valueOf() {
        return this.name;
    }
}
exports.EnumValue = EnumValue;
//# sourceMappingURL=enum.js.map