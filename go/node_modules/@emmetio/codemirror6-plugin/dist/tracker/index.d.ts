import type { UserConfig } from 'emmet';
import { EditorView } from '@codemirror/view';
import type { EditorState, Extension, StateCommand } from '@codemirror/state';
import type { CompletionSource } from '@codemirror/autocomplete';
import type { AbbreviationError, RangeObject } from '../lib/types';
import { type EmmetConfig } from '../lib/config';
declare type AbbreviationTracker = AbbreviationTrackerValid | AbbreviationTrackerError;
export declare const emmetCompletionSource: CompletionSource;
interface AbbreviationTrackerBase {
    /** Range in editor for abbreviation */
    range: RangeObject;
    /** Actual abbreviation, tracked by current tracker */
    abbreviation: string;
    /**
     * Abbreviation was forced, e.g. must remain in editor even if empty or contains
     * invalid abbreviation
     */
    forced: boolean;
    /** Indicates that current tracker shouldn’t be displayed in editor */
    inactive: boolean;
    /**
     * Relative offset from range start where actual abbreviation starts.
     * Used tp handle prefixes in abbreviation
     */
    offset: number;
    config: UserConfig;
}
export interface AbbreviationTrackerValid extends AbbreviationTrackerBase {
    type: 'abbreviation';
    /**
     * Abbreviation is simple, e.g. contains single element.
     * It’s suggested to not display preview for simple abbreviation
     */
    simple: boolean;
    /** Preview of expanded abbreviation */
    preview: string;
}
export interface AbbreviationTrackerError extends AbbreviationTrackerBase {
    type: 'error';
    error: AbbreviationError;
}
export declare const JSX_PREFIX = "<";
declare const resetTracker: import("@codemirror/state").StateEffectType<null>;
export declare const enterAbbreviationMode: StateCommand;
export declare function expandTracker(view: EditorView, tracker: AbbreviationTracker): void;
/**
 * A factory function that creates abbreviation tracker for known syntaxes.
 * When user starts typing, it detects whether user writes abbreviation and
 * if so, starts tracking by displaying an underline. Then if user hit Tab key
 * when cursor is inside tracked abbreviation, it will expand it. Or user can
 * press Escape key to reset tracker
 */
export default function tracker(options?: Partial<EmmetConfig>): Extension[];
export { resetTracker as trackerResetAction };
/**
 * Check if abbreviation tracking is allowed in editor at given location
 */
export declare function allowTracking(state: EditorState): boolean;
/**
 * Detects and returns valid abbreviation activation context for given location
 * in editor which can be used for abbreviation expanding.
 * For example, in given HTML code:
 * `<div title="Sample" style="">Hello world</div>`
 * it’s not allowed to expand abbreviations inside `<div ...>` or `</div>`,
 * yet it’s allowed inside `style` attribute and between tags.
 *
 * This method ensures that given `pos` is inside location allowed for expanding
 * abbreviations and returns context data about it.
 */
export declare function getActivationContext(state: EditorState, pos: number): UserConfig | undefined;
export declare function canDisplayPreview(state: EditorState, tracker: AbbreviationTracker): boolean;
