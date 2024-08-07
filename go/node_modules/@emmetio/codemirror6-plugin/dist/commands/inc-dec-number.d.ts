import type { StateCommand } from '@codemirror/state';
export declare const incrementNumber1: StateCommand;
export declare const decrementNumber1: StateCommand;
export declare const incrementNumber01: StateCommand;
export declare const decrementNumber01: StateCommand;
export declare const incrementNumber10: StateCommand;
export declare const decrementNumber10: StateCommand;
/**
 * Check if given code is a number
 */
export declare function isNumber(code: number): boolean;
