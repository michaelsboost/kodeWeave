import Scanner from '@emmetio/scanner';
import parse, { Token } from './parser';
export { default as extract, ExtractOptions } from './extract';
/**
 * Evaluates given math expression
 * @param expr Expression to evaluate
 */
export default function evaluate(expr: string | Scanner | Token[]): number | null;
export { parse, Token };
