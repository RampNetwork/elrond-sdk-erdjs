import { EndpointDefinition } from "./endpoint";
/**
 * An Interace represents a (sub)set of endpoints (with their signatures included) defined by a contract.
 */
export declare class ContractInterface {
    readonly name: string;
    readonly constructorDefinition: EndpointDefinition | null;
    readonly endpoints: EndpointDefinition[];
    constructor(name: string, constructor_definition: EndpointDefinition | null, endpoints: EndpointDefinition[]);
    static fromJSON(json: {
        name: string;
        constructor: any;
        endpoints: any[];
    }): ContractInterface;
    getConstructorDefinition(): EndpointDefinition | null;
    getEndpoint(name: string): EndpointDefinition;
}
