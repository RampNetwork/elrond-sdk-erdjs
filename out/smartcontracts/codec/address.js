"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBinaryCodec = void 0;
const address_1 = require("../../address");
const typesystem_1 = require("../typesystem");
class AddressBinaryCodec {
    /**
     * Reads and decodes an AddressValue from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeNested(buffer) {
        // We don't check the size of the buffer, we just read 32 bytes.
        let slice = buffer.slice(0, 32);
        let value = new address_1.Address(slice);
        return [new typesystem_1.AddressValue(value), 32];
    }
    /**
     * Reads and decodes an AddressValue from a given buffer.
     *
     * @param buffer the input buffer
     */
    decodeTopLevel(buffer) {
        let [decoded, length] = this.decodeNested(buffer);
        return decoded;
    }
    /**
     * Encodes an AddressValue to a buffer.
     */
    encodeNested(primitive) {
        return primitive.valueOf().pubkey();
    }
    /**
     * Encodes an AddressValue to a buffer.
     */
    encodeTopLevel(primitive) {
        return primitive.valueOf().pubkey();
    }
}
exports.AddressBinaryCodec = AddressBinaryCodec;
//# sourceMappingURL=address.js.map