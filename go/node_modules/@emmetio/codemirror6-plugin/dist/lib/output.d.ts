import type { Options } from 'emmet';
import type { EditorState, Line } from '@codemirror/state';
export default function getOutputOptions(state: EditorState, inline?: boolean): Partial<Options>;
/**
 * Produces tabstop for CodeMirror editor
 */
export declare function field(index: number, placeholder?: string): string;
/**
 * Returns indentation of given line
 */
export declare function lineIndent(line: Line): string;
/**
 * Returns token used for single indentation in given editor
 */
export declare function getIndentation(state: EditorState): string;
