import Scanner, { isWhiteSpace, isNumber, isSpace } from '@emmetio/scanner';

const nullary = token("null" /* Null */, 0);
/**
 * Parses given expression in forward direction
 */
function parse(expr) {
    const scanner = typeof expr === 'string' ? new Scanner(expr) : expr;
    let ch;
    let priority = 0;
    let expected = (1 /* Primary */ | 4 /* LParen */ | 16 /* Sign */);
    const tokens = [];
    while (!scanner.eof()) {
        scanner.eatWhile(isWhiteSpace);
        scanner.start = scanner.pos;
        if (consumeNumber(scanner)) {
            if ((expected & 1 /* Primary */) === 0) {
                error('Unexpected number', scanner);
            }
            tokens.push(number(scanner.current()));
            expected = (2 /* Operator */ | 8 /* RParen */);
        }
        else if (isOperator(scanner.peek())) {
            ch = scanner.next();
            if (isSign(ch) && (expected & 16 /* Sign */)) {
                if (isNegativeSign(ch)) {
                    tokens.push(op1(ch, priority));
                }
                expected = (1 /* Primary */ | 4 /* LParen */ | 16 /* Sign */);
            }
            else {
                if ((expected & 2 /* Operator */) === 0) {
                    error('Unexpected operator', scanner);
                }
                tokens.push(op2(ch, priority));
                expected = (1 /* Primary */ | 4 /* LParen */ | 16 /* Sign */);
            }
        }
        else if (scanner.eat(40 /* LeftParenthesis */)) {
            if ((expected & 4 /* LParen */) === 0) {
                error('Unexpected "("', scanner);
            }
            priority += 10;
            expected = (1 /* Primary */ | 4 /* LParen */ | 16 /* Sign */ | 32 /* NullaryCall */);
        }
        else if (scanner.eat(41 /* RightParenthesis */)) {
            priority -= 10;
            if (expected & 32 /* NullaryCall */) {
                tokens.push(nullary);
            }
            else if ((expected & 8 /* RParen */) === 0) {
                error('Unexpected ")"', scanner);
            }
            expected = (2 /* Operator */ | 8 /* RParen */ | 4 /* LParen */);
        }
        else {
            error('Unknown character', scanner);
        }
    }
    if (priority < 0 || priority >= 10) {
        error('Unmatched "()"', scanner);
    }
    const result = orderTokens(tokens);
    if (result === null) {
        error('Parity', scanner);
    }
    return result;
}
/**
 * Consumes number from given stream
 * @return Returns `true` if number was consumed
 */
function consumeNumber(scanner) {
    const start = scanner.pos;
    if (scanner.eat(46 /* Dot */) && scanner.eatWhile(isNumber)) {
        // short decimal notation: .025
        return true;
    }
    if (scanner.eatWhile(isNumber) && (!scanner.eat(46 /* Dot */) || scanner.eatWhile(isNumber))) {
        // either integer or decimal: 10, 10.25
        return true;
    }
    scanner.pos = start;
    return false;
}
/**
 * Orders parsed tokens (operands and operators) in given array so that they are
 * laid off in order of execution
 */
function orderTokens(tokens) {
    const operators = [];
    const operands = [];
    let nOperators = 0;
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (t.type === "num" /* Number */) {
            operands.push(t);
        }
        else {
            nOperators += t.type === "op1" /* Op1 */ ? 1 : 2;
            while (operators.length) {
                if (t.priority <= operators[operators.length - 1].priority) {
                    operands.push(operators.pop());
                }
                else {
                    break;
                }
            }
            operators.push(t);
        }
    }
    return nOperators + 1 === operands.length + operators.length
        ? operands.concat(operators.reverse())
        : null /* parity */;
}
/**
 * Number token factory
 */
function number(value, priority) {
    return token("num" /* Number */, parseFloat(value), priority);
}
/**
 * Unary operator factory
 * @param value    Operator  character code
 * @param priority Operator execution priority
 */
function op1(value, priority = 0) {
    if (value === 45 /* Minus */) {
        priority += 2;
    }
    return token("op1" /* Op1 */, value, priority);
}
/**
 * Binary operator factory
 * @param value Operator  character code
 * @param priority Operator execution priority
 */
