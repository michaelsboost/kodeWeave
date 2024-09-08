import type { EditorState } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';
import type { CSSContext, CSSMatch, HTMLContext, RangeObject } from './types';
interface InlineProp {
    name: RangeObject;
    value?: RangeObject;
}
export declare function getContext(state: EditorState, pos: number): HTMLContext | CSSContext | undefined;
/**
 * Returns CSS context for given location in source code
 */
export declare function getCSSContext(state: EditorState, pos: number, embedded?: RangeObject): CSSContext<CSSMatch>;
export declare function getHTMLContext(state: EditorState, pos: number): HTMLContext;
/**
 * Returns range of CSS selector from given rule block
 */
export declare function getSelectorRange(node: SyntaxNode): RangeObject;
/**
 * Returns CSS property name and value ranges.
 * @param node The `name: Declaration` node
 */
export declare function getPropertyRanges(node: SyntaxNode): {
    name: RangeObject | undefined;
    value: RangeObject | undefined;
};
/**
 * Returns context for inline CSS
 */
export declare function getInlineCSSContext(code: string, pos: number, base?: number): CSSContext;
export declare function parseInlineProps(code: string, limit?: number): InlineProp[];
export {};
