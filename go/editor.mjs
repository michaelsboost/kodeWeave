import { EditorView } from '@codemirror/view';
import { lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from '@codemirror/language';
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { linter, lintKeymap, lintGutter } from '@codemirror/lint';
import { javascript, esLint } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import * as eslint from "eslint-linter-browserify";
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
    lintGutter(),
];
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
        if (autoupdate.checked) app.updatePreview();
      }),
    ],
  }),
  parent: document.getElementById('htmlEditor'),
});
const jsEditor = new EditorView({
  state: EditorState.create({
    extensions: [
      basicSetup, 
      EditorView.lineWrapping,
      keymap.of([
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
        if (autoupdate.checked) app.updatePreview();
      }),
    ],
  }),
  parent: document.getElementById('jsEditor'),
});

// project json
let appJSON = {
  name:  'AppName',
  title: 'An attractive title',
  description: 'The most attractive description ever!',
  version: '0.1',
  author: 'kodeWeave',
  website: '',
  scratchpad: '',
  analytics: '',
  logo: logo.src,
  css: 'picocss',
  theme: false,
  autoupdate: false,
  console: true,
  pwa: false,
  fontawesome: false,
  html: '',
  javascript: ''
};

let cssObj = {
  id: [],
  data: []
};

const app = {
  // dynamically load js file function
  dynamicallyLoadScript: (url) => {
    // dynamically load a css file
    if (url.substring(url.length - 3).toLowerCase() === 'css') {
      let link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.href = url;

      document.head.appendChild(link);
      return false;
    }
    // dynamically load a javascript file
    if (url.substring(url.length - 2).toLowerCase() === 'js') {
      let script = document.createElement('script');
      script.src = url;
      script.setAttribute('defer', '');
    
      document.head.appendChild(script);
    }
  },

  // zooming and panning function
  initZoomPan: () => {
    // variables
    const userDevice    = document.querySelector('[data-device]');
    let canvas          = document.querySelector('[data-canvas]');
    let canvasH         = parseFloat(canvas.clientHeight);
    let canvasW         = parseFloat(canvas.clientWidth / 2);
  
    // init panzoom
    let instance = panzoom(canvas, {
      bounds: true,
      boundsPadding: 0.1
    });
  
    let centerCanvas = () => {
      let canvas          = document.querySelector('[data-canvas]');
      let canvasH         = parseFloat(canvas.clientHeight);
      let canvasW         = parseFloat(canvas.clientWidth / 2);
      canvasW = parseFloat(canvas.clientWidth);
      canvasH = parseFloat(canvas.clientHeight);
  
      // detect if canvas is in portrait mode
      if (canvasW < canvasH) {
        // ratio for zoom
        let zoomRatio = 0.75;
      
        // to center the canvas horizontally we first need to...
        // get half the body & canvas's width
        let bodyW   = parseFloat(canvas.parentElement.clientWidth / 2);
        canvasW = parseFloat(canvas.clientWidth / 2);
        // then add them together
        let initialXPos = parseFloat(parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio);
      
        // to center the canvas vertically we first need to...
        // get the size of both the body and the canvas
        let bodyH   = parseFloat(canvas.parentElement.clientHeight);
        bodyH   = bodyH / 2;
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
        return false;
      }
  
      // ratio for zoom
      let zoomRatio = 0.75;
  
      // to center the canvas horizontally we first need to...
      // get half the body & canvas's width
      let bodyW   = parseFloat(canvas.parentElement.clientWidth / 2);
      canvasW = parseFloat(canvas.clientWidth / 2);
      // then add them together
      let initialXPos = parseFloat(parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio);
  
      // to center the canvas vertically we first need to...
      // get the size of both the body and the canvas
      let bodyH   = parseFloat(canvas.parentElement.clientHeight);
      bodyH   = bodyH / 2;
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
    rotate.onclick = () => {
      canvasW = parseFloat(canvas.clientWidth);
      canvasH = parseFloat(canvas.clientHeight);
  
      canvas.style.width  = canvasH + 'px';
      canvas.style.height = canvasW + 'px';
      centerCanvas();
    };

    // reset canvas dimentions and center it
    let resetCanvas = (w, h) => {
      canvasW = w;
      canvasH = h;

      if (canvasW > canvasH) {
        // landscape
        canvas.style.width  = canvasW + 'px';
        canvas.style.height = canvasH + 'px';
        centerCanvas();
        return false;
      }
    
      canvas.style.width  = canvasH + 'px';
      canvas.style.height = canvasW + 'px';
      centerCanvas();
    };
  
    // toggle between mobile and desktop view
    userDevice.onclick = () => {
      if (userDevice.getAttribute('data-device') === 'mobile') {
        userDevice.setAttribute('data-device', 'tablet');
        userDevice.innerHTML = '<i class="fa fa-tablet"></i>';
        
        // reset canvas dimensions and center it
        // dimensions of iPad Mini used
        resetCanvas(1024, 768);
        return false;
      }
      if (userDevice.getAttribute('data-device') === 'tablet') {
        userDevice.setAttribute('data-device', 'desktop');
        userDevice.innerHTML = '<i class="fa fa-desktop"></i>';
  
        // reset canvas dimensions and center it
        // 2012 macbook pro dimensions used
        resetCanvas(1440, 834);
        return false;
      }
      if (userDevice.getAttribute('data-device') === 'desktop') {
        userDevice.setAttribute('data-device', 'mobile');
        userDevice.innerHTML = '<i class="fa fa-mobile"></i>';
  
        // reset canvas dimensions and center it
        // dimensions of Galaxy S8+ used
        resetCanvas(360, 740);
        return false;
      }
    };
  },

  // initalize application function
  init: () => {
    // check localStorage
    if (!localStorage.getItem('kodeWeave')) {
      appname.value     = appJSON.name;
      title.value       = appJSON.title;
      description.value = appJSON.description;
      version.value     = appJSON.version;
      author.value      = appJSON.author;
    } else {
      appJSON = JSON.parse(localStorage.getItem('kodeWeave'));

      let js = appJSON.javascript;
      appname.value               = appJSON.name;
      title.value                 = appJSON.title;
      description.value           = appJSON.description;
      version.value               = appJSON.version;
      author.value                = appJSON.author;
      website.value               = appJSON.website;
      googleanalytics.value       = appJSON.analytics;
      logo.src                    = appJSON.logo;
      scratchpad.value            = appJSON.scratchpad;
      css.value                   = appJSON.css;
      theme.checked               = (appJSON.theme)       ? true : false;
      autoupdate.checked          = (appJSON.autoupdate)  ? true : false;
      toggleconsole.checked       = (appJSON.console)     ? true : false;
      pwa.checked                 = (appJSON.pwa)         ? true : false;
      fa.checked                  = (appJSON.fontawesome) ? true : false;
      htmlEditor.dispatch({
        changes: {
          from: 0,
          to: htmlEditor.state.doc.toString().length,
          insert: appJSON.html,
        },
      });
      jsEditor.dispatch({
        changes: {
          from: 0,
          to: jsEditor.state.doc.toString().length,
          insert: js,
        },
      });
    }

    if (appJSON.autoupdate) run.classList.add('hidden');

    // dynamically load scripts
    // app.dynamicallyLoadScript('libraries/panzoom/panzoom.mod.js');
    // app.dynamicallyLoadScript('libraries/jszip/Blob.js');
    // app.dynamicallyLoadScript('libraries/jszip/FileSaver.js');
    // app.dynamicallyLoadScript('libraries/jszip/jszip-utils.js');
    // app.dynamicallyLoadScript('libraries/jszip/jszip.min.js');

    // init zooming and panning
    app.initZoomPan();

    // Convert logo to png images for manifest.json
    let embedImage = (source, size) => {
      // Load images
      let image = new Image();
      image.src = source;
      image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(this, 0, 0, size, size);
        let imageURL = canvas.toDataURL("image/png");
        let newImage = document.createElement("img");
            newImage.classList.add("hidden");
            newImage.setAttribute("data-image", "");
            newImage.src = imageURL;

        // Append new image
        document.body.appendChild(newImage);
      };
    };
    
    // function to load an image as base64
    document.getElementById('import').onchange = () => {
      let reader = new FileReader();
    
      reader.onload = (e) => {
        // grab file
        appJSON = JSON.parse(e.target.result);
    
        let js = appJSON.javascript;
        appname.value               = appJSON.name;
        title.value                 = appJSON.title;
        description.value           = appJSON.description;
        version.value               = appJSON.version;
        author.value                = appJSON.author;
        website.value               = appJSON.website;
        googleanalytics.value       = appJSON.analytics;
        logo.src                    = appJSON.logo;
        scratchpad.value            = appJSON.scratchpad;
        css.value                   = appJSON.css;
        theme.checked               = (appJSON.theme)       ? true : false;
        if (css.value === 'tailwind') theme.parentElement.parentElement.classList.add('hidden');
        autoupdate.checked          = (appJSON.autoupdate)  ? true : false;
        toggleconsole.checked       = (appJSON.console)     ? true : false;
        pwa.checked                 = (appJSON.pwa)         ? true : false;
        fa.checked                  = (appJSON.fontawesome) ? true : false;
        htmlEditor.dispatch({
          changes: {
            from: 0,
            to: htmlEditor.state.doc.toString().length,
            insert: appJSON.html,
          },
        });
        jsEditor.dispatch({
          changes: {
            from: 0,
            to: jsEditor.state.doc.toString().length,
            insert: js,
          },
        });
      };
      reader.readAsText(document.getElementById('import').files[0]);

      // close settings
      document.getElementById('settings').removeAttribute('open');
    };
    
    // function to load logo
    importlogo.onchange = () => {
      let reader = new FileReader();
    
      reader.onload = (e) => {
        // grab file
        logo.src = e.target.result;
        app.updateStorage();

        // remove images if they already exist for exporting
        if (document.querySelector('[data-image]')) {
          document.querySelectorAll('[data-image]').forEach((child, index) => {
            child.remove();
          });
        }

        // convert create logo image sizes for manifest.json
        let imageArr = ['192', '256', '384', '512', logo.width];
        for (let i of imageArr) {
          embedImage(logo.src, i);
        }
      };
      reader.readAsDataURL(importlogo.files[0]);
    };

    // convert create logo image sizes for manifest.json
    let imageArr = ['192', '256', '384', '512', logo.width];
    for (let i of imageArr) {
      embedImage(logo.src, i);
    }
    
    // export json
    exportJSON.onclick = () => {
      let blob = new Blob([JSON.stringify(appJSON)], {type: "application/json"});
      saveAs(blob, `${appJSON.name.toString().toLowerCase().replace(/ /g,"")}-kodeWeave.json`);
    };
    
    // ajax function to get source of a file
    let getFile = (url, callback) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send();
    
      xhr.onreadystatechange = (data) => {
        if (xhr.readyState !== 4) {
          return;
        }
    
        if (xhr.status === 200) {
          callback(xhr.responseText);
        } else {
          console.warn("request_error");
        }
      };
    };
    
    // export zip
    exportZip.onclick = () => {
      if (!appname.value || !title.value || !description.value || !version.value || !author.value) {
        alert('Error: Cannot cancelled! Reason: "Missing some metadata!"');
        return false;
      }

      let manifestJSONCode = `{
"theme_color":      "hsl(207, 31%, 11%)",
"background_color": "hsl(207, 31%, 11%)",
"display":      "standalone",
"start_url":    "./index.html",
"lang":         "en-US",
"name":         "${appJSON.name}",
"short_name":   "${appJSON.name}",
"description" : "${appJSON.description}",
"icons": [
  {
    "src":     "./imgs/icon-192x192.png",
    "sizes":   "192x192",
    "type":    "image/png",
    "purpose": "any"
  },
  {
    "src":     "./imgs/icon-256x256.png",
    "sizes":   "256x256",
    "type":    "image/png",
    "purpose": "any"
  },
  {
    "src":     "./imgs/icon-384x384.png",
    "sizes":   "384x384",
    "type":    "image/png",
    "purpose": "any"
  },
  {
    "src":     "./imgs/icon-512x512.png",
    "sizes":   "512x512",
    "type":    "image/png",
    "purpose": "maskable"
  }
]
}`;
      let packageJSONCode = `{
"name": "${appJSON.name.toLowerCase().trim()}",
"version": "${appJSON.version}",
"description": "${appJSON.description}",
"main": "index.js",
"scripts": {
  "serve": "http-server -p 1336 build -c-1"
},
"author": "${appJSON.author}",
"license": "MIT"
}`;
      let readmeCode = `${appJSON.name}
===================

${appJSON.description}

Version
-------------

${appJSON.version}

License
-------------

MIT

This app was created and exported with [kodeWeave](https://michaelsboost.github.io/kodeWeave/)`;
      let licenseStr = `The MIT License (MIT)
Copyright (c) ${new Date().getFullYear()} ${appJSON.author}

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
      let swCode = `
"./manifest.json",
"./imgs/logo.png",
"./imgs/logo.svg",
"./index.html",
"./css/style.css",
"./js/app.js",
"./js/app.min.js",
"./libraries/font-awesome/css/all.css",
"./libraries/font-awesome/css/all.min.css",
"./libraries/font-awesome/css/brands.css",
"./libraries/font-awesome/css/brands.min.css",
"./libraries/font-awesome/css/fontawesome.css",
"./libraries/font-awesome/css/fontawesome.min.css",
"./libraries/font-awesome/css/regular.css",
"./libraries/font-awesome/css/regular.min.css",
"./libraries/font-awesome/css/solid.css",
"./libraries/font-awesome/css/solid.min.css",
"./libraries/font-awesome/css/svg-with-js.css",
"./libraries/font-awesome/css/svg-with-js.min.css",
"./libraries/font-awesome/css/v4-font-face.css",
"./libraries/font-awesome/css/v4-font-face.min.css",
"./libraries/font-awesome/css/v4-shims.css",
"./libraries/font-awesome/css/v4-shims.min.css",
"./libraries/font-awesome/css/v5-font-face.css",
"./libraries/font-awesome/css/v5-font-face.min.css",
"./libraries/font-awesome/js/all.js",
"./libraries/font-awesome/js/all.min.js",
"./libraries/font-awesome/js/brands.js",
"./libraries/font-awesome/js/brands.min.js",
"./libraries/font-awesome/js/conflict-detection.js",
"./libraries/font-awesome/js/conflict-detection.min.js",
"./libraries/font-awesome/js/fontawesome.js",
"./libraries/font-awesome/js/fontawesome.min.js",
"./libraries/font-awesome/js/regular.js",
"./libraries/font-awesome/js/regular.min.js",
"./libraries/font-awesome/js/solid.js",
"./libraries/font-awesome/js/solid.min.js",
"./libraries/font-awesome/js/v4-shims.js",
"./libraries/font-awesome/js/v4-shims.min.js",
"./libraries/font-awesome/LICENSE.txt",
"./libraries/font-awesome/webfonts/fa-brands-400.ttf",
"./libraries/font-awesome/webfonts/fa-brands-400.woff2",
"./libraries/font-awesome/webfonts/fa-regular-400.ttf",
"./libraries/font-awesome/webfonts/fa-regular-400.woff2",
"./libraries/font-awesome/webfonts/fa-solid-900.ttf",
"./libraries/font-awesome/webfonts/fa-solid-900.woff2",
"./libraries/font-awesome/webfonts/fa-v4compatibility.ttf",
"./libraries/font-awesome/webfonts/fa-v4compatibility.woff2"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
e.waitUntil(
  caches.open(cacheName).then(function(cache) {
    return cache.addAll(filesToCache);
  })
);
self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
e.respondWith(
  caches.match(e.request).then(function(response) {
    return response || fetch(e.request);
  })
);
});`;
      let swStart = `
  "./manifest.json",
  "./imgs/logo.png",
  "./imgs/logo.svg",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/bundle.js"`;
      let swEnd = `

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
e.waitUntil(
caches.open(cacheName).then(function(cache) {
return cache.addAll(filesToCache);
})
);
self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
e.respondWith(
caches.match(e.request).then(function(response) {
return response || fetch(e.request);
})
);
});`;
      let pwaHTML = `
      <script>
        // service worker for progressive web app
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js');
          });
        }
      </script>`;
      let pwaHTMLCheck = (appJSON.pwa) ? pwaHTML : ``;

      if (appJSON.fontawesome) {
      // join font awesome library into users new project
      JSZipUtils.getBinaryContent("../zips/font-awesome.zip", function(err, data) {
        if(err) {
          throw err; // or handle err
        }
    
        let zip = new JSZip(data);

        // save css libraries/frameworks
        let cssortailwind, forJSfile = '';
        if (css.value === 'picocss') {
          zip.file("libraries/pico/pico.classless.min.css", cssObj.data[0]);

          // variable for the service worker
          cssortailwind = `"./libraries/pico/pico.classless.min.css",`;
        }
        if (css.value === 'tailwind') {
          zip.file("libraries/tailwind/tailwind.min.js",  cssObj.data[0]);
          zip.file("libraries/tailwind/tailwind.min.css", cssObj.data[1]);

          // variable for the app.min.js file
          forJSfile = cssObj.data[0];

          // variable for the service worker
          cssortailwind = `"./libraries/tailwind/tailwind.min.css",
  "./libraries/tailwind/tailwind.min.js",`;
        }
        if (css.value === 'both') {
          zip.file("libraries/pico/pico.classless.min.css", cssObj.data[0]);
          zip.file("libraries/tailwind/tailwind-mod.min.css", cssObj.data[1]);

          // variable for the service worker
          cssortailwind = `"./libraries/pico/pico.classless.min.css",
  "./libraries/tailwind/tailwind-mod.min.css",`;
        }
    
        const base64Content = logo.src;
        // base64 encoded data doesn't contain commas    
        let base64ContentArray = base64Content.split(",");
        // base64 content cannot contain whitespaces but nevertheless skip if there are!
        let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];
    
        let logoType;
        if (mimeType === 'image/png') {
          zip.file("imgs/logo.png", logo.src.split('base64,')[1],{base64: true});
          logoType = 'png';
        }
        if (mimeType === 'image/jpeg') {
          zip.file("imgs/logo.jpeg", logo.src.split('base64,')[1],{base64: true});
          logoType = 'jpeg';
        }
        if (mimeType === 'image/svg+xml') {
          zip.file("imgs/logo.svg", logo.src.split('base64,')[1],{base64: true});
          logoType = 'svg';
        }

        // save images for manifest.json
        zip.file("imgs/icon-192x192.png", document.querySelectorAll('[data-image]')[0].src.split('base64,')[1],{base64: true});
        zip.file("imgs/icon-256x256.png", document.querySelectorAll('[data-image]')[1].src.split('base64,')[1],{base64: true});
        zip.file("imgs/icon-384x384.png", document.querySelectorAll('[data-image]')[2].src.split('base64,')[1],{base64: true});
        zip.file("imgs/icon-512x512.png", document.querySelectorAll('[data-image]')[3].src.split('base64,')[1],{base64: true});
        zip.file("imgs/logo.png",         document.querySelectorAll('[data-image]')[4].src.split('base64,')[1],{base64: true});

        let cssLib, cssImport, picotheme = '';

        // if user is just using picocss
        if (css.value === 'picocss') {
          cssLib    = `<link rel="stylesheet" href="css/style.css" />`;
          cssImport = `@import url('../libraries/pico/pico.classless.min.css');`;

          if (appJSON.theme === true) {
            picotheme = `data-theme="dark"`;
          }
          if (appJSON.theme === false) {
            picotheme = `data-theme="light"`;
          }
        }
        // if user is just using tailwind
        if (css.value === 'tailwind') {
          cssLib = `<link rel="stylesheet" href="css/style.css" />`;
          cssImport = `@import url('../libraries/tailwind/tailwind.min.css');`;
        }

        // if user is using picocss and tailwind
        if (css.value === 'both') {
          cssLib = `<link rel="stylesheet" href="css/style.css" />`;
          cssImport = `@import url('../libraries/pico/pico.classless.min.css');
@import url('../libraries/tailwind/tailwind-mod.min.css');`;

          if (appJSON.theme === true) {
            picotheme = `data-theme="dark"`;
          }
          if (appJSON.theme === false) {
            picotheme = `data-theme="light"`;
          }
        }

        zip.file("js/app.js", appJSON.javascript);
        zip.file("js/bundle.js", `${forJSfile}${(appJSON.javascript === '') ? '' : appJSON.javascript.toString()}`);
        zip.file("css/style.css", `/* imports */
${cssImport}
@import url('../libraries/font-awesome/css/all.min.css');`);
        zip.file("index.html", `<!DOCTYPE html>
<html lang="en-US" ${picotheme}>
  <head>
    <title>${appJSON.title}</title>
    <meta charset="utf-8">
    <meta name="description" content="${appJSON.description}">
    <meta name="author" content="${appJSON.author}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="manifest.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${appJSON.name}">
    <meta name="apple-mobile-web-app-title" content="${appJSON.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-navbutton-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-starturl" content="./index.html">
    <link rel="apple-touch-icon" href="imgs/logo.${logoType}">
    <link rel="icon" href="imgs/logo.${logoType}" type="image/x-icon" />
    ${cssLib}
  </head>
  <body>
${htmlEditor.state.doc.toString()}
  
    <script src="js/bundle.js"></script>${pwaHTMLCheck}
  </body>
</html>`);
        zip.file("README.md", readmeCode);
        zip.file("manifest.json", manifestJSONCode);
        zip.file("package.json", packageJSONCode);
        zip.file("LICENSE.md", licenseStr);

        if (appJSON.pwa) {
          zip.file("sw.js", `let cacheName    = "${appJSON.name}";
let filesToCache = [
  "./",
  ${cssortailwind}
  ${swStart},
  "./libraries/font-awesome/css/all.css",
  "./libraries/font-awesome/css/all.min.css",
  "./libraries/font-awesome/css/brands.css",
  "./libraries/font-awesome/css/brands.min.css",
  "./libraries/font-awesome/css/fontawesome.css",
  "./libraries/font-awesome/css/fontawesome.min.css",
  "./libraries/font-awesome/css/regular.css",
  "./libraries/font-awesome/css/regular.min.css",
  "./libraries/font-awesome/css/solid.css",
  "./libraries/font-awesome/css/solid.min.css",
  "./libraries/font-awesome/css/svg-with-js.css",
  "./libraries/font-awesome/css/svg-with-js.min.css",
  "./libraries/font-awesome/css/v4-font-face.css",
  "./libraries/font-awesome/css/v4-font-face.min.css",
  "./libraries/font-awesome/css/v4-shims.css",
  "./libraries/font-awesome/css/v4-shims.min.css",
  "./libraries/font-awesome/css/v5-font-face.css",
  "./libraries/font-awesome/css/v5-font-face.min.css",
  "./libraries/font-awesome/js/all.js",
  "./libraries/font-awesome/js/all.min.js",
  "./libraries/font-awesome/js/brands.js",
  "./libraries/font-awesome/js/brands.min.js",
  "./libraries/font-awesome/js/conflict-detection.js",
  "./libraries/font-awesome/js/conflict-detection.min.js",
  "./libraries/font-awesome/js/fontawesome.js",
  "./libraries/font-awesome/js/fontawesome.min.js",
  "./libraries/font-awesome/js/regular.js",
  "./libraries/font-awesome/js/regular.min.js",
  "./libraries/font-awesome/js/solid.js",
  "./libraries/font-awesome/js/solid.min.js",
  "./libraries/font-awesome/js/v4-shims.js",
  "./libraries/font-awesome/js/v4-shims.min.js",
  "./libraries/font-awesome/LICENSE.txt",
  "./libraries/font-awesome/webfonts/fa-brands-400.ttf",
  "./libraries/font-awesome/webfonts/fa-brands-400.woff2",
  "./libraries/font-awesome/webfonts/fa-regular-400.ttf",
  "./libraries/font-awesome/webfonts/fa-regular-400.woff2",
  "./libraries/font-awesome/webfonts/fa-solid-900.ttf",
  "./libraries/font-awesome/webfonts/fa-solid-900.woff2",
  "./libraries/font-awesome/webfonts/fa-v4compatibility.ttf",
  "./libraries/font-awesome/webfonts/fa-v4compatibility.woff2"
];${swEnd}`);
        }
    
        let content = zip.generate({type:"blob"});
        saveAs(content, `${appJSON.name.toString().toLowerCase().replace(/ /g,"")}.zip`);
        return false;
      });

      return false;
      }

      // join font awesome library into users new project
        let zip = new JSZip();

        // save css libraries/frameworks
        let cssortailwind, forJSfile = '';
        if (css.value === 'picocss') {
          zip.file("libraries/pico/pico.classless.min.css", cssObj.data[0]);

          // variable for the service worker
          cssortailwind = `"./libraries/pico/pico.classless.min.css",`;
        }
        if (css.value === 'tailwind') {
          zip.file("libraries/tailwind/tailwind.min.js",  cssObj.data[0]);
          zip.file("libraries/tailwind/tailwind.min.css", cssObj.data[1]);

          // variable for the bundle.js file
          forJSfile = cssObj.data[0];

          // variable for the service worker
          cssortailwind = `"./libraries/tailwind/tailwind.min.css",
  "./libraries/tailwind/tailwind.min.js",`;
        }
        if (css.value === 'both') {
          zip.file("libraries/pico/pico.classless.min.css", cssObj.data[0]);
          zip.file("libraries/tailwind/tailwind-mod.min.css", cssObj.data[1]);

          // variable for the service worker
          cssortailwind = `"./libraries/pico/pico.classless.min.css",
  "./libraries/tailwind/tailwind-mod.min.css",`;
        }
    
        const base64Content = logo.src;
        // base64 encoded data doesn't contain commas    
        let base64ContentArray = base64Content.split(",");
        // base64 content cannot contain whitespaces but nevertheless skip if there are!
        let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];
    
        let logoType;
        if (mimeType === 'image/png') {
          zip.file("imgs/logo.png", logo.src.split('base64,')[1],{base64: true});
          logoType = 'png';
        }
        if (mimeType === 'image/jpeg') {
          zip.file("imgs/logo.jpeg", logo.src.split('base64,')[1],{base64: true});
          logoType = 'jpeg';
        }
        if (mimeType === 'image/svg+xml') {
          zip.file("imgs/logo.svg", logo.src.split('base64,')[1],{base64: true});
          logoType = 'svg';
        }

        // save images for manifest.json
        zip.file("imgs/icon-192x192.png", document.querySelectorAll('[data-image]')[0].src.split('base64,')[1],{base64: true});
        zip.file("imgs/icon-256x256.png", document.querySelectorAll('[data-image]')[1].src.split('base64,')[1],{base64: true});
        zip.file("imgs/icon-384x384.png", document.querySelectorAll('[data-image]')[2].src.split('base64,')[1],{base64: true});
        zip.file("imgs/icon-512x512.png", document.querySelectorAll('[data-image]')[3].src.split('base64,')[1],{base64: true});
        zip.file("imgs/logo.png",         document.querySelectorAll('[data-image]')[4].src.split('base64,')[1],{base64: true});

        let cssLib, cssImport, picotheme = '';
        // if user is just using picocss
        if (css.value === 'picocss') {
          cssLib    = `<link rel="stylesheet" href="css/style.css" />`;
          cssImport = `@import url('../libraries/pico/pico.classless.min.css');`;

          if (appJSON.theme === true) {
            picotheme = `data-theme="dark"`;
          }
          if (appJSON.theme === false) {
            picotheme = `data-theme="light"`;
          }
        }
        // if user is just using tailwind
        if (css.value === 'tailwind') {
          cssLib = `<link rel="stylesheet" href="css/style.css" />`;
          cssImport = `@import url('../libraries/tailwind/tailwind.min.css');`;
        }

        // if user is using picocss and tailwind
        if (css.value === 'both') {
          cssLib = `<link rel="stylesheet" href="css/style.css" />`;
          cssImport = `@import url('../libraries/pico/pico.classless.min.css');
@import url('../libraries/tailwind/tailwind-mod.min.css');`;

          if (appJSON.theme === true) {
            picotheme = `data-theme="dark"`;
          }
          if (appJSON.theme === false) {
            picotheme = `data-theme="light"`;
          }
        }

        zip.file("js/app.js", appJSON.javascript);
        zip.file("js/bundle.js", `${forJSfile}${(appJSON.javascript === '') ? '' : appJSON.javascript.toString()}`);
        zip.file("css/style.css", `/* imports */
${cssImport}`);
        zip.file("index.html", `<!DOCTYPE html>
<html lang="en-US" ${picotheme}>
  <head>
    <title>${appJSON.title}</title>
    <meta charset="utf-8">
    <meta name="description" content="${appJSON.description}">
    <meta name="author" content="${appJSON.author}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="manifest.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${appJSON.name}">
    <meta name="apple-mobile-web-app-title" content="${appJSON.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-navbutton-color" content="hsl(207, 31%, 11%)">
    <meta name="msapplication-starturl" content="./index.html">
    <link rel="apple-touch-icon" href="imgs/logo.${logoType}">
    <link rel="icon" href="imgs/logo.${logoType}" type="image/x-icon" />
    ${cssLib}
  </head>
  <body>
${htmlEditor.state.doc.toString()}
  
    <script src="js/bundle.js"></script>${pwaHTMLCheck}
  </body>
</html>`);
        zip.file("README.md", readmeCode);
        zip.file("manifest.json", manifestJSONCode);
        zip.file("package.json", packageJSONCode);
        zip.file("LICENSE.md", licenseStr);

        if (appJSON.pwa) {
          zip.file("sw.js", `let cacheName    = "${appJSON.name}";
let filesToCache = [
  "./",
  ${cssortailwind}
  ${swStart}
];${swEnd}`);
        }
    
        let content = zip.generate({type:"blob"});
        saveAs(content, `${appJSON.name.toString().toLowerCase().replace(/ /g,"")}.zip`);
    };
    
    // share weave
    share.onclick = () => {
      let grabPicoURL     = 'https://cdnjs.cloudflare.com/ajax/libs/picocss/1.5.7/pico.classless.min.css';
      let grabTailWindURL = 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';
      let ifBoth          = "@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css');\n@import url('https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.css');";
      let cssLibrary;

      if (css.value === 'picocss' || css.value === 'both') {
        cssLibrary = grabPicoURL;
      }
      if (css.value === 'tailwind') {
        cssLibrary = grabTailWindURL;
      }
    
      let checkTheme  = (appJSON.theme) ? 'dark' : 'light';
      let picotheme   = `document.querySelector('html').setAttribute('data-theme', '${checkTheme}');`;
      let istailwind  = (css.value === 'tailwind') ? '' : picotheme;
    
      let data = {
        title        : appJSON.title,
        html         : `<!-- 
  Shared from kodeWeave!
  Try kodeWeave today at https://michaelsboost.com/kodeWeave/
-->

${htmlEditor.state.doc.toString()}`,
        css          : (css.value === 'both') ? ifBoth : "@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css');",
        js           : `// Shared from kodeWeave: https://michaelsboost.com/kodeWeave/ 

${istailwind}
${jsEditor.state.doc.toString()}`,
        css_external : cssLibrary,
        editors: '000'
      };
      let JSONstring = JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;");
      
      let form = 
      '<form id="tempForm" action="https://codepen.io/pen/define" method="POST" target="_blank" style="display: none;">' + 
        '<input type="hidden" name="data" value=\'' + 
          JSONstring + 
          '\'>' + 
        '<button id="tempBtn">Create New Pen with Prefilled Data</button>' +
      '</form>';
    
      // append click then remove
      document.body.innerHTML += form;
      tempBtn.click();
      document.getElementById('tempForm').remove();
      location.reload(true);
    };
    
    // toggle autoupdate
    autoupdate.onchange = () => {
      if (autoupdate.checked) run.classList.add('hidden');
    
      if (!autoupdate.checked) {
        run.classList.remove('hidden');
      }
      app.updatePreview();
    };
    run.onclick = () => app.updatePreview();
    
    // css
    css.onchange = () => {
      cssObj.id   = [];
      cssObj.data = [];
      if (css.value === 'picocss') {
        let urls  = ["libraries/pico/pico.classless.min.css"];
        cssObj.id = urls;
        for (let i of urls) {
          getFile(i, (source) => {
            cssObj.data = [...cssObj.data, source];
          });
        }
      }
      if (css.value === 'tailwind') {
        let urls  = ["libraries/tailwind/tailwind.min.js", "libraries/tailwind/tailwind.min.css"];
        cssObj.id = urls;
        for (let i of urls) {
          getFile(i, (source) => {
            cssObj.data = [...cssObj.data, source];
          });
        }
      }
      if (css.value === 'both') {
        let urls  = ["libraries/pico/pico.classless.min.css", "libraries/tailwind/tailwind-mod.min.css"];
        cssObj.id = urls;
        for (let i of urls) {
          getFile(i, (source) => {
            cssObj.data = [...cssObj.data, source];
          });
        }
      }
    
      app.updateStorage();
      app.updatePreview();
    };
    
    // remember state for the following elements
    appname.onkeyup = () => app.updatePreview();
    title.onkeyup = () => app.updatePreview();
    description.onkeyup = () => app.updatePreview();
    version.onkeyup = () => app.updatePreview();
    author.onkeyup = () => app.updatePreview();
    website.onkeyup = () => app.updatePreview();
    googleanalytics.onkeyup = () => app.updatePreview();
    scratchpad.onkeyup = () => app.updatePreview();
    theme.onchange = () => app.updatePreview();
    toggleconsole.onchange = () => app.updatePreview();
    fa.onchange = () => app.updatePreview();
    pwa.onchange = () => app.updateStorage();

    // after everything has been loaded trigger change on css to grab the source code
    css.onchange();

    // init preview
    app.updatePreview();
  },

  // update iframe preview function
  updatePreview: () => {
    app.updateStorage();
    const previewElm = document.getElementById('previewElm');
    // const elm  = document.querySelector('html[data-theme]');
    const icon = document.querySelectorAll('label[for=theme] i');

    if (appJSON.theme === false) {
      // elm.setAttribute('data-theme', 'light');
      previewElm.setAttribute('data-theme', 'light');

      // update icon
      icon.forEach((child) => {
        child.classList.add('fa-sun');
        child.classList.remove('fa-moon');
      });
    } else {
      // elm.setAttribute('data-theme', 'dark');
      previewElm.setAttribute('data-theme', 'dark');

      // update icon
      icon.forEach((child) => {
        child.classList.remove('fa-sun');
        child.classList.add('fa-moon');
      });
    }

    // variables
    const run = document.getElementById('run');

    // bottom menu style for run button
    let showConsole = (appJSON.console) ? '<script type="module" src="js/dom-console.js" defer></script>\n    ' : '';

    // css libraries
    let cssLib, picotheme = '';

    // if user is just using picocss
    if (css.value === 'picocss') {
      cssLib = `<link rel="stylesheet" href="libraries/pico/pico.classless.min.css" />`;

      if (appJSON.theme === true) {
        picotheme = `data-theme="dark"`;
      }
      if (appJSON.theme === false) {
        picotheme = `data-theme="light"`;
      }
    }
    // if user is just using tailwind
    if (css.value === 'tailwind') {
      cssLib = `<link rel="stylesheet" href="libraries/tailwind/tailwind.min.css" />
      <script src="libraries/tailwind/tailwind.min.js" defer></script>`;
    }

    // if user is using picocss and tailwind
    if (css.value === 'both') {
      cssLib = `<link rel="stylesheet" href="libraries/pico/pico.classless.min.css" />
      <link rel="stylesheet" href="libraries/tailwind/tailwind-mod.min.css" />`;

      if (appJSON.theme === true) {
        picotheme = `data-theme="dark"`;
      }
      if (appJSON.theme === false) {
        picotheme = `data-theme="light"`;
      }
    }

    let picoStyle     = '.wrapper_yOR7u {width: 100%!important; border-radius: 15px 15px 0 0!important;} .btn_yOR7u { background: inherit; padding: 0 0.5rem; margin: inherit; margin-right: 10px; border: inherit; } .nav_yOR7u {padding-bottom: 14px!important;} .line_yOR7u {background: inherit!important;}';
    let tailwindStyle = '.wrapper_yOR7u {width: 100%!important; border-radius: 15px 15px 0 0!important;} .btn_yOR7u { background: inherit; padding: 0 0.5rem; margin: inherit; margin-right: 10px; border: inherit; color: #fff!important; } .nav_yOR7u {padding-bottom: 14px!important;} .line_yOR7u {background: inherit!important;}';
    let consoleStyle  = (css.value === 'picocss') ? `<style>${picoStyle}</style>` : `<style>${tailwindStyle}</style>`;
    let addConsoleCSS = (appJSON.console) ? consoleStyle : '';
    let faHTMLChoice      = (appJSON.fontawesome) ? `
    <link rel="stylesheet" href="libraries/font-awesome/css/all.min.css" />` : '';

    let htmlCode  = `<!DOCTYPE html>
<html ${picotheme}>
  <head>
    <title>${appJSON.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${appJSON.description}">
    ${cssLib}${addConsoleCSS}${faHTMLChoice}
    ${showConsole}
  </head>
  <body>
    ${appJSON.html}
    
    <script>setTimeout(() => {${appJSON.javascript}}, 100);</script>
  </body>
</html>`;

    previewElm.innerHTML = "";
    let frame            = document.createElement("iframe");
    frame.setAttribute("id", "preview");
    frame.setAttribute("title", appJSON.title);
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups");
    previewElm.appendChild(frame);
    let previewFrame = document.getElementById("preview");
    let preview      =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;

    preview.open();
    preview.write(htmlCode);
    preview.close();
  },

  // update localStorage
  updateStorage: () => {
    appJSON.name                  = appname.value;
    appJSON.title                 = title.value;
    appJSON.description           = description.value;
    appJSON.version               = version.value;
    appJSON.author                = author.value;
    appJSON.website               = website.value;
    appJSON.analytics             = googleanalytics.value;
    appJSON.logo                  = logo.src;
    appJSON.scratchpad            = scratchpad.value;
    appJSON.css                   = css.value;
    appJSON.theme                 = (theme.checked)         ? true : false;
    appJSON.autoupdate            = (autoupdate.checked)    ? true : false;
    appJSON.console               = (toggleconsole.checked) ? true : false;
    appJSON.pwa                   = (pwa.checked)           ? true : false;
    appJSON.fontawesome           = (fa.checked)            ? true : false;
    appJSON.html                  = htmlEditor.state.doc.toString();
    appJSON.javascript            =   jsEditor.state.doc.toString();
  
    // left to push is logic and data
    localStorage.setItem('kodeWeave', JSON.stringify(appJSON));
  }
};

// check if FileReader API is available
if (!window.FileReader) {
  alert('File API & FileReader API not supported!');
}

// initialize application
app.init();