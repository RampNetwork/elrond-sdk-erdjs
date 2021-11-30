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
exports.StructField = exports.Struct = exports.StructFieldDefinition = exports.StructType = void 0;
const errors = __importStar(require("../../errors"));
const typeExpressionParser_1 = require("./typeExpressionParser");
const types_1 = require("./types");
class StructType extends types_1.CustomType {
    constructor(name, fields) {
        super(name);
        this.fields = [];
        this.fields = fields;
    }
    static fromJSON(json) {
        let fields = (json.fields || []).map(field => StructFieldDefinition.fromJSON(field));
        return new StructType(json.name, fields);
    }
}
exports.StructType = StructType;
// TODO: Perhaps rename to FieldDefinition and extract to separate file, fields.ts?
class StructFieldDefinition {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
    static fromJSON(json) {
        let parsedType = new typeExpressionParser_1.TypeExpressionParser().parse(json.type);
        return new StructFieldDefinition(json.name, json.description, parsedType);
    }
}
exports.StructFieldDefinition = StructFieldDefinition;
// TODO: implement setField(), convenience method.
// TODO: Hold fields in a map (by name), and use the order within "field definitions" to perform codec operations.
class Struct extends types_1.TypedValue {
    /**
     * Currently, one can only set fields at initialization time. Construction will be improved at a later time.
     */
    constructor(type, fields) {
        super(type);
        this.fields = [];
        this.fields = fields;
        this.checkTyping();
    }
    checkTyping() {
        let fields = this.fields;
        let type = this.getType();
        let definitions = type.fields;
        if (fields.length != definitions.length) {
            throw new errors.ErrStructTyping("fields length vs. field definitions length");
        }
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            let definition = definitions[i];
            let fieldType = field.value.getType();
            let definitionType = definition.type;
            if (!fieldType.equals(definitionType)) {
                throw new errors.ErrStructTyping(`check type of field "${definition.name}; expected: ${definitionType}, actual: ${fieldType}"`);
            }
            if (field.name != definition.name) {
                throw new errors.ErrStructTyping(`check name of field "${definition.name}"`);
            }
        }
    }
    getFields() {
        return this.fields;
    }
    valueOf() {
        let result = {};
        for (const field of this.fields) {
            result[field.name] = field.value.valueOf();
        }
        return result;
    }
    equals(other) {
        if (!this.getType().equals(other.getType())) {
            return false;
        }
        let selfFields = this.getFields();
        let otherFields = other.getFields();
        if (selfFields.length != otherFields.length) {
            return false;
        }
        for (let i = 0; i < selfFields.length; i++) {
            let selfField = selfFields[i];
            let otherField = otherFields[i];
            if (!selfField.equals(otherField)) {
                return false;
            }
        }
        return true;
    }
}
exports.Struct = Struct;
// TODO: Perhaps rename to Field and extract to separate file, fields.ts?
class StructField {
    constructor(value, name = "") {
        this.value = value;
        this.name = name;
    }
    equals(other) {
        return this.name == other.name && this.value.equals(other.value);
    }
}
exports.StructField = StructField;
//# sourceMappingURL=struct.js.map