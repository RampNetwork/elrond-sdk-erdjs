"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesBinaryCodec = void 0;
const bytes_1 = require("../typesystem/bytes");
const constants_1 = require("./constants");
/**
 * Encodes and decodes "BytesValue" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
class BytesBinaryCodec {
    decodeNested(buffer) {
        let length = buffer.readUInt32BE();
        let payload = buffer.slice(constants_1.SizeOfU32, constants_1.SizeOfU32 + length);
        let result = new bytes_1.BytesValue(payload);
        return [result, constants_1.SizeOfU32 + length];
    }
    decodeTopLevel(buffer) {
        return new bytes_1.BytesValue(buffer);
    }
    encodeNested(bytes) {
        let lengthBuffer = Buffer.alloc(constants_1.SizeOfU32);
        lengthBuffer.writeUInt32BE(bytes.getLength());
        let buffer = Buffer.concat([lengthBuffer, bytes.valueOf()]);
        return buffer;
    }
    encodeTopLevel(bytes) {
        return bytes.valueOf();
    }
}
exports.BytesBinaryCodec = BytesBinaryCodec;
//# sourceMappingURL=bytes.js.map