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
exports.Tuple = exports.TupleType = void 0;
const errors = __importStar(require("../../errors"));
const struct_1 = require("./struct");
const struct_2 = require("./struct");
class TupleType extends struct_2.StructType {
    constructor(...typeParameters) {
        super(TupleType.prepareName(typeParameters), TupleType.prepareFieldDefinitions(typeParameters));
    }
    static prepareName(typeParameters) {
        let fields = typeParameters.map(type => type.toString()).join(", ");
        let result = `tuple${fields.length}<${fields}>`;
        return result;
    }
    static prepareFieldDefinitions(typeParameters) {
        let result = typeParameters.map((type, i) => new struct_1.StructFieldDefinition(prepareFieldName(i), "anonymous tuple field", type));
        return result;
    }
}
exports.TupleType = TupleType;
function prepareFieldName(fieldIndex) {
    return `field${fieldIndex}`;
}
// TODO: Perhaps add a common base class for Struct and Tuple, called FieldsHolder?
// Or let Tuple be the base class, but have Struct as a specialization of it, "named tuple"?
// Or leave as it is?
class Tuple extends struct_1.Struct {
    constructor(type, fields) {
        super(type, fields);
    }
    static fromItems(items) {
        if (items.length < 1) {
            // TODO: Define a better error.
            throw new errors.ErrTypingSystem("bad tuple items");
        }
        let fieldsTypes = items.map(item => item.getType());
        let tupleType = new TupleType(...fieldsTypes);
        let fields = items.map((item, i) => new struct_1.StructField(item, prepareFieldName(i)));
        return new Tuple(tupleType, fields);
    }
}
exports.Tuple = Tuple;
//# sourceMappingURL=tuple.js.map