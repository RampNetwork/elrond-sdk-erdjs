"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullType = exports.TypePlaceholder = exports.isTyped = exports.PrimitiveValue = exports.TypedValue = exports.CustomType = exports.PrimitiveType = exports.TypeCardinality = exports.Type = void 0;
const utils_1 = require("../../utils");
/**
 * An abstraction that represents a Type. Handles both generic and non-generic types.
 * Once instantiated as a Type, a generic type is "closed" (as opposed to "open").
 */
class Type {
    constructor(name, typeParameters = [], cardinality = TypeCardinality.fixed(1)) {
        utils_1.guardValueIsSet("name", name);
        this.name = name;
        this.typeParameters = typeParameters;
        this.cardinality = cardinality;
    }
    getName() {
        return this.name;
    }
    getTypeParameters() {
        return this.typeParameters;
    }
    isGenericType() {
        return this.typeParameters.length > 0;
    }
    getFirstTypeParameter() {
        utils_1.guardTrue(this.typeParameters.length > 0, "type parameters length > 0");
        return this.typeParameters[0];
    }
    /**
     * Generates type expressions similar to elrond-wasm-rs.
     */
    toString() {
        let typeParameters = this.getTypeParameters().map(type => type.toString()).join(", ");
        let typeParametersExpression = typeParameters ? `<${typeParameters}>` : "";
        return `${this.name}${typeParametersExpression}`;
    }
    equals(other) {
        return Type.equals(this, other);
    }
    static equals(a, b) {
        // Workaround that seems to always work properly. Most probable reasons: 
        // - ES6 is quite strict about enumerating over the properties on an object.
        // - toJSON() returns an object literal (most probably, this results in deterministic iteration in all browser implementations).
        let aJson = JSON.stringify(a.toJSON());
        let bJson = JSON.stringify(b.toJSON());
        return aJson == bJson;
    }
    static equalsMany(a, b) {
        return a.every((type, i) => type.equals(b[i]));
    }
    static isAssignableFromMany(a, b) {
        return a.every((type, i) => type.isAssignableFrom(b[i]));
    }
    differs(other) {
        return !this.equals(other);
    }
    valueOf() {
        return this.name;
    }
    /**
     * Inspired from: https://docs.microsoft.com/en-us/dotnet/api/system.type.isassignablefrom
     * For (most) generics, type invariance is expected (assumed) - neither covariance, nor contravariance are supported yet (will be supported in a next release).
     *
     * One exception though: for {@link OptionType}, we simulate covariance for missing (not provided) values.
     * For example, Option<u32> is assignable from Option<?>.
     * For more details, see the implementation of {@link OptionType}.
     *
     * Also see:
     *  - https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)
     *  - https://docs.microsoft.com/en-us/dotnet/standard/generics/covariance-and-contravariance
     */
    isAssignableFrom(type) {
        let invariantTypeParameters = Type.equalsMany(this.getTypeParameters(), type.getTypeParameters());
        return type instanceof this.constructor && invariantTypeParameters;
    }
    /**
     * Converts the account to a pretty, plain JavaScript object.
     */
    toJSON() {
        return {
            name: this.name,
            typeParameters: this.typeParameters.map(item => item.toJSON())
        };
    }
    getCardinality() {
        return this.cardinality;
    }
}
exports.Type = Type;
/**
 * TODO: Simplify this class, keep only what is needed.
 *
 * An abstraction for defining and operating with the cardinality of a (composite or simple) type.
 *
 * Simple types (the ones that are directly encodable) have a fixed cardinality: [lower = 1, upper = 1].
 * Composite types (not directly encodable) do not follow this constraint. For example:
 *  - VarArgs: [lower = 0, upper = *]
 *  - OptionalResult: [lower = 0, upper = 1]
 */
class TypeCardinality {
    constructor(lowerBound, upperBound) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }
    static fixed(value) {
        return new TypeCardinality(value, value);
    }
    static variable(value) {
        return new TypeCardinality(0, value);
    }
    isSingular() {
        return this.lowerBound == 1 && this.upperBound == 1;
    }
    isSingularOrNone() {
        return this.lowerBound == 0 && this.upperBound == 1;
    }
    isComposite() {
        return !this.isSingular();
    }
    isFixed() {
        return this.lowerBound == this.upperBound;
    }
    getLowerBound() {
        return this.lowerBound;
    }
    getUpperBound() {
        return this.upperBound || TypeCardinality.MaxCardinality;
    }
}
exports.TypeCardinality = TypeCardinality;
/**
 * An arbitrarily chosen, reasonably large number.
 */
TypeCardinality.MaxCardinality = 4096;
class PrimitiveType extends Type {
    constructor(name) {
        super(name);
    }
}
exports.PrimitiveType = PrimitiveType;
class CustomType extends Type {
}
exports.CustomType = CustomType;
class TypedValue {
    constructor(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
}
exports.TypedValue = TypedValue;
class PrimitiveValue extends TypedValue {
    constructor(type) {
        super(type);
    }
}
exports.PrimitiveValue = PrimitiveValue;
function isTyped(value) {
    return value instanceof TypedValue;
}
exports.isTyped = isTyped;
class TypePlaceholder extends Type {
    constructor() {
        super("...");
    }
}
exports.TypePlaceholder = TypePlaceholder;
class NullType extends Type {
    constructor() {
        super("?");
    }
}
exports.NullType = NullType;
//# sourceMappingURL=types.js.map