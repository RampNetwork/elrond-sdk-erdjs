"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const __1 = require("..");
var Result;
(function (Result) {
    function isSuccess(result) {
        return result.getReturnCode().isSuccess();
    }
    Result.isSuccess = isSuccess;
    function assertSuccess(result) {
        if (result.isSuccess()) {
            return;
        }
        throw new __1.ErrContract(`${result.getReturnCode()}: ${result.getReturnMessage()}`);
    }
    Result.assertSuccess = assertSuccess;
    function outputTyped(result) {
        result.assertSuccess();
        let endpointDefinition = result.getEndpointDefinition();
        __1.guardValueIsSet("endpointDefinition", endpointDefinition);
        let buffers = result.outputUntyped();
        let values = new __1.ArgSerializer().buffersToValues(buffers, endpointDefinition.output);
        return values;
    }
    Result.outputTyped = outputTyped;
    function unpackOutput(result) {
        let values = result.outputTyped().map((value) => value === null || value === void 0 ? void 0 : value.valueOf());
        if (values.length <= 1) {
            return values[0];
        }
        return values;
    }
    Result.unpackOutput = unpackOutput;
})(Result = exports.Result || (exports.Result = {}));
//# sourceMappingURL=result.js.map