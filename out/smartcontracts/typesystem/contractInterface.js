"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractInterface = void 0;
const utils_1 = require("../../utils");
const endpoint_1 = require("./endpoint");
const NamePlaceholder = "?";
/**
 * An Interace represents a (sub)set of endpoints (with their signatures included) defined by a contract.
 */
class ContractInterface {
    constructor(name, constructor_definition, endpoints) {
        this.endpoints = [];
        this.name = name;
        this.constructorDefinition = constructor_definition;
        this.endpoints = endpoints;
    }
    static fromJSON(json) {
        json.name = json.name || NamePlaceholder;
        json.endpoints = json.endpoints || [];
        let constructorDefinition = constructorFromJSON(json);
        let endpoints = json.endpoints.map(item => endpoint_1.EndpointDefinition.fromJSON(item));
        return new ContractInterface(json.name, constructorDefinition, endpoints);
    }
    getConstructorDefinition() {
        return this.constructorDefinition;
    }
    getEndpoint(name) {
        let result = this.endpoints.find(e => e.name == name);
        utils_1.guardValueIsSet("result", result);
        return result;
    }
}
exports.ContractInterface = ContractInterface;
function constructorFromJSON(json) {
    if (json.constructor.inputs === undefined || json.constructor.outputs === undefined) {
        return null;
    }
    // the name will be missing, so we add it manually
    let constructorWithName = Object.assign({ name: "constructor" }, json.constructor);
    return endpoint_1.EndpointDefinition.fromJSON(constructorWithName);
}
//# sourceMappingURL=contractInterface.js.map