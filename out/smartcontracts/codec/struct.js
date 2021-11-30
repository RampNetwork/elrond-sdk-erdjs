"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
class StructBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
    }
    decodeTopLevel(buffer, type) {
        let [decoded, length] = this.decodeNested(buffer, type);
        return decoded;
    }
    decodeNested(buffer, type) {
        let originalBuffer = buffer;
        let offset = 0;
        let fieldDefinitions = type.fields;
        let fields = [];
        for (const fieldDefinition of fieldDefinitions) {
            let [decoded, decodedLength] = this.binaryCodec.decodeNested(buffer, fieldDefinition.type);
            let field = new typesystem_1.StructField(decoded, fieldDefinition.name);
            fields.push(field);
            offset += decodedLength;
            buffer = originalBuffer.slice(offset);
        }
        let struct = new typesystem_1.Struct(type, fields);
        return [struct, offset];
    }
    encodeNested(struct) {
        let buffers = [];
        let fields = struct.getFields();
        for (const field of fields) {
            let fieldBuffer = this.binaryCodec.encodeNested(field.value);
            buffers.push(fieldBuffer);
        }
        let buffer = Buffer.concat(buffers);
        return buffer;
    }
    encodeTopLevel(struct) {
        return this.encodeNested(struct);
    }
}
exports.StructBinaryCodec = StructBinaryCodec;
//# sourceMappingURL=struct.js.map