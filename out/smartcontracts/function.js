"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractFunction = void 0;
const errors = __importStar(require("../errors"));
/**
 * A function of a Smart Contract, as an abstraction.
 */
class ContractFunction {
    /**
     * Creates a ContractFunction object, given its name.
     *
     * @param name the name of the function
     */
    constructor(name) {
        this.name = name;
        if (name == null) {
            throw new errors.ErrInvalidFunctionName();
        }
    }
    /**
     * Null-object pattern: creates an empty ContractFunction object.
     */
    static none() {
        return new ContractFunction("untitled");
    }
    /**
     * Returns the name of the function.
     */
    toString() {
        return this.name;
    }
    valueOf() {
        return this.name;
    }
    equals(other) {
        if (!other) {
            return false;
        }
        return this.name == other.name;
    }
}
exports.ContractFunction = ContractFunction;
//# sourceMappingURL=function.js.map