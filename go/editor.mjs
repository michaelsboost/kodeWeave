import { EditorView, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view'
import { EditorState, StateField, EditorSelection, StateEffect } from '@codemirror/state'
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap, foldAll, unfoldAll, syntaxTree, syntaxTreeAvailable } from '@codemirror/language'
import { history, undo, redo, indentWithTab, indentMore, indentLess, defaultKeymap, historyKeymap, toggleComment} from '@codemirror/commands'
import { openSearchPanel, gotoLine, highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { linter, lintKeymap, lintGutter } from '@codemirror/lint'
import { html } from "@codemirror/lang-html"
import { css, cssLanguage } from '@codemirror/lang-css'
import { javascript, esLint } from "@codemirror/lang-javascript"
import * as eslint from "eslint-linter-browserify"
import { expandAbbreviation } from '@emmetio/codemirror6-plugin'
import { abbreviationTracker } from '@emmetio/codemirror6-plugin'

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
  lintGutter(),
  keymap.of([
    {
      key: "Tab",
      run: indentMore
    },
    // Other key bindings...
  ])
];
let activeEditor;
const htmlEditor = new EditorView({
  state: EditorState.create({
    extensions: [
      basicSetup,
      EditorView.lineWrapping,
      keymap.of([
        {
          key: "Enter",
          run: expandAbbreviation
        },
          indentWithTab,
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap
      ]),
      html(),
      abbreviationTracker(),
      EditorView.updateListener.of((v) => {
        if (autoupdate.checked) {
          setTimeout(() => {
            app.updatePreview(autoupdate.checked);
          }, 300);
        }
      }),
    ],
  }),
  parent: document.getElementById('htmlEditor'),
  allowMultipleSelections: true,
});
const cssEditor = new EditorView({
  state: EditorState.create({
    extensions: [
      basicSetup,
      EditorView.lineWrapping,
      keymap.of([
        {
          key: "Enter",
          run: expandAbbreviation
        },
          indentWithTab,
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap
      ]),
      css(),
      abbreviationTracker(),
      EditorView.updateListener.of((v) => {
        if (autoupdate.checked) {
          setTimeout(() => {
            app.updatePreview(autoupdate.checked);
          }, 300);
        }
      }),
    ],
  }),
  parent: document.getElementById('cssEditor'),
  allowMultipleSelections: true,
});
const jsEditor = new EditorView({
  state: EditorState.create({
    extensions: [
      basicSetup, 
      EditorView.lineWrapping,
      keymap.of([
          indentWithTab,
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap
      ]),
      linter(esLint(new eslint.Linter(), config)),
      javascript(),
      EditorView.updateListener.of((v) => {
        if (autoupdate.checked) {
          setTimeout(() => {
            app.updatePreview(autoupdate.checked);
          }, 300);
        }
      }),
    ],
  }),
  parent: document.getElementById('jsEditor'),
  allowMultipleSelections: true,
});
activeEditor = htmlEditor;
let project;
let sortable;

