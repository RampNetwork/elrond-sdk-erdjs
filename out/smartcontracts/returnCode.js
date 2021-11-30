"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnCode = void 0;
class ReturnCode {
    constructor(text) {
        this.text = text;
    }
    static fromBuffer(buffer) {
        let text = buffer.toString();
        return new ReturnCode(text);
    }
    toString() {
        return this.text;
    }
    valueOf() {
        return this.text;
    }
    equals(other) {
        if (!other) {
            return false;
        }
        return this.text == other.text;
    }
    isSuccess() {
        return this.equals(ReturnCode.Ok) || this.equals(ReturnCode.None);
    }
}
exports.ReturnCode = ReturnCode;
ReturnCode.None = new ReturnCode("");
ReturnCode.Ok = new ReturnCode("ok");
ReturnCode.FunctionNotFound = new ReturnCode("function not found");
ReturnCode.FunctionWrongSignature = new ReturnCode("wrong signature for function");
ReturnCode.ContractNotFound = new ReturnCode("contract not found");
ReturnCode.UserError = new ReturnCode("user error");
ReturnCode.OutOfGas = new ReturnCode("out of gas");
ReturnCode.AccountCollision = new ReturnCode("account collision");
ReturnCode.OutOfFunds = new ReturnCode("out of funds");
ReturnCode.CallStackOverFlow = new ReturnCode("call stack overflow");
ReturnCode.ContractInvalid = new ReturnCode("contract invalid");
ReturnCode.ExecutionFailed = new ReturnCode("execution failed");
ReturnCode.Unknown = new ReturnCode("unknown");
//# sourceMappingURL=returnCode.js.map