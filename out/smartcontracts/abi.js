"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractAbi = void 0;
const errors_1 = require("../errors");
const testutils_1 = require("../testutils");
const utils_1 = require("../utils");
const function_1 = require("./function");
class SmartContractAbi {
    constructor(registry, implementsInterfaces) {
        this.interfaces = [];
        this.interfaces.push(...registry.getInterfaces(implementsInterfaces));
    }
    static fromAbiPath(abiPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let abiRegistry = yield testutils_1.loadAbiRegistry([abiPath]);
            let interfaceNames = abiRegistry.interfaces.map(iface => iface.name);
            return new SmartContractAbi(abiRegistry, interfaceNames);
        });
    }
    getAllEndpoints() {
        let endpoints = [];
        for (const iface of this.interfaces) {
            endpoints.push(...iface.endpoints);
        }
        return endpoints;
    }
    getEndpoint(name) {
        if (name instanceof function_1.ContractFunction) {
            name = name.name;
        }
        let result = this.getAllEndpoints().find(item => item.name === name);
        utils_1.guardValueIsSet("result", result);
        return result;
    }
    getConstructorDefinition() {
        let constructors = [];
        for (const iface of this.interfaces) {
            let constructor_definition = iface.getConstructorDefinition();
            if (constructor_definition !== null) {
                constructors.push(constructor_definition);
            }
        }
        switch (constructors.length) {
            case 0:
                return null;
            case 1:
                return constructors[0];
            default:
                throw new errors_1.ErrInvariantFailed(`Found more than 1 constructor (found ${constructors.length})`);
        }
    }
}
exports.SmartContractAbi = SmartContractAbi;
//# sourceMappingURL=abi.js.map