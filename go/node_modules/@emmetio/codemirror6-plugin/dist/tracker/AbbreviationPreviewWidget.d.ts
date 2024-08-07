import type { EmmetPreviewConfig } from '../lib/config';
export interface HTMLElementPreview extends HTMLElement {
    update?: (value: string) => void;
}
export declare function createPreview(value: string, syntax: string, options?: EmmetPreviewConfig): HTMLElementPreview;
