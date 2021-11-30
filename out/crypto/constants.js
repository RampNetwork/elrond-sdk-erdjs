"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDerivationFunction = exports.DigestAlgorithm = exports.CipherAlgorithm = exports.Version = void 0;
// In a future PR, improve versioning infrastructure for key-file objects in erdjs.
exports.Version = 4;
exports.CipherAlgorithm = "aes-128-ctr";
exports.DigestAlgorithm = "sha256";
exports.KeyDerivationFunction = "scrypt";
//# sourceMappingURL=constants.js.map