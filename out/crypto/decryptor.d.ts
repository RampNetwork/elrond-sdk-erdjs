/// <reference types="node" />
import { EncryptedData } from "./encryptedData";
export declare class Decryptor {
    static decrypt(data: EncryptedData, password: string): Buffer;
}
