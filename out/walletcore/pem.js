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
exports.parse = exports.parseValidatorKeys = exports.parseValidatorKey = exports.parseUserKeys = exports.parseUserKey = void 0;
const errors = __importStar(require("../errors"));
const userKeys_1 = require("./userKeys");
const validatorKeys_1 = require("./validatorKeys");
function parseUserKey(text, index = 0) {
    let keys = parseUserKeys(text);
    return keys[index];
}
exports.parseUserKey = parseUserKey;
function parseUserKeys(text) {
    // The user PEM files encode both the seed and the pubkey in their payloads.
    let buffers = parse(text, userKeys_1.USER_SEED_LENGTH + userKeys_1.USER_PUBKEY_LENGTH);
    return buffers.map(buffer => new userKeys_1.UserSecretKey(buffer.slice(0, userKeys_1.USER_SEED_LENGTH)));
}
exports.parseUserKeys = parseUserKeys;
function parseValidatorKey(text, index = 0) {
    let keys = parseValidatorKeys(text);
    return keys[index];
}
exports.parseValidatorKey = parseValidatorKey;
function parseValidatorKeys(text) {
    let buffers = parse(text, validatorKeys_1.VALIDATOR_SECRETKEY_LENGTH);
    return buffers.map(buffer => new validatorKeys_1.ValidatorSecretKey(buffer));
}
exports.parseValidatorKeys = parseValidatorKeys;
function parse(text, expectedLength) {
    // Split by newlines, trim whitespace, then discard remaining empty lines.
    let lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    let buffers = [];
    let linesAccumulator = [];
    for (const line of lines) {
        if (line.startsWith("-----BEGIN")) {
            linesAccumulator = [];
        }
        else if (line.startsWith("-----END")) {
            let asBase64 = linesAccumulator.join("");
            let asHex = Buffer.from(asBase64, "base64").toString();
            let asBytes = Buffer.from(asHex, "hex");
            if (asBytes.length != expectedLength) {
                throw new errors.ErrBadPEM(`incorrect key length: expected ${expectedLength}, found ${asBytes.length}`);
            }
            buffers.push(asBytes);
            linesAccumulator = [];
        }
        else {
            linesAccumulator.push(line);
        }
    }
    if (linesAccumulator.length != 0) {
        throw new errors.ErrBadPEM("incorrect file structure");
    }
    return buffers;
}
exports.parse = parse;
//# sourceMappingURL=pem.js.map