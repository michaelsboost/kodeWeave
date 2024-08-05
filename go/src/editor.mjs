import { EditorView, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap, foldAll, unfoldAll} from '@codemirror/language';
import { history, undo, redo, indentWithTab, indentMore, indentLess, defaultKeymap, historyKeymap, toggleComment} from '@codemirror/commands';
import { openSearchPanel, gotoLine, highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { html } from "@codemirror/lang-html";
import { css } from '@codemirror/lang-css';
import { colorPicker } from '@replit/codemirror-css-color-picker';
import { javascript, esLint } from "@codemirror/lang-javascript";
import { expandAbbreviation } from '@emmetio/codemirror6-plugin';
import { abbreviationTracker } from '@emmetio/codemirror6-plugin';

const config = {
  // eslint configuration
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    semi: ["error", "never"],
  },
};
const basicSetup = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    {
      key: "Tab",
      run: indentMore
    },
  ])
];

// Global object to store editor instances and active editor
window.editorManager = {
  htmlEditor: null,
  cssEditor: null,
  jsEditor: null,
  activeEditor: null,
  setMode(preprocessor, editor) {
    const newExtensions = getEditorExtensions(preprocessor);
  
    // Create a new EditorState with the new extensions
    const newState = EditorState.create({
      doc: editor.state.doc, // Preserve the current document content
      extensions: newExtensions // Apply new extensions
    });
  
    // Update the editor state with the new extensions
    editor.dispatch({
      effects: EditorView.updateListener.of((v) => {
        // Preserve the update listener and other features
      }),
      // Replace the state with the new state containing updated extensions
      state: newState
    });
  }
};

// Helper functions to set and get the active editor
window.setActiveEditor = function(editor) {
  window.editorManager.activeEditor = editor;
};
window.getActiveEditor = function() {
  return window.editorManager.activeEditor;
};

// init editors
function getEditorExtensions(preprocessor) {
  // Common setup for all editors
  const commonKeymap = keymap.of([
    indentWithTab,
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap
  ]);

  // Specific keymap for expandAbbreviation
  const htmlMarkdownKeymap = keymap.of([
    { key: "Enter", run: expandAbbreviation },
    indentWithTab,
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap
  ]);

  // Common setup for all editors
  const extensions = [
    ...basicSetup,
    EditorView.lineWrapping,
    commonKeymap,
    colorPicker,
    abbreviationTracker()
  ];
  const htmlExtensions = [
    ...basicSetup,
    EditorView.lineWrapping,
    htmlMarkdownKeymap,
    colorPicker,
    abbreviationTracker()
  ];

  // Add specific extensions based on the preprocessor type
  switch (preprocessor) {
    case 'html':
    case 'markdown':
      return [
        ...htmlExtensions,
        preprocessor === 'html' ? html() : markdown({ base: markdownLanguage, codeLanguages: [] })
      ];
    case 'css':
      return [
        ...extensions,
        css()
      ];
    case 'javascript':
      return [
        ...extensions,
        javascript()
      ];
    case 'typescript':
      return [
        ...extensions,
        javascript({ typescript: true })
      ];
    case 'babel':
      return [
        ...extensions,
        javascript({ jsx: true })
      ];
    case 'jsxtypescript':
      return [
        ...extensions,
        javascript({ jsx: true, typescript: true })
      ];
    case 'none':
      return extensions; // No additional extensions
    default:
      console.warn(`Unknown preprocessor type: ${preprocessor}`);
      return extensions;
  }
}