const app = {
	// This is used to grab the active page and remember all contents used within that page's index
	activePage: 0,
  
  // ajax function to get source of a file
  getFile: (url, callback) => {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.send()
  
    xhr.onreadystatechange = (data) => {
      if (xhr.readyState !== 4) {
        return
      }
  
      if (xhr.status === 200) {
        callback(xhr.responseText)
      } else {
        console.warn("request_error")
      }
    }
  },

	// Function to update settings
	updateSettings: () => {
		let settings = project.settings;
		settings.theme = theme.checked;
		settings.fontSize = fz.value;
		settings.autoupdate = document.getElementById('autoupdate').checked;
		settings.console = toggleconsole.checked;
	},

  // Update localStorage
  updateStorage: () => {
    project.settings.autoupdate = autoupdate.checked;
    project.settings.console = toggleconsole.checked;
    project.settings.fontSize = fz.value;
    project.settings.theme = theme.checked;
    project.settings.scratchpad = scratchpad.value;
    
    project.pages[app.activePage].html = htmlEditor.state.doc.toString();
    project.pages[app.activePage].css = cssEditor.state.doc.toString();
    project.pages[app.activePage].javascript = jsEditor.state.doc.toString();
    
    localStorage.setItem('kodeWeave', JSON.stringify(project));
  },

	// Funtion to create button list of total pages 
	createPageButtonList: () => {
    const pagesTab = document.querySelector('[data-pagecontent]');
    pagesTab.innerHTML = '';

    for (let i = 0; i < project.pages.length; i++) {
        let val = project.pages[i].name;

        let pageContainer = document.createElement('div');
        pageContainer.className = 'h-full pb-28';

        let pageName = document.createElement('div');
        pageName.classList.add('name');
        if (i === app.activePage) {
            pageName.classList.add('text-blue-500', 'activepage');
        } else {
            pageName.classList.add('text-current', 'bg-transparent', 'border-current');
        }
        pageName.classList.add('mb-2');
        pageName.textContent = val;
        pageName.addEventListener('click', () => app.activatePage(i));

        let article = document.createElement('article');
        article.classList.add('relative', 'h-full', 'm-0', 'p-0');

        let previewElm = document.createElement('div');
        previewElm.id = `previewElm${i}`;
        previewElm.classList.add('rounded-md', 'w-full', 'h-full');

        let clickOverlay = document.createElement('div');
        clickOverlay.classList.add('absolute', 'inset-0');
        clickOverlay.addEventListener('click', () => app.activatePage(i));

        let section = document.createElement('section');
        section.classList.add('mt-2');

        let buttonGrid = document.createElement('div');

        let eraseButton = document.createElement('button');
        eraseButton.classList.add('inline-block', 'text-current', 'bg-transparent', 'border-current');
        eraseButton.innerHTML = '<i class="fa fa-eraser"></i>';
        eraseButton.addEventListener('click', () => app.clearPage(i));

        let cloneButton = document.createElement('button');
        cloneButton.classList.add('inline-block', 'text-current', 'bg-transparent', 'border-current');
        cloneButton.innerHTML = '<i class="fa fa-clone"></i>';
        cloneButton.addEventListener('click', () => app.clonePage(i));
        
        if (i === 0) {
            buttonGrid.classList.add('grid', 'grid-cols-2', 'gap-1');
            buttonGrid.appendChild(cloneButton);
            buttonGrid.appendChild(eraseButton);
        } else {
            buttonGrid.classList.add('grid', 'grid-cols-4', 'gap-1');
        
            let renameButton = document.createElement('button');
            renameButton.classList.add('inline-block', 'text-current', 'bg-transparent', 'border-current');
            renameButton.innerHTML = '<i class="fa fa-font"></i>';
            renameButton.addEventListener('click', () => app.renamePage(i));
        
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('inline-block', 'text-current', 'bg-transparent', 'border-current');
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.addEventListener('click', () => app.deletePage(i));
        
            buttonGrid.appendChild(renameButton);
            buttonGrid.appendChild(cloneButton);
            buttonGrid.appendChild(eraseButton);
            buttonGrid.appendChild(deleteButton);
        }

        section.appendChild(buttonGrid);
        article.appendChild(previewElm);
        article.appendChild(clickOverlay);
        article.appendChild(section);

        pageContainer.appendChild(pageName);
        pageContainer.appendChild(article);

        pagesTab.appendChild(pageContainer);

        app.renderPagePreviews(i);
    }
    app.updateStorage();
  },

	// Funtion to add a page
	addPage: () => {
		// first detect if user can clone a page
		if (!projectTitle.value || !description.value) {
			alert('Error: Website is missing the title and/or description meta information!');
			return false
		}

		// value for the new page name
		let val = prompt("What's the page's file name?").toLowerCase();

		// detect if page name already exists
		for (let i in project.pages) {
			if (project.pages[i].name === val) {
				alert('Operation aborted: Page name already exists!');
				return false
			}
		}

		// push page info to object
		let tempObj = {
			"name": val,
			"title": `${projectTitle.value}`,
			"description": `${description.value}`,
  		"scratchpad": "",
  		"libraries": [],
  		"html": "",
  		"css": "",
  		"javascript": ""
		};
		project.pages.push(tempObj);

		// refresh pages list
		app.createPageButtonList();
	},

	// Funtion to rename a page
	renamePage: index => {
		// value for page name
		let val = prompt("What's the page's file name?").toLowerCase();

		// detect if page name already exists
		for (let i in project.pages) {
			if (project.pages[i].name === val) {
				alert('Operation aborted: Page name already exists!');
				return false
			}
		}

		// remember old name
		project.pages[index].name;

		// renames the object
		project.pages[index].name = val;

		// apply the new name to the page button
		undefined.textContent = val;

		// refresh pages list
		app.createPageButtonList();
	},

	// Funtion to clone a page
  clonePage: i => {
    // Clone the object
    let originalPage = project.pages[i];
    let clonedPage = JSON.parse(JSON.stringify(originalPage));

    // Apply the new name to the cloned object
    clonedPage.name = `${originalPage.name}_clone${project.pages.length}`;

    // Push the cloned object to the pages object array
    project.pages.push(clonedPage);

    // Refresh pages list
    app.createPageButtonList();
  },

	// Funtion to empty a page
	clearPage: i => {
		// Clear the object
		let originalPage = project.pages[i];
		originalPage.libraries = [];
		originalPage.html = "";
		originalPage.css = "";
		originalPage.javascript = "";
		
		let resetEditor = editor => {
      // Get the current state of the editor
      const currentState = editor.state;
      
      // Create a new state with the updated content
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.toString().length,
          insert: "",
        },
      })
		}
		
		// detect if currently active page
		if (i === app.activePage) {
		  resetEditor(htmlEditor)
		  resetEditor(cssEditor)
		  resetEditor(jsEditor)
		}

		// Refresh pages list
		app.createPageButtonList();
	},

	// Funtion to delete a page
	deletePage: i => {
		// Remember page name for history stack
		project.pages[i].name;

		// delete page from object
		project.pages.splice(i, 1);

		// refresh pages list
		app.createPageButtonList();

		// if user deletes the active page, make the index the active page
		if (i === app.activePage) {
			const buttons = document.querySelectorAll("[data-pagecontent] button");
			const newActivePageButton = buttons[0];

			app.activatePage(0, newActivePageButton);
		}
	},

	// Funtion to make page active
	activatePage: i => {
		app.activePage = i;
		const projectTitle = document.getElementById('projectTitle');

		// Check if project has pages and the index is within bounds
		if (project.pages && project.pages.length > i && project.pages[i]) {
			const currentPage = project.pages[i];

			// Update input values
			css.value = project.settings.css
			projectTitle.value = currentPage.title || '';
			description.value = currentPage.description || '';
			scratchpad.value = currentPage.scratchpad || '';
      
      // Create a new state with the updated content
      htmlEditor.dispatch({
        changes: {
          from: 0,
          to: htmlEditor.state.doc.toString().length,
          insert: currentPage.html,
        },
      });
      cssEditor.dispatch({
        changes: {
          from: 0,
          to: cssEditor.state.doc.toString().length,
          insert: currentPage.css,
        },
      });
      jsEditor.dispatch({
        changes: {
          from: 0,
          to: jsEditor.state.doc.toString().length,
          insert: currentPage.javascript,
        },
      });

			// Remove old active page color indicator
			let activePageBtn = document.querySelector("[data-pagecontent] .activepage");
			if (activePageBtn) {
				activePageBtn.classList.remove("text-blue-500", "activepage");
			}

			// Add new active page color indicator
			activePageBtn = document.querySelectorAll("[data-pagecontent] .name")[i];
			activePageBtn.classList.add("text-blue-500", "activepage");

			// Update preview to show the active page
			app.displayLibrariesArray();
			app.updatePreview(autoupdate.checked);
		} else {
			console.error('Invalid page data at index', i, 'in pages array:', project.pages);
			console.log('Current project state:', project);
		}
	},

	// update iframe preview function
	updatePreview: (runManually = false) => {
		app.updateSettings();
    app.updateStorage();
		const previewElm = document.getElementById('previewElm');
		const elm = document.querySelector('html[data-theme]');

		const theme = project.settings.theme ? 'dark' : 'light';
		elm.setAttribute('data-theme', theme);
		const css = project.pages[app.activePage].css;
		
		const consoleStyle = project.settings.console ? `.wrapper_yOR7u {width: 95%!important; border-radius: 15px 15px 0 0!important; z-index: 99999999;} .btn_yOR7u { background: inherit; padding: 0 0.5rem; margin: inherit; margin-right: 10px; border: inherit; color: #fff!important; } .nav_yOR7u {padding-bottom: 14px!important;} .line_yOR7u {background: inherit!important;}` : '';

		const generateHtmlCode = (theme, showConsole, consoleStyle) => {
        let libraryTags = '';
        const libraries = project.pages[app.activePage].libraries;
        libraries.forEach(library => {
            if (library.endsWith('.js')) {
                libraryTags += `<script src="${library}" defer></script>
    `;
            } else if (library.endsWith('.css')) {
                libraryTags += `<link rel="stylesheet" href="${library}">
    `;
            } else {
                // Assuming it's a Google font
                libraryTags += `<link href="${library}" rel="stylesheet">
    `;
            }
        });
			return `<!DOCTYPE html>
<html data-theme="${theme}">
  <head>
    <title>${project.pages[app.activePage].title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${project.pages[app.activePage].description}">
    ${libraryTags}
    <style>
      ${css}
      ${consoleStyle}
    </style>
  </head>
  <body>
    ${project.pages[app.activePage].html}
    <script>setTimeout(() => {${project.pages[app.activePage].javascript}}, 100)</script>
    ${showConsole}
  </body>
</html>`;
		};

		const showConsole = project.settings.console ? `<script type="module" src="js/dom-console.js" defer></script>\n` : '';
		const htmlCode = generateHtmlCode(theme, showConsole, consoleStyle);

		previewElm.innerHTML = '';
		const frame = document.createElement('iframe');
		frame.setAttribute('id', 'preview');
		frame.setAttribute('title', project.pages[app.activePage].title);
		frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups');
		previewElm.appendChild(frame);
		const previewFrame = document.getElementById('preview');
		const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;

		preview.open();
		preview.write(htmlCode);
		preview.close();
	},
	renderPagePreviews: initPage => {
    const elm = document.querySelector('html[data-theme]');
    const theme = project.settings.theme ? 'dark' : 'light';
    elm.setAttribute('data-theme', theme);
    const css = project.pages[initPage].css;

		const generateHtmlCode = theme => {
        let libraryTags = '';
        const libraries = project.pages[initPage].libraries;
        libraries.forEach(library => {
            if (library.endsWith('.js')) {
                libraryTags += `<script src="${library}" defer></script>
    `;
            } else if (library.endsWith('.css')) {
                libraryTags += `<link rel="stylesheet" href="${library}">
    `;
            } else {
                // Assuming it's a Google font
                libraryTags += `<link href="${library}" rel="stylesheet">
    `;
            }
        });
			return `<!DOCTYPE html>
<html data-theme="${theme}">
  <head>
    <title>${project.pages[initPage].title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${project.pages[initPage].description}">
    ${libraryTags}
    <style>
      ${css}
    </style>
  </head>
  <body>
    ${project.pages[initPage].html}
  </body>
</html>`;
		};
		const htmlCode = generateHtmlCode(theme);

    const outputPage = (pageid, pageframe) => {
      const container = document.getElementById(`${pageid}`);
      container.innerHTML = ''; // Clear existing content
      const frame = document.createElement('iframe');
      frame.setAttribute('id', pageframe);
	  	frame.setAttribute('title', project.pages[initPage].title);
      frame.className = "transform scale-50"; // Apply Tailwind classes for transform
      frame.style.width = "200%";
      frame.style.height = "200%";
      frame.style.transformOrigin = "top left"; // Set transform origin to center
	  	frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups');
      container.appendChild(frame);
      const previewFrame = document.getElementById(`${pageframe}`);
      const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
      previewDoc.open();
      previewDoc.write(htmlCode);
      previewDoc.close();
    };

    outputPage(`previewElm${initPage}`, `preview${initPage}`);
  },
	
  // share weave
  shareWeave: () => {
    let cssLibrary = "";
    let jsLibrary = "";

    const libraries = project.pages[app.activePage].libraries;

    libraries.forEach(library => {
      if (library.endsWith('.js')) {
        jsLibrary += `${library};`;
      } else if (library.endsWith('.css')) {
        cssLibrary += `${library};`;
      } else {
        // Assuming it's a Google font, treat it as CSS
        cssLibrary += `${library};`;
      }
    });

    let data = {
        title: projectTitle.value,
        description: description.value,
        html: `<!-- 
Shared from kodeWeave!
Try kodeWeave today at https://michaelsboost.com/kodeWeave/
-->

${htmlEditor.state.doc.toString()}`,
        css: `/* Shared from kodeWeave: https://michaelsboost.com/kodeWeave/ */
${cssEditor.state.doc.toString()}`,
        js: `// Shared from kodeWeave: https://michaelsboost.com/kodeWeave/ 

${jsEditor.state.doc.toString()}`,
        css_external: cssLibrary,
        js_external: jsLibrary,
        editors: '000', // Set HTML and JS editors open, CSS editor closed
        layout: 'left' // Set the layout to left
    };

    // Remove the trailing semicolon
    if (cssLibrary !== "") {
        cssLibrary = cssLibrary.slice(0, -1);
    }
    if (jsLibrary !== "") {
        jsLibrary = jsLibrary.slice(0, -1);
    }

    let JSONstring = JSON.stringify(data).replace(/"/g, "&quot").replace(/'/g, "&apos");

    let form =
        '<form action="https://codepen.io/pen/define" method="POST" target="_blank" style="display: none">' +
        '<input type="hidden" name="data" value=\'' +
        JSONstring +
        '\'>' +
        '<input type="submit" value="Create New Pen with Prefilled Data">' +
        '</form>';

    // Append click then remove
    document.body.innerHTML += form;
    document.querySelector('form').submit();
    document.querySelector('form').remove();
},

	// export project json
	exportProjectFile: () => {
		let blob = new Blob([JSON.stringify(project)], {
			type: "application/json"
		});
		saveAs(blob, `${project.pages[app.activePage].name.toString().toLowerCase().replace(/ /g,"")}-kodeWeave.json`);
	},
	
  // export zip file
  exportZip: () => {
    const theme = project.settings.theme ? 'dark' : 'light';

    let zip = new JSZip();
    
    let readmeCode = `${project.pages[0].title}
===================

${project.pages[0].description}

Version
-------------

0.0.1

License
-------------

MIT

This app was created and exported with [kodeWeave](https://michaelsboost.github.io/kodeWeave/)`;

    let licenseStr = `The MIT License (MIT)
Copyright (c) ${new Date().getFullYear()} John Doe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

    zip.file(`README.md`, readmeCode);
    zip.file(`LICENSE.md`, licenseStr);
    
    project.pages.forEach(page => {
      const css = page.css ? `<link rel="stylesheet" href="css/${page.name}.css">` : '';

        let libraryTags = '';
        page.libraries.forEach(library => {
          if (library.endsWith('.js')) {
            libraryTags += `<script src="${library}" defer></script>\n`;
          } else if (library.endsWith('.css')) {
            libraryTags += `<link rel="stylesheet" href="${library}">\n`;
          } else {
            // Assuming it's a Google font
            libraryTags += `<link href="${library}" rel="stylesheet">\n`;
          }
        });
        
        zip.file(`${page.name}/js/${page.name}.js`, `${page.javascript}`);
        zip.file(`${page.name}/css/${page.name}.css`, `${page.css}`);
        zip.file(`${page.name}/${page.name}.html`, `<!DOCTYPE html>
<html lang="en-US" data-theme="${theme}">
  <head>
    <title>${page.title}</title>
    <meta charset="utf-8">
    <meta name="description" content="${page.description}">
    <meta name="author" content="kodeWeave">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="manifest.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${page.title}">
    <meta name="apple-mobile-web-app-title" content="${page.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-navbutton-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-starturl" content="./${page.name}.html">
    <meta property="og:type"        content="website" />
    <meta property="og:title"       content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    ${libraryTags}
    ${css}
  </head>
  <body>
  ${page.html}
  
    <script src="js/${page.name}.js"></script>
  </body>
</html>`);

        // Add libraries for the current page
        /*
      // Fetch and add external libraries
      for (const library of page.libraries) {
        const fileType = library.endsWith('.js') ? 'js' : 'css';
        app.getFile(library, content => {
          zip.folder(`${page.name}/${fileType}_external`).file(library.split('/').pop(), content);
        });
      }
        */
    });

    // save kodeWeave project file in export
    zip.file('project-kodeWeave.json', JSON.stringify(project));
  
    let content = zip.generate({type:"blob"});
    saveAs(content, 'project.zip');
  },

	// zooming and panning function
	initZoomPan: () => {
		// variables
		document.querySelector('[data-device]');
		let canvas = document.querySelector('[data-canvas]');
		let canvasH = parseFloat(canvas.clientHeight);
		let canvasW = parseFloat(canvas.clientWidth / 2);

		// init panzoom
		let instance = panzoom(canvas, {
			bounds: true,
			boundsPadding: 0.1
		});

		let centerCanvas = () => {
			let canvas = document.querySelector('[data-canvas]');
			let canvasH = parseFloat(canvas.clientHeight);
			let canvasW = parseFloat(canvas.clientWidth / 2);
			canvasW = parseFloat(canvas.clientWidth);
			canvasH = parseFloat(canvas.clientHeight);

			// detect if canvas is in portrait mode
			if (canvasW < canvasH) {
				// ratio for zoom
				let zoomRatio = 0.75;

				// to center the canvas horizontally we first need to...
				// get half the body & canvas's width
				let bodyW = parseFloat(canvas.parentElement.clientWidth / 2);
				canvasW = parseFloat(canvas.clientWidth / 2);
				// then add them together
				let initialXPos = parseFloat(parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio);

				// to center the canvas vertically we first need to...
				// get the size of both the body and the canvas
				let bodyH = parseFloat(canvas.parentElement.clientHeight);
				bodyH = bodyH / 2;
				canvasH = canvasH / 2;
				// then add them together
				let initialYPos = parseFloat(parseFloat(canvasH) - parseFloat(bodyH) * zoomRatio);

				// set initial zoom
				instance.zoomAbs(
					initialXPos, // initial x position
					initialYPos, // initial y position
					zoomRatio // initial zoom
				);
				instance.moveTo(initialXPos, initialYPos);

				// display size
				viewx.value = parseInt(canvas.style.width);
				viewy.value = parseInt(canvas.style.height);
				return false
			}

			// ratio for zoom
			let zoomRatio = 0.75;

			// to center the canvas horizontally we first need to...
			// get half the body & canvas's width
			let bodyW = parseFloat(canvas.parentElement.clientWidth / 2);
			canvasW = parseFloat(canvas.clientWidth / 2);
			// then add them together
			let initialXPos = parseFloat(parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio);

			// to center the canvas vertically we first need to...
			// get the size of both the body and the canvas
			let bodyH = parseFloat(canvas.parentElement.clientHeight);
			bodyH = bodyH / 2;
			canvasH = canvasH / 2;
			// then add them together
			let initialYPos = parseFloat(parseFloat(bodyH) - parseFloat(canvasH) * zoomRatio);

			// set initial zoom
			instance.zoomAbs(
				initialXPos, // initial x position
				initialYPos, // initial y position
				zoomRatio // initial zoom
			);
			instance.moveTo(initialXPos, initialYPos);

			// display size
			viewx.value = parseInt(canvas.style.width);
			viewy.value = parseInt(canvas.style.height);
		};
		centerCanvas();

		// enable disable zoom/pan
		const zoomIcon = document.querySelector('[data-zoom]');
		zoomIcon.onclick = () => {
			if (zoomIcon.getAttribute('data-zoom') === 'true') {
				canvas.selection = false;
				instance.pause();
				zoomIcon.innerHTML = '<i class="text-xl fa fa-light fa-magnifying-glass-minus"></i>';
				zoomIcon.setAttribute('data-zoom', false);
				fill.classList.add('hidden');
			} else {
				canvas.selection = true;
				instance.resume();
				zoomIcon.innerHTML = '<i class="text-xl fa fa-light fa-magnifying-glass-plus"></i>';
				zoomIcon.setAttribute('data-zoom', true);
				fill.classList.remove('hidden');
			}
		};

		// rotate canvas
		let rotateview = () => {
			canvasW = parseFloat(canvas.clientWidth);
			canvasH = parseFloat(canvas.clientHeight);

			canvas.style.width = canvasH + 'px';
			canvas.style.height = canvasW + 'px';
			centerCanvas();
		};

		// reset canvas dimentions and center it
		let resetCanvas = (w, h) => {
			canvasW = w;
			canvasH = h;

			if (canvasW > canvasH) {
				// landscape
				canvas.style.width = canvasW + 'px';
				canvas.style.height = canvasH + 'px';
				centerCanvas();
				return false
			}

			canvas.style.width = canvasH + 'px';
			canvas.style.height = canvasW + 'px';
			centerCanvas();
		};

		// reset canvas dimensions and center it
		// dimensions of Galaxy S8+ used
		mobilep.onclick = () => {
			resetCanvas(360, 740);
			rotateview();
		};
		mobilel.onclick = () => {
			resetCanvas(360, 740);
		};

		// reset canvas dimensions and center it
		// dimensions of iPad Mini used
		tabletp.onclick = () => {
			resetCanvas(1024, 768);
			rotateview();
		};
		tabletl.onclick = () => {
			resetCanvas(1024, 768);
		};

		// reset canvas dimensions and center it
		// 2012 macbook pro dimensions used
		desktopsize.onclick = () => {
			resetCanvas(1440, 834);
		};

		// manually reset canvas dimensions and center it
		viewx.onkeyup = () => {
			resetCanvas(viewx.value, viewy.value);
		};
		viewy.onkeyup = () => {
			resetCanvas(viewx.value, viewy.value);
		};
	},
  
  // Function to handle storage and display of library/framework
  fetchSuggestions: searchText => {
    fetch(`https://api.cdnjs.com/libraries?search=${searchText}&fields=filename,description,version`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.results && data.results.length > 0) {
          const libraries = data.results.map(result => result);
          app.displaySuggestions(libraries);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
  displaySuggestions: suggestions => {
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    suggestions.forEach(result => {
        const listItem = document.createElement('li');
        listItem.className = 'list-none';
        listItem.innerHTML = `<div class="flex justify-between mb-2 font-bold text-1xl">
            <span>${result.name}</span>
            <span>${result.version}</span>
        </div>
        <div class="text-sm">${result.description}<br><hr></div>`;
        listItem.onclick = () => {
            // Add the clicked suggestion to the libraries array
            const url = result.latest; // Assuming 'latest' holds the URL
            project.pages[app.activePage].libraries.push(url);
            // Clear the suggestions list
            suggestionsList.innerHTML = '';
            // Display the libraries display
            app.displayLibrariesArray();
            app.updatePreview(autoupdate.checked);
            app.createPageButtonList();
        };
        suggestionsList.appendChild(listItem);
    });
  },
  displayLibrariesArray: () => {
    const librariesArray = project.pages[app.activePage].libraries;
    let sortLibrariesContainer = document.getElementById('sortLibraries');
    sortLibrariesContainer.innerHTML = '';
    const embedArray = (result, index) => {
      const newNav = document.createElement('nav');
      newNav.setAttribute('data-index', index);

      const sortButton = document.createElement('button');
      sortButton.className = 'w-auto border-0 bg-transparent text-current py-2';
      sortButton.innerHTML = '<i class="fa fa-sort"></i>';
      sortButton.setAttribute('data-sort', index);

      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.placeholder = 'https://website.com/index.css/.js';
      newInput.setAttribute('data', 'library')
      newInput.className = 'rounded-r-none py-2';
      newInput.value = result;
      newInput.onkeyup = () => {
        // Update the value of the librariesArray at the corresponding index
        librariesArray[index] = newInput.value.trim();
        app.updatePreview(autoupdate.checked);
        app.createPageButtonList();
      };

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button w-auto border-0 bg-red-400 rounded-l-none py-2';
      deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
      deleteButton.onclick = () => {
        // Remove the library from the array by its index
        project.pages[app.activePage].libraries.splice(index, 1);
        // Re-render the libraries array
        app.createPageButtonList();
        app.displayLibrariesArray();
        app.updatePreview(autoupdate.checked);
      };

      newNav.appendChild(sortButton);
      newNav.appendChild(newInput);
      newNav.appendChild(deleteButton);
      sortLibrariesContainer.appendChild(newNav);
    };

    // Embed each library into a new input field and delete button
    librariesArray.forEach((input, index) => {
      embedArray(librariesArray[index], index);
    });
    
    // Initialize SortableJS if it hasn't been initialized yet
    if (!sortable) {
      sortable = new Sortable(sortLibrariesContainer, {
        handle: '[data-sort]', // Selector for the handle element
        animation: 150, // Animation duration in milliseconds
        onEnd: (event) => {
          // Update the libraries array after sorting
          const startIndex = event.oldIndex;
          const endIndex = event.newIndex;
          const movedLibrary = librariesArray.splice(startIndex, 1)[0];
          librariesArray.splice(endIndex, 0, movedLibrary);
          app.updatePreview(autoupdate.checked);
          app.createPageButtonList();
        }
      });
    }

    // Check if the last input field is empty, and append an additional empty input field if needed
    if (librariesArray.length === 0 || librariesArray[librariesArray.length - 1].trim() !== '') {
        embedArray('', librariesArray.length);
    }
    app.updatePreview(autoupdate.checked);
    app.createPageButtonList();
  },

	// initalize application function
	init: () => {
    if (!localStorage.getItem('kodeWeave')) {
      // project json
      project = {
      	"version": "1.1.43",
      	"settings": {
      		"theme": false,
      		"fontSize": 16,
      		"autoupdate": true,
      		"console": true,
      		"scratchpad": "",
      	},
      	"pages": [{
      		"name": "index",
      		"title": "An attractive title",
      		"description": "The most attractive description ever!",
      		"libraries": ['https://cdnjs.cloudflare.com/ajax/libs/picocss/1.5.7/pico.classless.min.css', 'https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css', 'https://michaelsboost.github.io/kodeWeave/go/libraries/tailwind/tailwind.min.js'],
      		"html": "",
      		"css": "",
      		"javascript": ""
      	}]
      };
    } else {
      project = JSON.parse(localStorage.getItem('kodeWeave'))
      
      // Make first page as active page
      app.activePage = 0;
      
      // Update settings
      autoupdate.checked = project.settings.autoupdate;
      const runParent = run.parentElement;
      autoupdate.checked ? runParent.classList.add('hidden') : runParent.classList.remove('hidden');
      toggleconsole.checked = project.settings.console;
      fz.value = project.settings.fontSize;
      theme.checked = project.settings.theme;
      scratchpad.value = project.settings.scratchpad;
      let cmEditor = document.querySelectorAll('.cm-editor');
      cmEditor.forEach((child) => {
        child.style.fontSize = `${fz.value}px`;
      });
      
      // Load code into appropriate editors
      htmlEditor.dispatch({
        changes: {
          from: 0,
          to: htmlEditor.state.doc.toString().length,
          insert: project.pages[0].html,
        },
      });
      cssEditor.dispatch({
        changes: {
          from: 0,
          to: cssEditor.state.doc.toString().length,
          insert: project.pages[0].css,
        },
      });
      jsEditor.dispatch({
        changes: {
          from: 0,
          to: jsEditor.state.doc.toString().length,
          insert: project.pages[0].javascript,
        },
      });
      
      // render previews
      app.createPageButtonList();
      app.activatePage(0);
      app.displayLibrariesArray();
      app.updatePreview(autoupdate.checked);
    }
    
    const sortLibrariesContainer = document.getElementById('sortLibraries');
		const searchBox = document.getElementById('searchBox');
    const suggestionsList = document.getElementById('suggestions');
    searchBox.onkeyup = () => {
      const searchText = searchBox.value.trim();
      suggestionsList.innerHTML = "";
      if (searchText.length <= 0) {
        suggestionsList.innerHTML = "";
        return false;
      } else {
        app.fetchSuggestions(searchText);
      }
    };
    addanother.onclick = () => app.displayLibrariesArray()
    logit.onclick = () => console.log(JSON.stringify(project.pages[app.activePage]))
	  
		// init zooming and panning
		app.initZoomPan();
		
		// display libraries array
		app.displayLibrariesArray();

    // Define an array of objects containing element IDs, corresponding project properties, and event types
    const elementProperties = [
      { id: 'autoupdate', property: 'settings.autoupdate', event: 'change' },
      { id: 'toggleconsole', property: 'settings.console', event: 'change' },
      { id: 'fa', property: 'settings.fontawesome', event: 'change' },
      { id: 'fz', property: 'settings.fontSize', events: ['keyup', 'change'] },
      { id: 'theme', property: 'settings.theme', event: 'change' },
      { id: 'css', property: 'settings.css', event: 'change' }
    ];
    
    // Function to handle saving project data on keyup or change event
    const handleProjectDataChange = (element, property) => {
      let value;
      if (element.type === 'checkbox') {
        value = element.checked;
      } else {
        value = element.value;
      }
      // Update the project data
      const nestedProperties = property.split('.');
      let obj = project;
      for (const prop of nestedProperties.slice(0, -1)) {
        obj = obj[prop];
        if (obj === undefined) break; // Stop if any nested property is undefined
      }
      obj[nestedProperties.slice(-1)[0]] = value;
    };
    
    // Loop through the array and attach event handlers to the elements
    elementProperties.forEach(({ id, property, event, events }) => {
      const element = document.getElementById(id);
      if (element) {
        const handler = () => {
          handleProjectDataChange(element, property);
          if (element === autoupdate) {
            run.parentElement.classList.toggle('hidden', autoupdate.checked);
          }
          if (element === fz) {
            let cmEditor = document.querySelectorAll('.cm-editor');
            cmEditor.forEach((child) => {
              child.style.fontSize = `${fz.value}px`
            });
          }
          app.updatePreview(autoupdate.checked);
        };
        if (events) {
          events.forEach(ev => element.addEventListener(ev, handler));
        } else {
          element.addEventListener(event, handler);
        }
      }
    });
    
    // Define an array of objects containing element IDs, corresponding project properties, and event types
    const elementProperties2 = [
      { id: 'projectTitle', property: 'title', events: ['keyup', 'change'] },
      { id: 'description', property: 'description', events: ['keyup', 'change'] },
      { id: 'scratchpad', property: 'scratchpad', events: ['keyup', 'change'] }
    ];
    
    // Function to handle saving project data
    const savePageData = (element, property) => {
      // Update the project data
      const currentPage = project.pages[app.activePage];
      currentPage[property] = element.value;
      app.updatePreview(autoupdate.checked);
    };
    
    // Loop through the array and attach event listeners to the elements for each event type
    elementProperties2.forEach(({ id, property, events }) => {
      const element = document.getElementById(id);
      if (element) {
        events.forEach(event => {
          element.addEventListener(event, () => {
            savePageData(element, property);
            app.updatePreview(autoupdate.checked);
          });
        });
      }
    });
		
		// function to add a page
		addPage.onclick = app.addPage;
		
		// Function to init a new project
		initNewProject.onclick = () => {
		  localStorage.clear();
		  location.reload(true);
		};
		
		// Create a function to dynamically create and append the navbar
    const createNavbar = container => {
      // Create the main nav element
      const navbar = document.createElement('nav');
      navbar.className = 'absolute bottom-10 inset-x-0 px-4 text-center inline-block overflow-auto';
      const navbar2 = document.createElement('nav');
      navbar2.className = 'absolute bottom-0 inset-x-0 px-4 text-center inline-block overflow-auto';
    
      // Create the ul element
      const ul = document.createElement('ul');
      ul.className = 'flex justify-between';
      const ul2 = document.createElement('ul');
      ul2.className = 'flex justify-between';
    
      // Button data for first nav
      const buttons1 = [
        { name: 'indent command', dataCommand: 'indent', icon: 'fa-indent' },
        { name: 'outdent command', dataCommand: 'outdent', icon: 'fa-outdent' },
        { name: 'undo command', dataCommand: 'undo', icon: 'fa-undo' },
        { name: 'redo command', dataCommand: 'redo', icon: 'fa-redo' },
        { name: 'search/replace command', dataCommand: 'search', icon: 'fa-magnifying-glass' },
        { name: 'go to line', dataCommand: 'goto', icon: 'fa-thumbtack' },
      ];
    
      // Create buttons for first nav and append to ul
      buttons1.forEach(buttonData => {
        const li = document.createElement('li');
        const button = createButton(buttonData);
        li.appendChild(button);
        ul.appendChild(li);
      });
    
      // Button data for second nav
      const buttons2 = [
        { name: 'toggle comment', dataCursor: 'toggle comment', icon: 'fa-comment' },
        { name: 'fold all', dataCursor: 'fold all', icon: 'fa-chevron-right' },
        { name: 'unfold all', dataCursor: 'unfold all', icon: 'fa-chevron-down' },
        { name: 'cut', dataCommand: 'cut', icon: 'fa-cut' },
        { name: 'copy', dataCommand: 'copy', icon: 'fa-copy' },
        { name: 'paste', dataCommand: 'paste', icon: 'fa-paste' },
        { name: 'select all', dataCommand: 'selectall', icon: 'fa-arrow-pointer' },
      ];
    
      // Create buttons for second nav and append to ul
      buttons2.forEach(buttonData => {
        const li = document.createElement('li');
        const button = createButton(buttonData);
        li.appendChild(button);
        ul2.appendChild(li);
      });
    
      // Append ul to navbar
      navbar.appendChild(ul);
      navbar2.appendChild(ul2);
    
      // Get the element to which you want to append the created navbar
      const embedNavbar = document.querySelector(`[data-${container}]`);
      
      // Clear embedNavbar before append refresh
      embedNavbar.innerHTML = '';
      
      // Append the navbar to the embedNavbar element
      embedNavbar.appendChild(navbar);
      embedNavbar.appendChild(navbar2);
    };
    
    // Function to create button element
    const createButton = ({ name, dataID, dataKey, dataCommand, dataOpen, dataCursor, icon }) => {
      const button = document.createElement('button');
      button.dataset.command = dataCommand || '';
      button.dataset.cursor = dataCursor || '';
      button.name = button.dataset.name;
      button.className = 'py-0 px-3 mt-2 border-none bg-transparent text-sm text-current';
    
      // Create icon element
      const iconElement = document.createElement('i');
      iconElement.className = 'fa ' + icon;
      button.appendChild(iconElement);
    
      // Add onclick function to button
      button.onclick = e => {
        // commands
        if (button.dataset.command === "indent") {
          indentMore(activeEditor);
          e.preventDefault();
        }
        if (button.dataset.command === "outdent") {
          indentLess(activeEditor);
          e.preventDefault();
        }
        if (button.dataset.command === "goto") {
          gotoLine(activeEditor);
        }
        if (button.dataset.command === "undo") {
          undo(activeEditor);
          e.preventDefault();
        }
        if (button.dataset.command === "redo") {
          redo(activeEditor);
          e.preventDefault();
        }
        if (button.dataset.command === "search") {
          openSearchPanel(activeEditor);
          e.preventDefault();
        }
        if (button.dataset.cursor === "toggle comment") {
          toggleComment(activeEditor);
        }
        if (button.dataset.cursor === "fold all") {
          foldAll(activeEditor);
        }
        if (button.dataset.cursor === "unfold all") {
          unfoldAll(activeEditor);
        }
        if (button.dataset.command === "cut") {
          cutSelection(activeEditor);
        }
        if (button.dataset.command === "copy") {
          copySelection(activeEditor);
        }
        if (button.dataset.command === "paste") {
          pasteText(activeEditor);
        }
        if (button.dataset.command === "selectall") {
          selectAll(activeEditor);
        }
        // Helper function to clamp a value between min and max
        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }
        e.preventDefault();
      };
    
      return button;
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
    
		// init tabs
		const tabButtons = document.querySelectorAll('[data-toggletab]');
		const tabContent = document.querySelectorAll('[data-tabcontent]');
		tabButtons.forEach(button => {
			button.addEventListener('click', function() {
				// Check if the clicked button already has the text-blue-500 class
				const isAlreadyActive = this.classList.contains('text-blue-500');

				// Remove text-blue-500 from all buttons
				tabButtons.forEach((btn) => btn.classList.remove('text-blue-500'));

				// Hide all tab contents
				tabContent.forEach((tab) => tab.classList.add('hidden'));

				if (!isAlreadyActive) {
					// If the clicked button wasn't active, add text-blue-500 and show corresponding tab
					this.classList.add('text-blue-500');
					const tabName = this.getAttribute('data-toggletab');
					const selectedTab = document.querySelector(`[data-tabcontent="${tabName}"]`);
					selectedTab.classList.remove('hidden');

					// Check if the selected tab is the 'pages' tab
					if (tabName === 'pages') {
						// push demo to the display tab
						app.createPageButtonList();
					}
					// remember the active editor
					if (tabName === 'html') {
					  document.querySelector('[data-editorJSNavbar]').innerHTML = '';
					  document.querySelector('[data-editorCSSNavbar]').innerHTML = '';
            activeEditor = htmlEditor;
		        createNavbar("editorHTMLNavbar");
					}
					if (tabName === 'css') {
					  document.querySelector('[data-editorHTMLNavbar]').innerHTML = '';
					  document.querySelector('[data-editorJSNavbar]').innerHTML = '';
            activeEditor = cssEditor;
		        createNavbar("editorCSSNavbar");
					}
					if (tabName === 'js') {
					  document.querySelector('[data-editorHTMLNavbar]').innerHTML = '';
					  document.querySelector('[data-editorCSSNavbar]').innerHTML = '';
            activeEditor = jsEditor;
		        createNavbar("editorJSNavbar");
					}
				} else {
					// If the clicked button was already active, show the random tab
					const randomTab = document.querySelector('[data-tabcontent="menu"]');
					randomTab.classList.remove('hidden');
				}
			});
		});

		// init preview via onclick
		run.onclick = () => app.updatePreview(autoupdate.checked);
    
    // function to load json file
    document.getElementById('importProject').onchange = () => {
      let reader = new FileReader();
    
      reader.onload = e => {
        // grab file
        project = JSON.parse(e.target.result);
        
        // Make first page as acrive page
        app.activePage = 0;
        
        // Update settings
        autoupdate.checked = (project.settings.autoupdate) ? true : false;
        toggleconsole.checked = (project.settings.console) ? true : false;
        fz.value = project.settings.fontSize;
        theme.checked = (project.settings.theme) ? true : false;
        scratchpad.value = project.settings.scratchpad;
        let cmEditor = document.querySelectorAll('.cm-editor');
        cmEditor.forEach((child) => {
          child.style.fontSize = `${fz.value}px`
        });
      
        // Load code into appropriate editors
        htmlEditor.dispatch({
          changes: {
            from: 0,
            to: htmlEditor.state.doc.toString().length,
            insert: project.pages[0].html,
          },
        });
        cssEditor.dispatch({
          changes: {
            from: 0,
            to: cssEditor.state.doc.toString().length,
            insert: project.pages[0].css,
          },
        });
        jsEditor.dispatch({
          changes: {
            from: 0,
            to: jsEditor.state.doc.toString().length,
            insert: project.pages[0].javascript,
          },
        });
      
        // render previews
        app.createPageButtonList();
        app.activatePage(0);
        app.displayLibrariesArray();
        app.updatePreview(autoupdate.checked);
      }
      reader.readAsText(document.getElementById('importProject').files[0]);
    };

		// init preview
		setTimeout(app.updatePreview, 300);
		
		// export project file
		exportProjectFile.onclick = () => app.exportProjectFile();
		
		// export zip file
		exportZip.onclick = () => app.exportZip();
	}
};

// check if FileReader API is available
if (!window.FileReader) {
	alert('File API & FileReader API not supported!');
}

// initialize application
app.init();