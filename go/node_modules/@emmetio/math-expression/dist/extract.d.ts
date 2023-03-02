export interface ExtractOptions {
    /**
     * Allow capturing extra expression characters right after start position.
     * Useful for extracting expressions from text editor source which inserts
     * paired characters like `(` and `)` to properly extract expression past
     * caret position
     */
    lookAhead: boolean;
    /**
     * Allow whitespace in extracted expressions
     */
    whitespace: boolean;
}
export default function extract(text: string, pos?: number, options?: Partial<ExtractOptions>): [number, number] | null;