function initEditors() {
  const htmlEditor = new EditorView({
    state: EditorState.create({
      doc: project.html,
      extensions: [
        ...getEditorExtensions(project.html_pre_processor),
        EditorView.updateListener.of((v) => {
          if (window.editorManager.activeEditor !== htmlEditor) window.setActiveEditor(htmlEditor);
          const newHtml = htmlEditor.state.doc.toString();
          if (project.html !== newHtml) project.html = newHtml;
        }),
      ],
    }),
    docChanged: true,
    parent: document.getElementById('htmlEditor'),
    allowMultipleSelections: true,
  });
  const cssEditor = new EditorView({
    state: EditorState.create({
      doc: project.css,
      extensions: [
        ...getEditorExtensions(project.css_pre_processor),
        EditorView.updateListener.of((v) => {
          if (data.activeEditor !== 'css') window.setActiveEditor(cssEditor);
          const newCSS = cssEditor.state.doc.toString();
          if (project.css !== newCSS) project.css = newCSS;
        }),
      ],
    }),
    docChanged: true,
    parent: document.getElementById('cssEditor'),
    allowMultipleSelections: true,
  });
  const jsEditor = new EditorView({
    state: EditorState.create({
      doc: project.javascript,
      extensions: [
        ...getEditorExtensions(project.javascript_pre_processor),
        EditorView.updateListener.of((v) => {
          if (data.activeEditor !== 'javascript') window.setActiveEditor(jsEditor);
          const newJS = jsEditor.state.doc.toString();
          if (project.javascript !== newJS) project.javascript = newJS;
        }),
      ],
    }),
    docChanged: true,
    parent: document.getElementById('jsEditor'),
    allowMultipleSelections: true,
  });

  // Store editor instances in the global object
  window.editorManager.htmlEditor = htmlEditor;
  window.editorManager.cssEditor = cssEditor;
  window.editorManager.jsEditor = jsEditor;

  // Set the default active editor
  window.setActiveEditor(htmlEditor);
}

// editor functions
function dispatchChanges(editor, content) {
  editor.dispatch({
    changes: {
      from: 0,
      to: editor.state.doc.toString().length,
      insert: content,
    },
  });
}

// Command functions
window.editorCommand = async function(string) {
  if (string === "indent") indentMore(getActiveEditor());
  if (string === "outdent") indentLess(getActiveEditor());
  if (string === "goto") gotoLine(getActiveEditor());
  if (string === "undo") undo(getActiveEditor());
  if (string === "redo") redo(getActiveEditor());
  if (string === "search") openSearchPanel(getActiveEditor());
  if (string === "toggleComment") toggleComment(getActiveEditor());
  if (string === "foldAll") foldAll(getActiveEditor());
  if (string === "unfoldAll") unfoldAll(getActiveEditor());
  if (string === "cut") cutSelection(getActiveEditor());
  if (string === "copy") copySelection(getActiveEditor());
  if (string === "paste") pasteText(getActiveEditor());
  if (string === "selectAll") selectAll(getActiveEditor());
};
    
// Function to cut the selected text
const cutSelection = editor => {
  const { state, dispatch } = editor;
  const { selection } = state;
  const selectedText = state.sliceDoc(selection.main.from, selection.main.to);
  navigator.clipboard.writeText(selectedText);
  dispatch(state.update({
    changes: { from: selection.main.from, to: selection.main.to, insert: '' }
  }));
};

// Function to copy the selected text
const copySelection = editor => {
  const { state } = editor;
  const { selection } = state;
  const selectedText = state.sliceDoc(selection.main.from, selection.main.to);
  navigator.clipboard.writeText(selectedText);
};

// Function to paste text at the cursor position
const pasteText = async editor => {
  const { state, dispatch } = editor;
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      const { selection } = state;
      dispatch(state.update({ changes: { from: selection.main.from, to: selection.main.to, insert: text } }));
    } else {
      console.log('Clipboard is empty or does not contain text.');
    }
  } catch (error) {
    console.error('Failed to paste text:', error);
  }
};

// Function to select all text in the active editor
const selectAll = editor => {
  const { state, dispatch } = editor;
  const { doc } = state;
  const selection = { anchor: 0, head: doc.length };
  dispatch(state.update({ selection }));
};

// Make functions available in global space
window.initEditors = initEditors;
window.dispatchChanges = dispatchChanges;
window.indentMore = indentMore;
window.indentLess = indentLess;
window.gotoLine = gotoLine;
window.undo = undo;
window.redo = redo;
window.openSearchPanel = openSearchPanel;
window.toggleComment = toggleComment;
window.foldAll = foldAll;
window.unfoldAll = unfoldAll;
window.cutSelection = cutSelection;
window.copySelection = copySelection;
window.pasteText = pasteText;
window.selectAll = selectAll;
window.getEditorExtensions = getEditorExtensions;