function op2(value, priority = 0) {
    if (value === 42 /* Multiply */) {
        priority += 1;
    }
    else if (value === 47 /* Divide */ || value === 92 /* IntDivide */) {
        priority += 2;
    }
    return token("op2" /* Op2 */, value, priority);
}
function error(name, scanner) {
    if (scanner) {
        name += ` at column ${scanner.pos} of expression`;
    }
    throw new Error(name);
}
function isSign(ch) {
    return isPositiveSign(ch) || isNegativeSign(ch);
}
function isPositiveSign(ch) {
    return ch === 43 /* Plus */;
}
function isNegativeSign(ch) {
    return ch === 45 /* Minus */;
}
function isOperator(ch) {
    return ch === 43 /* Plus */ || ch === 45 /* Minus */ || ch === 42 /* Multiply */
        || ch === 47 /* Divide */ || ch === 92 /* IntDivide */;
}
function token(type, value, priority = 0) {
    return { type, value, priority };
}

const defaultOptions = {
    lookAhead: true,
    whitespace: true
};
function extract(text, pos = text.length, options) {
    const opt = Object.assign(Object.assign({}, defaultOptions), options);
    const scanner = { text, pos };
    let ch;
    if (opt.lookAhead && cur(scanner) === 41 /* RightParenthesis */) {
        // Basically, we should consume right parenthesis only with optional whitespace
        scanner.pos++;
        const len = text.length;
        while (scanner.pos < len) {
            ch = cur(scanner);
            if (ch !== 41 /* RightParenthesis */ && !(opt.whitespace && isSpace(ch))) {
                break;
            }
            scanner.pos++;
        }
    }
    const end = scanner.pos;
    let braces = 0;
    while (scanner.pos >= 0) {
        if (number$1(scanner)) {
            continue;
        }
        ch = prev(scanner);
        if (ch === 41 /* RightParenthesis */) {
            braces++;
        }
        else if (ch === 40 /* LeftParenthesis */) {
            if (!braces) {
                break;
            }
            braces--;
        }
        else if (!((opt.whitespace && isSpace(ch)) || isSign(ch) || isOperator(ch))) {
            break;
        }
        scanner.pos--;
    }
    if (scanner.pos !== end && !braces) {
        // Trim whitespace
        while (isSpace(cur(scanner))) {
            scanner.pos++;
        }
        return [scanner.pos, end];
    }
    return null;
}
/**
 * Backward-consumes number from given scanner, if possible
 */
function number$1(scanner) {
    if (isNumber(prev(scanner))) {
        scanner.pos--;
        let dot = false;
        let ch;
        while (scanner.pos >= 0) {
            ch = prev(scanner);
            if (ch === 46 /* . */) {
                if (dot) {
                    // Decimal delimiter already consumed, abort
                    break;
                }
                dot = true;
            }
            else if (!isNumber(ch)) {
                break;
            }
            scanner.pos--;
        }
        return true;
    }
    return false;
}
function prev(scanner) {
    return scanner.text.charCodeAt(scanner.pos - 1);
}
function cur(scanner) {
    return scanner.text.charCodeAt(scanner.pos);
}

const ops1 = {
    [45 /* Minus */]: num => -num
};
const ops2 = {
    [43 /* Plus */]: (a, b) => a + b,
    [45 /* Minus */]: (a, b) => a - b,
    [42 /* Multiply */]: (a, b) => a * b,
    [47 /* Divide */]: (a, b) => a / b,
    [92 /* IntDivide */]: (a, b) => Math.floor(a / b)
};
/**
 * Evaluates given math expression
 * @param expr Expression to evaluate
 */
function evaluate(expr) {
    if (!Array.isArray(expr)) {
        expr = parse(expr);
    }
    if (!expr || !expr.length) {
        return null;
    }
    const nStack = [];
    let n1;
    let n2;
    let f;
    for (let i = 0, il = expr.length; i < il; i++) {
        const token = expr[i];
        if (token.type === "num" /* Number */) {
            nStack.push(token.value);
        }
        else if (token.type === "op2" /* Op2 */) {
            n2 = nStack.pop();
            n1 = nStack.pop();
            f = ops2[token.value];
            nStack.push(f(n1, n2));
        }
        else if (token.type === "op1" /* Op1 */) {
            n1 = nStack.pop();
            f = ops1[token.value];
            nStack.push(f(n1));
        }
        else {
            throw new Error('Invalid expression');
        }
    }
    if (nStack.length > 1) {
        throw new Error('Invalid Expression (parity)');
    }
    return nStack[0];
}

export default evaluate;
export { extract, parse };
//# sourceMappingURL=math.es.js.map
