import { EditorView, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view';
import { EditorState, StateField, EditorSelection, StateEffect } from '@codemirror/state';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap, foldAll, unfoldAll, syntaxTree, syntaxTreeAvailable } from '@codemirror/language';
import { history, undo, redo, indentWithTab, indentMore, indentLess, defaultKeymap, historyKeymap, toggleComment} from '@codemirror/commands';
import { openSearchPanel, gotoLine, highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { linter, lintKeymap, lintGutter } from '@codemirror/lint';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { html } from "@codemirror/lang-html";
import { css } from '@codemirror/lang-css';
import { colorPicker } from '@replit/codemirror-css-color-picker';
import { javascript, esLint } from "@codemirror/lang-javascript";
import * as eslint from "eslint-linter-browserify";
import { expandAbbreviation } from '@emmetio/codemirror6-plugin';
import { abbreviationTracker } from '@emmetio/codemirror6-plugin';

// Retrieve project JSON from localStorage or set default
const savedProject = localStorage.getItem('kodeWeave');
let defaultProject = {
  version: "1.1.50",
  settings: {
    autoupdate: true,
    console: true,
    fontSize: 16,
  },
  title: "An attractive title",
  description: "The most attractive description ever!",
  meta: ``,
  libraries: ['https://cdnjs.cloudflare.com/ajax/libs/picocss/1.5.7/pico.classless.min.css', 'https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css', 'https://michaelsboost.github.io/kodeWeave/go/libraries/tailwind/tailwind.min.js'],
  markdown: ``,
  html: ``,
  css: ``,
  javascript: ``
};
let project = savedProject ? JSON.parse(savedProject) : JSON.parse(JSON.stringify(defaultProject));

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
  ])
];
let activeEditor;

