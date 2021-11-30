/// <reference types="node" />
export declare class Randomness {
    salt: Buffer;
    iv: Buffer;
    id: string;
    constructor(init?: Partial<Randomness>);
}
