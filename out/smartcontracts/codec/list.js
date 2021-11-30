"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
const constants_1 = require("./constants");
/**
 * Encodes and decodes "List" objects
 * with respect to: {@link https://docs.elrond.com/developers/developer-reference/elrond-serialization-format/ | The Elrond Serialization Format}.
 */
class ListBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
    }
    decodeNested(buffer, type) {
        let typeParameter = type.getFirstTypeParameter();
        let result = [];
        let numItems = buffer.readUInt32BE();
        this.binaryCodec.constraints.checkListLength(numItems);
        let originalBuffer = buffer;
        let offset = constants_1.SizeOfU32;
        buffer = originalBuffer.slice(offset);
        for (let i = 0; i < numItems; i++) {
            let [decoded, decodedLength] = this.binaryCodec.decodeNested(buffer, typeParameter);
            result.push(decoded);
            offset += decodedLength;
            buffer = originalBuffer.slice(offset);
        }
        return [new typesystem_1.List(type, result), offset];
    }
    decodeTopLevel(buffer, type) {
        let typeParameter = type.getFirstTypeParameter();
        let result = [];
        let originalBuffer = buffer;
        let offset = 0;
        while (buffer.length > 0) {
            let [decoded, decodedLength] = this.binaryCodec.decodeNested(buffer, typeParameter);
            result.push(decoded);
            offset += decodedLength;
            buffer = originalBuffer.slice(offset);
            this.binaryCodec.constraints.checkListLength(result.length);
        }
        return new typesystem_1.List(type, result);
    }
    encodeNested(list) {
        this.binaryCodec.constraints.checkListLength(list.getLength());
        let lengthBuffer = Buffer.alloc(constants_1.SizeOfU32);
        lengthBuffer.writeUInt32BE(list.getLength());
        let itemsBuffers = [];
        for (const item of list.getItems()) {
            let itemBuffer = this.binaryCodec.encodeNested(item);
            itemsBuffers.push(itemBuffer);
        }
        let buffer = Buffer.concat([lengthBuffer, ...itemsBuffers]);
        return buffer;
    }
    encodeTopLevel(list) {
        this.binaryCodec.constraints.checkListLength(list.getLength());
        let itemsBuffers = [];
        for (const item of list.getItems()) {
            let itemBuffer = this.binaryCodec.encodeNested(item);
            itemsBuffers.push(itemBuffer);
        }
        let buffer = Buffer.concat(itemsBuffers);
        return buffer;
    }
}
exports.ListBinaryCodec = ListBinaryCodec;
//# sourceMappingURL=list.js.map