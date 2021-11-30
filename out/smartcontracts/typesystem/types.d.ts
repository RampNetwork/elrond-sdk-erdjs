/**
 * An abstraction that represents a Type. Handles both generic and non-generic types.
 * Once instantiated as a Type, a generic type is "closed" (as opposed to "open").
 */
export declare class Type {
    private readonly name;
    private readonly typeParameters;
    protected readonly cardinality: TypeCardinality;
    constructor(name: string, typeParameters?: Type[], cardinality?: TypeCardinality);
    getName(): string;
    getTypeParameters(): Type[];
    isGenericType(): boolean;
    getFirstTypeParameter(): Type;
    /**
     * Generates type expressions similar to elrond-wasm-rs.
     */
    toString(): string;
    equals(other: Type): boolean;
    static equals(a: Type, b: Type): boolean;
    static equalsMany(a: Type[], b: Type[]): boolean;
    static isAssignableFromMany(a: Type[], b: Type[]): boolean;
    differs(other: Type): boolean;
    valueOf(): string;
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
    isAssignableFrom(type: Type): boolean;
    /**
     * Converts the account to a pretty, plain JavaScript object.
     */
    toJSON(): any;
    getCardinality(): TypeCardinality;
}
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
export declare class TypeCardinality {
    /**
     * An arbitrarily chosen, reasonably large number.
     */
    private static MaxCardinality;
    private readonly lowerBound;
    private readonly upperBound?;
    private constructor();
    static fixed(value: number): TypeCardinality;
    static variable(value?: number): TypeCardinality;
    isSingular(): boolean;
    isSingularOrNone(): boolean;
    isComposite(): boolean;
    isFixed(): boolean;
    getLowerBound(): number;
    getUpperBound(): number;
}
export declare class PrimitiveType extends Type {
    constructor(name: string);
}
export declare abstract class CustomType extends Type {
}
export declare abstract class TypedValue {
    private readonly type;
    constructor(type: Type);
    getType(): Type;
    abstract equals(other: any): boolean;
    abstract valueOf(): any;
}
export declare abstract class PrimitiveValue extends TypedValue {
    constructor(type: Type);
}
export declare function isTyped(value: any): boolean;
export declare class TypePlaceholder extends Type {
    constructor();
}
export declare class NullType extends Type {
    constructor();
}
