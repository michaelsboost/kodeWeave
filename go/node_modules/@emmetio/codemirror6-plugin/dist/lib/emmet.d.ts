import type { EditorState } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';
import type { UserConfig, AbbreviationContext, ExtractedAbbreviation, ExtractOptions, MarkupAbbreviation, StylesheetAbbreviation, SyntaxType } from 'emmet';
import type { ContextTag } from './types';
export interface ExtractedAbbreviationWithContext extends ExtractedAbbreviation {
    context?: AbbreviationContext;
    inline?: boolean;
}
export declare const JSX_PREFIX = "<";
/**
 * Expands given abbreviation into code snippet
 */
export declare function expand(state: EditorState, abbr: string | MarkupAbbreviation | StylesheetAbbreviation, config?: UserConfig): string;
/**
 * Extracts abbreviation from given source code by detecting actual syntax context.
 * For example, if host syntax is HTML, it tries to detect if location is inside
 * embedded CSS.
 *
 * It also detects if abbreviation is allowed at given location: HTML tags,
 * CSS selectors may not contain abbreviations.
 * @param code Code from which abbreviation should be extracted
 * @param pos Location at which abbreviation should be expanded
 * @param type Syntax of abbreviation to expand
 */
export declare function extract(code: string, pos: number, type?: SyntaxType, options?: Partial<ExtractOptions>): ExtractedAbbreviation | undefined;
/**
 * Returns matched HTML/XML tag for given point in view
 */
export declare function getTagContext(state: EditorState, pos: number): ContextTag | undefined;
export declare function getTagName(state: EditorState, node: SyntaxNode): string;
/**
 * Returns Emmet options for given character location in editor
 */
export declare function getOptions(state: EditorState, pos: number): UserConfig;
export declare function resetCache(): void;
