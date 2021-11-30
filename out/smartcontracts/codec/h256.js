"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.H256BinaryCodec = void 0;
const h256_1 = require("../typesystem/h256");
class H256BinaryCodec {
    /**
     * Reads and decodes a H256Value from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeNested(buffer) {
        // We don't check the size of the buffer, we just read 32 bytes.
        let slice = buffer.slice(0, 32);
        return [new h256_1.H256Value(slice), 32];
    }
    /**
     * Reads and decodes a H256Value from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeTopLevel(buffer) {
        let [decoded, length] = this.decodeNested(buffer);
        return decoded;
    }
    /**
     * Encodes a H256Value to a buffer.
     */
    encodeNested(primitive) {
        return primitive.valueOf();
    }
    /**
     * Encodes a H256Value to a buffer.
     */
    encodeTopLevel(primitive) {
        return primitive.valueOf();
    }
}
exports.H256BinaryCodec = H256BinaryCodec;
//# sourceMappingURL=h256.js.map