import Scanner from '@emmetio/scanner';
export declare const enum TokenType {
    Number = "num",
    Op1 = "op1",
    Op2 = "op2",
    Null = "null"
}
export declare const enum Operator {
    Plus = 43,
    Minus = 45,
    Multiply = 42,
    Divide = 47,
    IntDivide = 92,
    LeftParenthesis = 40,
    RightParenthesis = 41,
    Dot = 46
}
export interface Token {
    type: TokenType;
    value: number;
    priority: number;
}
export declare const nullary: Token;
/**
 * Parses given expression in forward direction
 */
export default function parse(expr: string | Scanner): Token[] | null;
export declare function isSign(ch: number): boolean;
export declare function isOperator(ch: number): ch is Operator;
export declare function token(type: TokenType, value: number, priority?: number): Token;
