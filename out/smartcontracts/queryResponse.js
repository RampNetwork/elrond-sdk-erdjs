"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResponse = void 0;
const networkParams_1 = require("../networkParams");
const query_1 = require("./query");
const returnCode_1 = require("./returnCode");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const result_1 = require("./result");
class QueryResponse {
    constructor(init) {
        this.returnData = (init === null || init === void 0 ? void 0 : init.returnData) || [];
        this.returnCode = (init === null || init === void 0 ? void 0 : init.returnCode) || returnCode_1.ReturnCode.Unknown;
        this.returnMessage = (init === null || init === void 0 ? void 0 : init.returnMessage) || "";
        this.gasUsed = (init === null || init === void 0 ? void 0 : init.gasUsed) || networkParams_1.GasLimit.min();
    }
    /**
     * Constructs a QueryResponse object from a HTTP response (as returned by the provider).
     */
    static fromHttpResponse(payload) {
        let returnData = payload["returnData"] || payload["ReturnData"];
        let returnCode = payload["returnCode"] || payload["ReturnCode"];
        let returnMessage = payload["returnMessage"] || payload["ReturnMessage"];
        let gasRemaining = new bignumber_js_1.default(payload["gasRemaining"] || payload["GasRemaining"] || 0);
        let gasUsed = new networkParams_1.GasLimit(query_1.MaxUint64.minus(gasRemaining).toNumber());
        return new QueryResponse({
            returnData: returnData,
            returnCode: new returnCode_1.ReturnCode(returnCode),
            returnMessage: returnMessage,
            gasUsed: gasUsed,
        });
    }
    getEndpointDefinition() {
        return this.endpointDefinition;
    }
    getReturnCode() {
        return this.returnCode;
    }
    getReturnMessage() {
        return this.returnMessage;
    }
    unpackOutput() {
        return result_1.Result.unpackOutput(this);
    }
    assertSuccess() {
        result_1.Result.assertSuccess(this);
    }
    isSuccess() {
        return this.returnCode.isSuccess();
    }
    setEndpointDefinition(endpointDefinition) {
        this.endpointDefinition = endpointDefinition;
    }
    outputUntyped() {
        this.assertSuccess();
        let buffers = this.returnData.map((item) => Buffer.from(item || "", "base64"));
        return buffers;
    }
    outputTyped() {
        return result_1.Result.outputTyped(this);
    }
    /**
     * Converts the object to a pretty, plain JavaScript object.
     */
    toJSON() {
        return {
            success: this.isSuccess(),
            returnData: this.returnData,
            returnCode: this.returnCode,
            returnMessage: this.returnMessage,
            gasUsed: this.gasUsed.valueOf(),
        };
    }
}
exports.QueryResponse = QueryResponse;
//# sourceMappingURL=queryResponse.js.map