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
exports.Hash = void 0;
const errors = __importStar(require("./errors"));
class Hash {
    /**
     * Creates a new Hash object.
     *
     * @param hash The hash, as a Buffer or a hex-encoded string.
     */
    constructor(hash) {
        if (!hash) {
            this.hash = Buffer.from([]);
        }
        else if (hash instanceof Buffer) {
            this.hash = hash;
        }
        else if (typeof hash === "string") {
            this.hash = Buffer.from(hash, "hex");
        }
        else {
            throw new errors.ErrBadType("hash", "buffer | string", hash);
        }
    }
    static empty() {
        return new Hash(Buffer.from([]));
    }
    /**
     * Returns whether the hash is empty (not computed).
     */
    isEmpty() {
        return this.hash.length == 0;
    }
    toString() {
        return this.hash.toString("hex");
    }
    valueOf() {
        return this.hash;
    }
}
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map