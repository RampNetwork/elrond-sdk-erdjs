/// <reference types="node" />
import { Type, TypedValue } from "../typesystem";
export declare class BinaryCodec {
    readonly constraints: BinaryCodecConstraints;
    private readonly optionCodec;
    private readonly listCodec;
    private readonly primitiveCodec;
    private readonly structCodec;
    private readonly tupleCodec;
    private readonly enumCodec;
    constructor(constraints?: BinaryCodecConstraints | null);
    decodeTopLevel<TResult extends TypedValue = TypedValue>(buffer: Buffer, type: Type): TResult;
    decodeNested<TResult extends TypedValue = TypedValue>(buffer: Buffer, type: Type): [TResult, number];
    encodeNested(typedValue: TypedValue): Buffer;
    encodeTopLevel(typedValue: TypedValue): Buffer;
}
export declare class BinaryCodecConstraints {
    maxBufferLength: number;
    maxListLength: number;
    constructor(init?: Partial<BinaryCodecConstraints>);
    checkBufferLength(buffer: Buffer): void;
    /**
     * This constraint avoids computer-freezing decode bugs (e.g. due to invalid ABI or struct definitions).
     */
    checkListLength(length: number): void;
}
