import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "./src/editor.mjs",
  output: {
    file: "./src/editor.js",
    format: "iife",
    name: 'kodeWeave'
  },
  plugins: [nodeResolve()],
};