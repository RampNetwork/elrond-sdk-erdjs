import { Type, CustomType } from "./types";
export declare class TypeMapper {
    private readonly openTypesConstructors;
    private readonly closedTypesMap;
    constructor(customTypes?: CustomType[]);
    mapType(type: Type): Type;
    feedCustomType(type: Type): void;
    private mapStructType;
    private mapGenericType;
}
