import { StructType } from "./struct";
import { ContractInterface } from "./contractInterface";
import { CustomType } from "./types";
import { EnumType } from "./enum";
export declare class AbiRegistry {
    readonly interfaces: ContractInterface[];
    readonly customTypes: CustomType[];
    /**
     * Convenience factory function to load ABIs (from files or URLs).
     * This function will also remap ABI types to know types (on best-efforts basis).
     */
    static load(json: {
        files?: string[];
        urls?: string[];
    }): Promise<AbiRegistry>;
    /**
     * Generally, one should use {@link AbiRegistry.load} instead.
     */
    extendFromFile(file: string): Promise<AbiRegistry>;
    /**
     * Generally, one should use {@link AbiRegistry.load} instead.
     */
    extendFromUrl(url: string): Promise<AbiRegistry>;
    extend(json: {
        name: string;
        endpoints: any[];
        types: any[];
    }): AbiRegistry;
    private createCustomType;
    getInterface(name: string): ContractInterface;
    getInterfaces(names: string[]): ContractInterface[];
    getStruct(name: string): StructType;
    getStructs(names: string[]): StructType[];
    getEnum(name: string): EnumType;
    getEnums(names: string[]): EnumType[];
    /**
     * Right after loading ABI definitions into a registry (e.g. from a file), the endpoints and the custom types (structs, enums)
     * use raw types for their I/O parameters (in the case of endpoints), or for their fields (in the case of structs).
     *
     * A raw type is merely an instance of {@link Type}, with a given name and type parameters (if it's a generic type).
     *
     * Though, for most (development) purposes, we'd like to operate using known, specific types (e.g. {@link List}, {@link U8Type} etc.).
     * This function increases the specificity of the types used by parameter / field definitions within a registry (on best-efforts basis).
     * The result is an equivalent, more explicit ABI registry.
     */
    remapToKnownTypes(): AbiRegistry;
}
