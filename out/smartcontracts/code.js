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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
/**
 * Bytecode of a Smart Contract, as an abstraction.
 */
class Code {
    constructor(hex) {
        this.hex = hex;
    }
    /**
     * Creates a Code object from a buffer (sequence of bytes).
     */
    static fromBuffer(code) {
        return new Code(code.toString("hex"));
    }
    /**
     * Creates a Code object by loading the bytecode from a specified WASM file.
     */
    static fromFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let buffer = yield fs.promises.readFile(file);
            return Code.fromBuffer(buffer);
        });
    }
    /**
     * Creates a Code object by loading the bytecode from a specified URL (WASM file).
     */
    static fromUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default.get(url, {
                responseType: 'arraybuffer',
                transformResponse: [],
                headers: {
                    "Accept": "application/wasm"
                }
            });
            let buffer = Buffer.from(response.data);
            return Code.fromBuffer(buffer);
        });
    }
    /**
     * Null-object pattern: creates an empty Code object.
     */
    static nothing() {
        return new Code("");
    }
    /**
     * Returns the bytecode as a hex-encoded string.
     */
    toString() {
        return this.hex;
    }
}
exports.Code = Code;
//# sourceMappingURL=code.js.map