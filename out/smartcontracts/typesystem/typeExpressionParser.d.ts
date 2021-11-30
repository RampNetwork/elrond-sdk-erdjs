import { Type } from "./types";
export declare class TypeExpressionParser {
    parse(expression: string): Type;
    private doParse;
    /**
     * Converts a raw type expression to a JSON, parsing-friendly format.
     * This is a workaround, so that the parser implementation is simpler (thus we actually rely on the JSON parser).
     *
     * @param expression a string such as:
     *
     * ```
     *  - Option<List<Address>>
     *  - VarArgs<MultiArg2<bytes, Address>>
     *  - MultiResultVec<MultiResult2<Address, u64>
     * ```
     */
    private getJsonedString;
    private nodeToType;
}
