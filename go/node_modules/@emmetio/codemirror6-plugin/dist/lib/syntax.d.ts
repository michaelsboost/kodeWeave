import type { SyntaxType, AbbreviationContext } from 'emmet';
import type { EditorState } from '@codemirror/state';
import type { HTMLContext, CSSContext } from './types';
export interface SyntaxInfo {
    type: SyntaxType;
    syntax?: string;
    inline?: boolean;
    context?: HTMLContext | CSSContext;
}
export interface StylesheetRegion {
    range: [number, number];
    syntax: string;
    inline?: boolean;
}
export interface SyntaxCache {
    stylesheetRegions?: StylesheetRegion[];
}
/**
 * Returns Emmet syntax info for given location in view.
 * Syntax info is an abbreviation type (either 'markup' or 'stylesheet') and syntax
 * name, which is used to apply syntax-specific options for output.
 *
 * By default, if given location doesn’t match any known context, this method
 * returns `null`, but if `fallback` argument is provided, it returns data for
 * given fallback syntax
 */
export declare function syntaxInfo(state: EditorState, ctx?: number | HTMLContext | CSSContext): SyntaxInfo;
/**
 * Returns main editor syntax
 */
export declare function docSyntax(state: EditorState): string;
/**
 * Returns Emmet abbreviation type for given syntax
 */
export declare function getSyntaxType(syntax?: string): SyntaxType;
/**
 * Check if given syntax is XML dialect
 */
export declare function isXML(syntax?: string): boolean;
/**
 * Check if given syntax is HTML dialect (including XML)
 */
export declare function isHTML(syntax?: string): boolean;
/**
 * Check if given syntax name is supported by Emmet
 */
export declare function isSupported(syntax: string): boolean;
/**
 * Check if given syntax is a CSS dialect. Note that it’s not the same as stylesheet
 * syntax: for example, SASS is a stylesheet but not CSS dialect (but SCSS is)
 */
export declare function isCSS(syntax?: string): boolean;
/**
 * Check if given syntax is JSX dialect
 */
export declare function isJSX(syntax?: string): boolean;
/**
 * Returns context for Emmet abbreviation from given HTML context
 */
export declare function getMarkupAbbreviationContext(state: EditorState, ctx: HTMLContext): AbbreviationContext | undefined;
/**
 * Returns context for Emmet abbreviation from given CSS context
 */
export declare function getStylesheetAbbreviationContext(ctx: CSSContext): AbbreviationContext;
