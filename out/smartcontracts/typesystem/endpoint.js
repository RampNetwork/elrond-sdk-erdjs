"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointParameterDefinition = exports.EndpointModifiers = exports.EndpointDefinition = void 0;
const typeExpressionParser_1 = require("./typeExpressionParser");
const NamePlaceholder = "?";
const DescriptionPlaceholder = "N / A";
class EndpointDefinition {
    constructor(name, input, output, modifiers) {
        this.input = [];
        this.output = [];
        this.name = name;
        this.input = input || [];
        this.output = output || [];
        this.modifiers = modifiers;
    }
    isConstructor() {
        return this.name == "constructor";
    }
    static fromJSON(json) {
        json.name = json.name == null ? NamePlaceholder : json.name;
        json.payableInTokens = json.payableInTokens || [];
        json.inputs = json.inputs || [];
        json.outputs = json.outputs || [];
        let input = json.inputs.map(param => EndpointParameterDefinition.fromJSON(param));
        let output = json.outputs.map(param => EndpointParameterDefinition.fromJSON(param));
        let modifiers = new EndpointModifiers(json.storageModifier, json.payableInTokens);
        return new EndpointDefinition(json.name, input, output, modifiers);
    }
}
exports.EndpointDefinition = EndpointDefinition;
class EndpointModifiers {
    constructor(storageModifier, payableInTokens) {
        this.storageModifier = storageModifier || "";
        this.payableInTokens = payableInTokens || [];
    }
    isPayableInEGLD() {
        return this.isPayableInToken("EGLD");
    }
    isPayableInToken(token) {
        if (this.payableInTokens.includes(token)) {
            return true;
        }
        if (this.payableInTokens.includes(`!${token}`)) {
            return false;
        }
        if (this.payableInTokens.includes("*")) {
            return true;
        }
        return false;
    }
    isPayable() {
        return this.payableInTokens.length != 0;
    }
    isReadonly() {
        return this.storageModifier == "readonly";
    }
}
exports.EndpointModifiers = EndpointModifiers;
class EndpointParameterDefinition {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
    static fromJSON(json) {
        let parsedType = new typeExpressionParser_1.TypeExpressionParser().parse(json.type);
        return new EndpointParameterDefinition(json.name || NamePlaceholder, json.description || DescriptionPlaceholder, parsedType);
    }
}
exports.EndpointParameterDefinition = EndpointParameterDefinition;
//# sourceMappingURL=endpoint.js.map