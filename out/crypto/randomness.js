"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Randomness = void 0;
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const uuid_1 = require("uuid");
const crypto = require("crypto");
class Randomness {
    constructor(init) {
        this.salt = (init === null || init === void 0 ? void 0 : init.salt) || Buffer.from(tweetnacl_1.default.randomBytes(32));
        this.iv = (init === null || init === void 0 ? void 0 : init.iv) || Buffer.from(tweetnacl_1.default.randomBytes(16));
        this.id = (init === null || init === void 0 ? void 0 : init.id) || uuid_1.v4({ random: crypto.randomBytes(16) });
    }
}
exports.Randomness = Randomness;
//# sourceMappingURL=randomness.js.map