/// <reference types="node" />
import { Transaction } from "../transaction";
/**
 * Hides away the serialization complexity, for each type of object (e.g. transactions).
 
 * The implementation is non-generic, but practical: there's a pair of `serialize` / `deserialize` method for each type of object.
 */
export declare class ProtoSerializer {
    /**
     * Serializes a Transaction object to a Buffer. Handles low-level conversion logic and field-mappings as well.
     */
    serializeTransaction(transaction: Transaction): Buffer;
    /**
     * Custom serialization, compatible with elrond-go.
     */
    private serializeBalance;
    deserializeTransaction(_buffer: Buffer): Transaction;
}
