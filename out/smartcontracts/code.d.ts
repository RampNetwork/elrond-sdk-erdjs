/// <reference types="node" />
import { PathLike } from "fs";
/**
 * Bytecode of a Smart Contract, as an abstraction.
 */
export declare class Code {
    private readonly hex;
    private constructor();
    /**
     * Creates a Code object from a buffer (sequence of bytes).
     */
    static fromBuffer(code: Buffer): Code;
    /**
     * Creates a Code object by loading the bytecode from a specified WASM file.
     */
    static fromFile(file: PathLike): Promise<Code>;
    /**
     * Creates a Code object by loading the bytecode from a specified URL (WASM file).
     */
    static fromUrl(url: string): Promise<Code>;
    /**
     * Null-object pattern: creates an empty Code object.
     */
    static nothing(): Code;
    /**
     * Returns the bytecode as a hex-encoded string.
     */
    toString(): string;
}
