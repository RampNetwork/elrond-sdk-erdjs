"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMethods = void 0;
function generateMethods(this_, abi, endpointHandler) {
    let generated = {};
    for (const endpoint of abi.getAllEndpoints()) {
        generated[endpoint.name] = endpointHandler.bind(this_, endpoint);
    }
    return generated;
}
exports.generateMethods = generateMethods;
//# sourceMappingURL=generateMethods.js.map