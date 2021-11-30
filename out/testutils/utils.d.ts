/// <reference types="node" />
import { PathLike } from "fs";
import { Code } from "../smartcontracts/code";
import { AbiRegistry } from "../smartcontracts/typesystem";
export declare function loadContractCode(path: PathLike): Promise<Code>;
export declare function loadAbiRegistry(paths: PathLike[]): Promise<AbiRegistry>;
export declare function extendAbiRegistry(registry: AbiRegistry, path: PathLike): Promise<AbiRegistry>;
export declare function setupUnitTestWatcherTimeouts(): void;
