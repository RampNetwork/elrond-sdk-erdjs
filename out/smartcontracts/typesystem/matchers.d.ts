import { Type, PrimitiveType, PrimitiveValue } from "./types";
export declare function onTypeSelect<TResult>(type: Type, selectors: {
    onOption: () => TResult;
    onList: () => TResult;
    onPrimitive: () => TResult;
    onStruct: () => TResult;
    onTuple: () => TResult;
    onEnum: () => TResult;
    onOther?: () => TResult;
}): TResult;
export declare function onTypedValueSelect<TResult>(value: any, selectors: {
    onPrimitive: () => TResult;
    onOption: () => TResult;
    onList: () => TResult;
    onStruct: () => TResult;
    onTuple: () => TResult;
    onEnum: () => TResult;
    onOther?: () => TResult;
}): TResult;
export declare function onPrimitiveValueSelect<TResult>(value: PrimitiveValue, selectors: {
    onBoolean: () => TResult;
    onNumerical: () => TResult;
    onAddress: () => TResult;
    onBytes: () => TResult;
    onH256: () => TResult;
    onTypeIdentifier: () => TResult;
    onOther?: () => TResult;
}): TResult;
export declare function onPrimitiveTypeSelect<TResult>(type: PrimitiveType, selectors: {
    onBoolean: () => TResult;
    onNumerical: () => TResult;
    onAddress: () => TResult;
    onBytes: () => TResult;
    onH256: () => TResult;
    onTokenIndetifier: () => TResult;
    onOther?: () => TResult;
}): TResult;
