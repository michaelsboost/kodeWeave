# Math expression parser and evaluator

Fast and small (less than 2KB minified and gzipped) zero-dependency math expression parser and evaluator.

```js
import evaluate from '@emmetio/math-expression';

console.log(evaluate('2 * (-3 + 5)')); // 4
```

## Motivation

In JavaScript, you can use built-in `eval()` function to evaluate expressions:

```js
console.log(eval('2 * (-3 + 5)')); // 4
```

But in most modern JavaScript environments `eval()` function is considered harmful since it can evaluate _any_ arbitrary JS code. And in some cases (like in [Atom](https://atom.io) editor) it’s disabled by default due to security reasons.

With `@emmetio/math-expression` module you can safely parse & evaluate basic math expressions in any JS environment.

## Extract expression from text

This module is used by [Emmet](https://emmet.io) project to evaluate math expression in-place in code source. A default user workflow is to enter math expression somewhere in source code and run action to evaluate it. You can use `extract` function to extract math expression from given source code, starting at specified position:

```js
import evaluate, { extract } from '@emmetio/math-expression';

const code = 'Here goes math: 2 + 3 foo bar';
const [start, end] = extract(code, 21); // 16, 21
const expr = code.substring(start, end); // 2 + 3
console.log(evaluate(expr)); // 5
```
