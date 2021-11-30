/// <reference types="node" />
import { UserSecretKey } from "./userKeys";
import { ValidatorSecretKey } from "./validatorKeys";
export declare function parseUserKey(text: string, index?: number): UserSecretKey;
export declare function parseUserKeys(text: string): UserSecretKey[];
export declare function parseValidatorKey(text: string, index?: number): ValidatorSecretKey;
export declare function parseValidatorKeys(text: string): ValidatorSecretKey[];
export declare function parse(text: string, expectedLength: number): Buffer[];