// init editors
const mdEditor = new EditorView({
  state: EditorState.create({
    doc: project.markdown,
    extensions: [
      basicSetup,
      EditorView.lineWrapping,
      keymap.of([
          indentWithTab,
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap
      ]),
      markdown({ 
        base: markdownLanguage, 
        codeLanguages: [], 
      }),
      colorPicker,
      abbreviationTracker(),
      EditorView.updateListener.of((v) => {
        if (autoupdate.checked) {
          app.updatePreview(autoupdate.checked);
        }
      }),
    ],
  }),
  docChanged: true,
  parent: document.getElementById('mdEditor'),
  allowMultipleSelections: true,
});
const htmlEditor = new EditorView({
  state: EditorState.create({
    doc: project.html,
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
      colorPicker,
      abbreviationTracker(),
      EditorView.updateListener.of((v) => {
        if (autoupdate.checked) {
          app.updatePreview(autoupdate.checked);
        }
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
      colorPicker,
      abbreviationTracker(),
      EditorView.updateListener.of((v) => {
        project.css        = cssEditor.state.doc.toString();

        if (autoupdate.checked) {
          const iframe = document.getElementById('preview');
          const idoc = iframe.contentDocument || iframe.contentWindow.document;
          idoc.getElementById("kodeWeaveCSSID").innerHTML = project.css;
        }
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
      colorPicker,
      abbreviationTracker(),
      EditorView.updateListener.of((v) => {
        if (autoupdate.checked) {
          app.updatePreview(autoupdate.checked);
        }
      }),
    ],
  }),
  docChanged: true,
  parent: document.getElementById('jsEditor'),
  allowMultipleSelections: true,
});

// Set doc values for each editor
mdEditor.state.update({
  changes: { from: 0, to: mdEditor.state.doc.length, insert: project.markdown }
});
htmlEditor.state.update({
  changes: { from: 0, to: htmlEditor.state.doc.length, insert: project.html }
});
cssEditor.state.update({
  changes: { from: 0, to: cssEditor.state.doc.length, insert: project.css }
});
jsEditor.state.update({
  changes: { from: 0, to: jsEditor.state.doc.length, insert: project.javascript }
});

activeEditor = htmlEditor;
let sortable;

const app = {
  appName: "kodeWeave",
  appVersion: defaultProject.version,
  appUrl: "https://github.com/michaelsboost/kodeWeave/tree/main",
  appLicense: "https://github.com/michaelsboost/kodeWeave/blob/main/LICENSE",

  // Function to handle storage and display of library/framework
  fetchSuggestions: searchText => {
    fetch(
      `https://api.cdnjs.com/libraries?search=${searchText}&fields=filename,description,version`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
        console.error("Error fetching data:", error);
      });
  },
  displaySuggestions: suggestions => {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = ""; // Clear previous suggestions

    suggestions.forEach(result => {
      const listItem = document.createElement("li");
      listItem.className = "list-none";
      listItem.innerHTML = `<div class="flex justify-between mb-2 font-bold text-1xl">
            <span>${result.name}</span>
            <span>${result.version}</span>
        </div>
        <div class="text-sm">${result.description}<br><hr></div>`;
      listItem.onclick = () => {
        // Add the clicked suggestion to the libraries array
        const url = result.latest; // Assuming 'latest' holds the URL
        project.libraries.push(url);
        // Clear the suggestions list
        suggestionsList.innerHTML = "";
        // Display the libraries display
        app.displayLibrariesArray();
        searchBox.value = "";
        app.updatePreview(autoupdate.checked);
      };
      suggestionsList.appendChild(listItem);
    });
  },
  displayLibrariesArray: () => {
    const librariesArray = project.libraries;
    let sortLibrariesContainer = document.getElementById("sortLibraries");
    sortLibrariesContainer.innerHTML = "";
    const embedArray = (result, index) => {
      const newNav = document.createElement('nav');
      newNav.className = "flex justify-between py-2";
      newNav.setAttribute('data-index', index);

      const sortButton = document.createElement('button');
      sortButton.className = 'p-3';
      sortButton.innerHTML = '<i class="fa fa-sort"></i>';
      sortButton.setAttribute('data-sort', index);

      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.placeholder =
        "https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js";
      newInput.setAttribute("data", "library");
      newInput.className = "w-full p-3 pr-0 rounded-md rounded-r-none bg-gray-800";
      newInput.value = result;
      newInput.onkeyup = () => {
        // Update the value of the librariesArray at the corresponding index
        librariesArray[index] = newInput.value.trim();
        app.updatePreview(autoupdate.checked);
      };

      const deleteButton = document.createElement("button");
      deleteButton.className =
        // "delete-button p-3 bg-red-400 rounded-md rounded-l-none";
        "delete-button p-3 bg-gray-800 rounded-md rounded-l-none";
      deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
      deleteButton.onclick = () => {
        // Remove the library from the array by its index
        project.libraries.splice(index, 1);
        // Re-render the libraries array
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
    if (
      librariesArray.length === 0 ||
      librariesArray[librariesArray.length - 1].trim() !== ""
    ) {
      embedArray("", librariesArray.length);
    }
  },

  // Ajax function to download over http
  getFile: (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = data => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.warn("request_error");
      }
    };
  },
  
  // zooming and panning function
	initZoomPan: () => {
		// variables
		let canvas = document.getElementById('previewElm');
		let canvasH = parseFloat(canvas.clientHeight);
		let canvasW = parseFloat(canvas.clientWidth / 2);

		// init panzoom
		let instance = panzoom(canvas, {
			bounds: true,
			boundsPadding: 0.1
		});

		let centerCanvas = () => {
      let canvas = document.getElementById('previewElm');
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
		};
		centerCanvas();

		// enable disable zoom/pan
		const zoomIcon = document.querySelector('[data-zoom]');
		zoomIcon.onclick = () => {
			if (zoomIcon.getAttribute('data-zoom') === 'true') {
				canvas.selection = false;
				instance.pause();
				zoomIcon.innerHTML = '<i class="fa fa-light fa-magnifying-glass-minus"></i>';
				zoomIcon.setAttribute('data-zoom', false);
				fill.classList.add('hidden');
			} else {
				canvas.selection = true;
				instance.resume();
				zoomIcon.innerHTML = '<i class="fa fa-light fa-magnifying-glass-plus"></i>';
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

    // display size
    let displaySize = () => {
			viewx.value = parseInt(canvas.style.width);
			viewy.value = parseInt(canvas.style.height);
    };

		// reset canvas dimentions and center it
		let resetCanvas = (w, h) => {
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
		  centerCanvas();
		};

		// reset canvas dimensions and center it
		// dimensions of Galaxy S8+ used
		mobilep.onclick = () => {
			resetCanvas(360, 740);
      displaySize();
		};
		mobilel.onclick = () => {
			resetCanvas(740, 360);
      displaySize();
		};

		// reset canvas dimensions and center it
		// dimensions of iPad Pro used
		tabletp.onclick = () => {
			resetCanvas(1024, 1366);
      displaySize();
		};
		tabletl.onclick = () => {
			resetCanvas(1366, 1024);
      displaySize();
		};

		// reset canvas dimensions and center it
		// 2015 15-inch retina macbook pro dimensions used
		desktopsize.onclick = () => {
			resetCanvas(1920, 1200);
      displaySize();
		};

		// manually reset canvas dimensions and center it
		viewx.onkeyup = () => {
			resetCanvas(viewx.value, viewy.value);
		};
		viewy.onkeyup = () => {
			resetCanvas(viewx.value, viewy.value);
		};
		mobilep.onclick();
	},

  // toggle side nav
  toggleSideNav: e => {
    const hideLists = () => {
      document.querySelectorAll('#sidenav ul').forEach(list => {
        list.classList.add('hidden');
      });
    };
  
    const openSideNav = targetId => {
      hideLists();
      document.getElementById(targetId).classList.remove('hidden');
    };
  
    // Only shows main side navigation
    document.querySelectorAll(`[data-openSide=${e}]`).forEach(btn => {
      btn.onclick = () => {
        openSideNav(e);
      };
    });
  
    // Open sub menu in side navigation
    document.querySelectorAll(`[data-closeSide=${e}]`).forEach(btn => {
      btn.onclick = () => {
        hideLists();
        mainsidenav.classList.remove('hidden'); // Assuming mainsidenav is defined somewhere
      };
    });
  },  

  // load and save settings
  loadSettings: () => {
    projectTitle.value    = project.title;
    projectDesc.value     = project.description;
    projectMeta.value     = project.meta;
    fz.value              = project.settings.fontSize;
    toggleconsole.checked = (project.settings.console) ? true : false;
  },
  saveSettings: () => {
    const handleKeyup = (element, property) => {
      element.onkeyup = () => {
        project[property] = element.value;
        localStorage.setItem('kodeWeave', JSON.stringify(project));
      };
    };

    handleKeyup(projectTitle, "title");
    handleKeyup(projectDesc, "description");
    handleKeyup(projectMeta, "meta");

    // Update project values immediately
    project.title             = projectTitle.value;
    project.description       = projectDesc.value;
    project.meta              = projectMeta.value;
    fz.onkeyup = () => {
      project.settings.fontSize = fz.value;
      localStorage.setItem('kodeWeave', JSON.stringify(project));
    };
},
  
  // Function to update previews
  updatePreview: (runManually = false) => {
    app.updateStorage();
    const generateHtmlCode = () => {
      const tailwindStyle =
        ".wrapper_yOR7u {left: 0!important; width: 100%!important; border-radius: 15px 15px 0 0!important; z-index: 99999999;} .btn_yOR7u { cursor: pointer; background: inherit; padding: 0 0.5rem; margin: inherit; margin-right: 0px; border: inherit; color: #fff!important; } .nav_yOR7u {padding-bottom: 14px!important;} .line_yOR7u {background: inherit!important;}";
      const consoleStyle = `<style>${tailwindStyle}</style>`;
      const addConsoleCSS = project.settings.console ? consoleStyle : "";
      const showConsole = project.settings.console
        ? `<script type="module" src="js/dom-console.js" defer></script>`
        : "";

        let libraryTags = '';
        const libraries = project.libraries;
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

      // render html
      return `<!DOCTYPE html>
<html>
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${project.description}">
    ${libraryTags}
    ${addConsoleCSS}
    ${showConsole}
    <style id="kodeWeaveCSSID">${project.css}</style>
  </head>
  <body>
    ${project.html}
    
    <script>
      ${project.javascript}
    </script>
  </body>
</html>`;
    };

    // Clear existing content in the preview element
    previewElm.innerHTML = `<iframe 
      id="preview"
      class="w-full h-full"
      sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups"></iframe>`;

    // Get the content document of the iframe
    const previewFrame = document.getElementById("preview");
    const previewDoc =
      previewFrame.contentDocument || previewFrame.contentWindow.document;

    // Open, write HTML code, and close the content document
    previewDoc.open();
    previewDoc.write(generateHtmlCode());
    previewDoc.close();
  },

  // Update localStorage
  updateStorage: () => {
    project.settings.autoupdate = autoupdate.checked;
    project.settings.console    = toggleconsole.checked;
    project.settings.fontSize   = fz.value;
    
    project.markdown   = mdEditor.state.doc.toString();
    project.html       = htmlEditor.state.doc.toString();
    project.css        = cssEditor.state.doc.toString();
    project.javascript = jsEditor.state.doc.toString();
    
    localStorage.setItem('kodeWeave', JSON.stringify(project));
  },

  // init new project
  newProject: () => {
    projectTitle.value = "";
    projectDesc.value = "";
    projectMeta.value = "";
    project.libraries = [];
    app.displayLibrariesArray();

    // Load code into appropriate editors
    function clearEditor(editor) {
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.toString().length,
          insert: "",
        },
      });
    }
    
    clearEditor(mdEditor);
    clearEditor(htmlEditor);
    clearEditor(cssEditor);
    clearEditor(jsEditor);
    
    // check if menu is checked and if so uncheck
    if (menu.checked) menu.onchange();

    app.updatePreview(autoupdate.checked);
  },

	// export project json
	exportProjectFile: () => {
		let blob = new Blob([JSON.stringify(project, null, 2)], {
			type: "application/json"
		});
		saveAs(blob, `${project.title.toString().toLowerCase().replace(/ /g,"")}-kodeWeave.json`);
    
    // check if menu is checked and if so uncheck
    if (menu.checked) menu.onchange();
	},
  
  // Exports zip file
  exportZip: () => {
    // check if menu is checked and if so uncheck
    if (menu.checked) menu.onchange();
    
    let zip = new JSZip();
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

    zip.file("README.md", project.markdown);
    zip.file("LICENSE.md", licenseStr);

    // Iterate over each library
    let libraryTags = '';
    let cssBundle = '/* imports */\n';
    let jsBundleFiles = "";
    project.libraries.forEach(library => {
      if (library.endsWith('.js')) {
        libraryTags += `<script src="${library}" defer></script>\n`;
        jsBundleFiles += `kWExportJSFiles.importJS("${library}");\n    `;
      } else if (library.endsWith('.css')) {
        libraryTags += `<link rel="stylesheet" href="${library}">\n`;
        cssBundle += `@import url('${library}');\n`;
      } else {
        // Assuming it's a Google font
        libraryTags += `<link href="${library}" rel="stylesheet">\n`;
        cssBundle += `@import url('${library}');\n`;
      }
    });

    // add project css after libraries have been added in a single css file
    cssBundle += project.css;

    zip.file("css/index.css", project.css);
    zip.file("css/bundle.css", cssBundle);
    zip.file("js/index.js", project.javascript);
    zip.file("js/bundle.js", `const kWExportJSFiles = {
  importJS: url => {
    let script = document.createElement("script");
    script.src = url;
    script.setAttribute("defer", "");
    document.head.appendChild(script);
  },

  init: () => {
    ${jsBundleFiles}
    setTimeout(() => kWExportJSFiles.importJS("js/index.js"), 100);
  }
};

kWExportJSFiles.init();`);
    zip.file("index.html", `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="description" content="${project.description}">
    <meta name="author" content="kodeWeave">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${project.title}">
    <meta name="apple-mobile-web-app-title" content="${project.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-navbutton-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-starturl" content="./index.html">
    <meta property="og:type"        content="website" />
    <meta property="og:title"       content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <link rel="stylesheet" href="css/bundle.css">
  </head>
  <body>
    ${project.html}
  
    <script src="js/bundle.js"></script>
  </body>
</html>`);

    // finally export the project as zip file
    let content = zip.generate({ type: "blob" });
    saveAs(content, `${project.title.toString().toLowerCase().replace(/ /g,"")}-kodeWeave.zip`);
  },
	
  // share weave
  shareWeave: () => {
    const data = {
        title: project.title,
        description: project.description,
        html: project.html,
        css: project.css,
        js: project.javascript,
        css_external: project.libraries.filter(lib => lib.endsWith('.css')).join(';'),
        js_external: project.libraries.filter(lib => lib.endsWith('.js')).join(';'),
        editors: '000',
        layout: 'left'
    };

    // Stringify the JSON object and escape quotes
    const JSONstring = JSON.stringify(data)
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    // Create form element
    const form = `
        <form action="https://codepen.io/pen/define" method="POST" target="_blank">
            <input type="hidden" name="data" value='${JSONstring}'>
            <input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button">
        </form>`;

    // Append form to the document body and submit
    document.body.insertAdjacentHTML('beforeend', form);
    document.querySelector('form').submit();
  },

  // Initiate function
  init: () => {
    // Place app name and version
    document.getElementById("appName").textContent = app.appName;
    document.getElementById("appVersion").textContent = app.appVersion;
    document.getElementById("appUrl").href = app.appUrl;
    document.getElementById("appLicense").href = app.appLicense;

    // load project meta data
    app.loadSettings();
    
    // save project meta data
    app.saveSettings();

    // init toggle settings for side nav
    app.toggleSideNav('settings');

    // toggle menu
    menu.onchange = () => {
      document.querySelector('label[for=menu]').classList.toggle('text-blue-500');
      sidenav.classList.toggle('hidden');
    };

		// Create a function to dynamically create and append the navbar
    const createNavbar = container => {
      // Create the main nav element
      const navbar = document.createElement('nav');
      // navbar.className = 'absolute bottom-10 inset-x-0 px-4 text-center inline-block overflow-auto';
      const navbar2 = document.createElement('nav');
      // navbar2.className = 'absolute bottom-0 inset-x-0 px-4 text-center inline-block overflow-auto';
    
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
    const tabButtons = document.querySelectorAll("[data-toggletab]");
    const tabContent = document.querySelectorAll("[data-tabcontent]");

    tabButtons.forEach(button => {
      button.addEventListener("click", function () {
        // Check if the clicked button already has the text-blue-500 class
        const isAlreadyActive = this.classList.contains("text-blue-500");

        // Remove text-blue-500 from all buttons
        tabButtons.forEach(btn => btn.classList.remove("text-blue-500", "border-b", "border-blue-500"));

        // Hide all tab contents
        tabContent.forEach(tab => tab.classList.add("hidden"));

        if (!isAlreadyActive) {
          // If the clicked button wasn't active, add text-blue-500 and show corresponding tab
          this.classList.add("text-blue-500", "border-b", "border-blue-500");
          const tabName = this.getAttribute("data-toggletab");
          const selectedTab = document.querySelector(
            `[data-tabcontent="${tabName}"]`
          );
          selectedTab.classList.remove("hidden");

					if (tabName === 'markdown') {
					  document.querySelector('[data-editorHTMLNavbar]').innerHTML = '';
					  document.querySelector('[data-editorCSSNavbar]').innerHTML = '';
					  document.querySelector('[data-editorJSNavbar]').innerHTML = '';
            activeEditor = mdEditor;
		        createNavbar("editorMDNavbar");
					}
					if (tabName === 'html') {
					  document.querySelector('[data-editorMDNavbar]').innerHTML = '';
					  document.querySelector('[data-editorCSSNavbar]').innerHTML = '';
					  document.querySelector('[data-editorJSNavbar]').innerHTML = '';
            activeEditor = htmlEditor;
		        createNavbar("editorHTMLNavbar");
					}
					if (tabName === 'css') {
					  document.querySelector('[data-editorMDNavbar]').innerHTML = '';
					  document.querySelector('[data-editorHTMLNavbar]').innerHTML = '';
					  document.querySelector('[data-editorJSNavbar]').innerHTML = '';
            activeEditor = cssEditor;
		        createNavbar("editorCSSNavbar");
					}
					if (tabName === 'javascript') {
					  document.querySelector('[data-editorMDNavbar]').innerHTML = '';
					  document.querySelector('[data-editorHTMLNavbar]').innerHTML = '';
					  document.querySelector('[data-editorCSSNavbar]').innerHTML = '';
            activeEditor = jsEditor;
		        createNavbar("editorJSNavbar");
					}
        } else {
          // If the clicked button was already active, hide it's content
          const tabName = this.getAttribute("data-toggletab");
          const selectedTab = document.querySelector(
            `[data-toggletab="${tabName}"]`);
          const selectedTabContent = document.querySelector(
            `[data-tabcontent="${tabName}"]`);
          selectedTab.classList.remove("text-blue-500", "border-b", "border-blue-500");
          selectedTabContent.classList.add("hidden");
        }
      });
    });
    
    // init zooming and panning
    app.initZoomPan();

    // toggle auto update
    autoupdate.onchange = () => {
      run.classList.toggle('hidden', autoupdate.checked);
      app.updatePreview(autoupdate.checked);
    };
    
    // toggle console
    toggleconsole.onchange = () => {
      project.settings.console = toggleconsole.checked;
      app.updatePreview(autoupdate.checked);
    };

    // displays and handles libraries array
    app.displayLibrariesArray();
    const sortLibrariesContainer = document.getElementById("sortLibraries");
    const searchBox = document.getElementById("searchBox");
    const suggestionsList = document.getElementById("suggestions");
    const searchFunc = () => {
      const searchText = searchBox.value.trim();
      suggestionsList.innerHTML = "";
      if (!searchBox.value) {
        suggestionsList.innerHTML = "";
        return false;
      }

      if (searchText.length <= 0) {
        suggestionsList.innerHTML = "";
        return false;
      } else {
        app.fetchSuggestions(searchText);
      }
    };
    searchBox.onkeyup = () => searchFunc();
    searchBox.onchange = () => searchFunc();
    addanother.onclick = () => app.displayLibrariesArray();

    // init new project
    newProj.onclick = () => app.newProject();

    // function to load json file
    document.getElementById('importProject').onchange = () => {
      let reader = new FileReader();
    
      reader.onload = e => {
        // grab file
        project = JSON.parse(e.target.result);
        if (app.appVersion.localeCompare(project.version) > 0) {
          alert("Version must be 1.1.50 or greater!");
          return false;
        }
        
        // Update settings
        autoupdate.checked    = (project.settings.autoupdate) ? false : false;
        toggleconsole.checked = (project.settings.console) ? true : false;
        document.getElementById("fz").value           = project.settings.fontSize;
        document.getElementById("projectTitle").value = project.title;
        document.getElementById("projectDesc").value  = project.description;
        document.getElementById("projectMeta").value  = project.meta;
        let cmEditor = document.querySelectorAll('.cm-editor');
        cmEditor.forEach((child) => {
          child.style.fontSize = `${fz.value}px`
        });
      
        // Load code into appropriate editors
        function dispatchChanges(editor, content) {
          editor.dispatch({
            changes: {
              from: 0,
              to: editor.state.doc.toString().length,
              insert: content,
            },
          });
        }
        dispatchChanges(mdEditor, project.markdown);
        dispatchChanges(htmlEditor, project.html);
        dispatchChanges(cssEditor, project.css);
        dispatchChanges(jsEditor, project.javascript);        
      
        // render previews
        app.displayLibrariesArray();
    
        // check if menu is checked and if so uncheck
        if (menu.checked) menu.onchange();
        
        app.updatePreview(autoupdate.checked);
      }
      reader.readAsText(document.getElementById('importProject').files[0]);
    };

    // export project file
    exportProj.onclick = () => app.exportProjectFile();

    // export project as zip file
    exportZip.onclick = () => app.exportZip();

    // function to share weave
    shareWeave.onclick = () => app.shareWeave();
  }
};

// check if FileReader API is available
if (!window.FileReader) {
  alert("File API & FileReader API not supported!");
}

app.init();