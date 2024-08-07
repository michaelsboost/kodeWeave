import type { EditorState } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';
import type { RangeObject } from './types';
/** Characters to indicate tab stop start and end in generated snippet */
export declare const tabStopStart: string;
export declare const tabStopEnd: string;
export declare const stateKey = "$$emmet";
export interface AbbrError {
    message: string;
    pos: number;
}
export declare type DisposeFn = () => void;
export interface EmmetState {
    id: string;
    tracker?: DisposeFn | null;
    tagMatch?: DisposeFn | null;
}
/**
 * Returns copy of region which starts and ends at non-space character
 */
export declare function narrowToNonSpace(state: EditorState, range: RangeObject): RangeObject;
/**
 * Returns current caret position for single selection
 */
export declare function getCaret(state: EditorState): number;
/**
 * Returns contents of given range or node
 */
export declare function substr(state: EditorState, range: RangeObject): string;
/**
 * Check if given range or syntax name contains given position
 */
export declare function contains(range: RangeObject, pos: number): boolean;
/**
 * Returns range of full CSS declaration
 */
export declare function fullCSSDeclarationRange(node: SyntaxNode): RangeObject;
export declare function isQuote(ch: string | undefined): boolean;
/**
 * Returns own (unquoted) attribute value range
 */
export declare function getAttributeValueRange(state: EditorState, node: RangeObject): RangeObject;
/**
 * Returns given HTML element’s attributes as map
 */
export declare function getTagAttributes(state: EditorState, node: SyntaxNode): Record<string, string | null>;
export declare function isSpace(ch: string): boolean;
export declare function htmlEscape(str: string): string;
/**
 * Check if `a` and `b` contains the same range
 */
export declare function rangesEqual(a: RangeObject, b: RangeObject): boolean;
/**
 * Check if range `a` fully contains range `b`
 */
export declare function rangeContains(a: RangeObject, b: RangeObject): boolean;
/**
 * Check if given range is empty
 */
export declare function rangeEmpty(r: RangeObject): boolean;
/**
 * Returns last element in given array
 */
export declare function last<T>(arr: T[]): T | undefined;
/**
 * Finds and collects selections ranges from given snippet
 */
export declare function getSelectionsFromSnippet(snippet: string, base?: number): {
    ranges: RangeObject[];
    snippet: string;
};
