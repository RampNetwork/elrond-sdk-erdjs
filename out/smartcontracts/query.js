"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.MaxUint64 = void 0;
const function_1 = require("./function");
const balance_1 = require("../balance");
const address_1 = require("../address");
const utils_1 = require("../utils");
const argSerializer_1 = require("./argSerializer");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.MaxUint64 = new bignumber_js_1.default("18446744073709551615");
class Query {
    constructor(init) {
        this.caller = new address_1.Address();
        this.address = new address_1.Address();
        this.func = function_1.ContractFunction.none();
        this.args = [];
        this.value = balance_1.Balance.Zero();
        Object.assign(this, init);
        utils_1.guardValueIsSet("address", this.address);
        utils_1.guardValueIsSet("func", this.func);
        this.address.assertNotEmpty();
        this.args = this.args || [];
        this.caller = this.caller || new address_1.Address();
        this.value = this.value || balance_1.Balance.Zero();
    }
    toHttpRequest() {
        let request = {
            "scAddress": this.address.bech32(),
            "funcName": this.func.toString(),
            "args": new argSerializer_1.ArgSerializer().valuesToStrings(this.args),
            "value": this.value.toString()
        };
        if (!this.caller.isEmpty()) {
            request["caller"] = this.caller.bech32();
        }
        return request;
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map