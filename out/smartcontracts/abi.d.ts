import { ContractFunction } from "./function";
import { AbiRegistry, EndpointDefinition } from "./typesystem";
export declare class SmartContractAbi {
    private readonly interfaces;
    constructor(registry: AbiRegistry, implementsInterfaces: string[]);
    static fromAbiPath(abiPath: string): Promise<SmartContractAbi>;
    getAllEndpoints(): EndpointDefinition[];
    getEndpoint(name: string | ContractFunction): EndpointDefinition;
    getConstructorDefinition(): EndpointDefinition | null;
}
