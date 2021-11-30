"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TupleBinaryCodec = void 0;
const struct_1 = require("./struct");
class TupleBinaryCodec {
    constructor(binaryCodec) {
        this.structCodec = new struct_1.StructBinaryCodec(binaryCodec);
    }
    decodeTopLevel(buffer, type) {
        return this.structCodec.decodeTopLevel(buffer, type);
    }
    decodeNested(buffer, type) {
        return this.structCodec.decodeNested(buffer, type);
    }
    encodeNested(struct) {
        return this.structCodec.encodeNested(struct);
    }
    encodeTopLevel(struct) {
        return this.structCodec.encodeTopLevel(struct);
    }
}
exports.TupleBinaryCodec = TupleBinaryCodec;
//# sourceMappingURL=tuple.js.map