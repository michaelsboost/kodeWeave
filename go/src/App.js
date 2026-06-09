// Function for reactive state management
function onChange(target, callback, path = []) {
  function createProxy(target, path) {
    if (typeof target !== 'object' || target === null) {
      return target;
    }

    return new Proxy(target, {
      set(obj, property, value) {
        const fullPath = [...path, property];
        const oldValue = obj[property];
        const result = Reflect.set(obj, property, createProxy(value, fullPath));

        if (oldValue !== value) {
          callback(fullPath, oldValue, value);
        }

        return result;
      },
      get(obj, property) {
        const value = obj[property];
        if (typeof value === 'object' && value !== null) {
          return createProxy(value, [...path, property]);
        }
        return value;
      }
    });
  }

  return createProxy(target, path);
}

import LZString from 'lz-string';

// Keep project and data in the global scope
let app = {
  name: 'kodeWeave',
  author: {
    name: 'Michael Schwartz',
    href: 'https://michaelsboost.com/',
    src: 'imgs/author.jpg'
  },
  version: '1.3.0',
  url: 'https://github.com/michaelsboost/kodeWeave/',
  license: 'https://github.com/michaelsboost/kodeWeave/blob/main/LICENSE'
}
let p = {
  // Identity
  name: "App name",
  version: "0.0.1",
  title: "An attractive title",
  description: "The most attractive description ever!",
  author: "kodeWeave",
  url: "https://michaelsboost.com/",
  logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogICB2aWV3Qm94PSIwIDAgNTEyIDUxMiIKICAgd2lkdGg9IjUxMiIKICAgaGVpZ2h0PSI1MTIiPgogICA8ZGVmcz4KICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMTAwJSIgeTE9IjUwJSIgeDI9IjAlIiB5Mj0iNTAlIj4KICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjJkM2VlIi8+CiAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE3OGE5YyIvPgogICAgICA8L2xpbmVhckdyYWRpZW50PgogICA8L2RlZnM+CiAgIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNTEgNTguN2MtNC42LjEtMjAuOCAyLTI5LjMgMy43LTI4LjMgNS40LTY2LjkgMjIuNi03MyAzMi43LTEuOSAzLjEtMiA3LjItMiAxNjAuOCAwIDE1Mi4zLjEgMTU3LjcgMS45IDE2MC43IDUuMiA4LjUgMzYuNyAyMy43IDYzLjUgMzAuNSA5LjggMi41IDM0LjMgNi4zIDM4LjUgNiAyLS4yIDItMSAyLjMtNzMuMS4xLTQwLjguNy03My4zIDEuMi03My44IDEuNC0xLjQgNy4zIDEuOSAxMC40IDUuNyAxLjUgMS44IDEzLjggMjAuNyAyNy40IDQxLjggNTEuNCA4MCA1MC41IDc4LjUgNTMuMyA3OS4yIDMuMy44IDEyLjYtMy44IDI3LjYtMTMuOCAxNC4yLTkuNSAyMy45LTE3LjggMzQuOC0zMCAxMS4zLTEyLjYgMTQuOC0xNy40IDE0LjgtMjAuMyAwLTEuMi0xNS0yNC41LTMzLjQtNTItMTguNC0yNy40LTM0LjEtNTEuMi0zNS01Mi45LS45LTEuNy0xLjUtNC4xLTEuNS01LjQgMC0xLjMgMTIuNS0yMi4zIDI4LjUtNDcuOSA0NC41LTcxLjEgNDEuOS02Ni4zIDM4LjgtNzIuOC0yLjYtNS40LTE1LjQtMTkuNy0yNi4xLTI5LjEtMTEuNS0xMC4xLTM1LjEtMjYtMzkuOS0yNi45LTIuOS0uNi00LS4zLTUuOSAxLjctMS4zIDEuMy0yMC40IDMyLjMtNDIuMyA2OC45LTIyIDM2LjYtNDEuMSA2OC00Mi40IDY5LjgtMi42IDMuNi02LjcgNi4xLTguNyA1LjQtMS0uNC0xLjMtMTguMi0xLjMtODQuNCAwLTQ5LjUtLjQtODQuMi0uOS04NC42LS4xLS4xLS41LS4xLTEuMi0uMXoiLz4KPC9zdmc+",
  
  // Content
  html: "",
  css: "",
  javascript: "",
  
  // Processing
  html_pre_processor: "html",
  css_pre_processor: "css", 
  javascript_pre_processor: "javascript",
  
  // External
  libraries: [],
  meta: "",
  
  // Display
  dark: true,
  previewDark: true,
  columns: false,
  columnsRight: true,
  activePanel: null,
  preview: true,
  console: false,
  
  // Features
  module: true,
  autorun: true,
  pwa: false,

  // PWA Settings
  pwaThemeColorLight: "#d9e0e5",
  pwaThemeColorDark: "#13171f",
  pwaBgColorLight: "#d9e0e5",
  pwaBgColorDark: "#13171f"
};
let d = {
  searchLibKey: null,
  librarySuggestions: null,
  iframeSize: null,
  selectedSize: 'none',
  compiledJSX: null,
  menuDialog: null,
  settings: null,
  libraries: null,
  demos: null,
  chosenFramework: '',
  lastSelectedMediaType: 'image',
  lastMediaQuery: '',
  lastSearchResults: '',
  lastDisplayedResultsHTML: '',
  activeNav: 'Home',
  searchQuery: '',
  frameworks: {
    'alpine.js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"
      ],
      meta: ''
    },
    'algolia.js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/algoliasearch@4.17.0/dist/algoliasearch.umd.js"
      ],
      meta: ''
    },
    'angular': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.3/rxjs.umd.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.js",
        "https://unpkg.com/@angular/core@11.0.5/bundles/core.umd.js",
        "https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.10.3/zone.min.js",
        "https://unpkg.com/@angular/common@11.0.5/bundles/common.umd.js",
        "https://unpkg.com/@angular/compiler@11.0.5/bundles/compiler.umd.js",
        "https://unpkg.com/@angular/platform-browser@11.0.5/bundles/platform-browser.umd.js",
        "https://unpkg.com/@angular/platform-browser-dynamic@11.0.5/bundles/platform-browser-dynamic.umd.js",
        "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
        "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
      ],
      meta: ''
    },
    'animate.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      ],
      meta: ''
    },
    'anime js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
      ],
      meta: ''
    },
    'aos': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css",
        "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"
      ],
      meta: ''
    },
    'apex charts js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/apexcharts@3.40.0/dist/apexcharts.min.css",
        "https://cdn.jsdelivr.net/npm/apexcharts@3.40.0/dist/apexcharts.min.js"
      ],
      meta: ''
    },
    'aurelia': {
      libraries: [],
      meta: '<script src="https://cdn.jsdelivr.net/npm/aurelia-script@1.4.0"></script>'
    },
    'barba.js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/barba.js/2.9.7/barba.min.js"
      ],
      meta: ''
    },
    'bootstrap 5': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
      ],
      meta: ''
    },
    'bulma css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css",
        "https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/css/bulma-extensions.min.css",
        "https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/js/bulma-extensions.min.js"
      ],
      meta: ''
    },
    'chakra-ui': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/@chakra-ui/react@2.0.0/dist/chakra-ui.min.css"
      ],
      meta: ''
    },
    'chart js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/chart.js"
      ],
      meta: ''
    },
    'chartist': {
      libraries: [
        "https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css",
        "https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"
      ],
      meta: ''
    },
    'create js': {
      libraries: [
        "https://code.createjs.com/1.0.0/createjs.min.js"
      ],
      meta: ''
    },
    'd3': {
      libraries: [
        "https://d3js.org/d3.v7.min.js"
      ],
      meta: ''
    },
    'dojo': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/dojo/1.17.3/dojo.js"
      ],
      meta: ''
    },
    'echarts': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.3/echarts.min.js"
      ],
      meta: ''
    },
    'file-saver': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"
      ],
      meta: ''
    },
    'foundation': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/css/foundation.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/js/foundation.min.js"
      ],
      meta: ''
    },
    'fullpage.js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/4.0.11/fullpage.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/4.0.11/fullpage.min.js"
      ],
      meta: ''
    },
    'granim': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/granim/2.0.0/granim.min.js"
      ],
      meta: ''
    },
    'google charts': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/google-charts@2.0.0/dist/googleCharts.min.js"
      ],
      meta: ''
    },
    'gsap': {
      libraries: [
        "https://unpkg.com/gsap@3/dist/gsap.min.js"
      ],
      meta: ''
    },
    'half moon': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/Halfmoon/1.0.4/css/halfmoon.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/Halfmoon/1.0.4/js/halfmoon.min.js"
      ],
      meta: ''
    },
    'hint css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/hint.css/3.0.0/hint.min.css"
      ],
      meta: ''
    },
    'hyperapp': {
      libraries: [],
      meta: '<script src="https://unpkg.com/hyperapp@0.16.0"></script>'
    },
    'jquery': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
      ],
      meta: ''
    },
    'jszip': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
      ],
      meta: ''
    },
    'knockout.js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"
      ],
      meta: ''
    },
    'leaflet': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"
      ],
      meta: ''
    },
    'locomotive-scroll': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/locomotive-scroll/4.1.4/locomotive-scroll.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/locomotive-scroll/4.1.4/locomotive-scroll.min.js"
      ],
      meta: ''
    },
    'lodash': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
      ],
      meta: ''
    },
    'masonry js': {
      libraries: [
        "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"
      ],
      meta: ''
    },
    'materialize': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
      ],
      meta: ''
    },
    'milligram css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.min.css"
      ],
      meta: ''
    },
    'mithril': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/mithril@2.0.4/mithril.min.js"
      ],
      meta: ''
    },
    'moment js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"
      ],
      meta: ''
    },
    'moon.js': {
      libraries: [],
      meta: '<script src="https://unpkg.com/moonjs"></script>'
    },
    'pattern css': {
      libraries: [
        "https://unpkg.com/pattern.css@1.0.0/dist/pattern.min.css"
      ],
      meta: ''
    },
    'picnic css': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/picnic"
      ],
      meta: ''
    },
    'pico.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
        "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
      ],
      meta: ''
    },
    'preact': {
      libraries: [
        "https://unpkg.com/preact@latest/dist/preact.min.js"
      ],
      meta: ''
    },
    'primer css': {
      libraries: [
        "https://unpkg.com/@primer/css@^20.2.4/dist/primer.css"
      ],
      meta: ''
    },
    'popper js': {
      libraries: [
        "https://unpkg.com/@popperjs/core@2.11.7/dist/umd/popper.min.js"
      ],
      meta: ''
    },
    'pure.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/pure/2.0.6/pure-min.css"
      ],
      meta: ''
    },
    'raisin css': {
      libraries: [
        "https://cdn.jsdelivr.net/gh/tretapey/raisincss@1.1.1/raisin.min.css"
      ],
      meta: ''
    },
    'raphael js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js"
      ],
      meta: ''
    },
    'react js': {
      libraries: [
        "https://unpkg.com/react@latest/umd/react.development.js",
        "https://unpkg.com/react-dom@latest/umd/react-dom.development.js"
      ],
      meta: ''
    },
    'semantic ui': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.2/semantic.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.2/semantic.min.js"
      ],
      meta: ''
    },
    'skeleton css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"
      ],
      meta: ''
    },
    'spectre.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre.min.css"
      ],
      meta: ''
    },
    'stimulus': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/@hotwired/stimulus@3.1.0/dist/stimulus.umd.js",
        "https://cdn.jsdelivr.net/npm/@hotwired/stimulus-loading@1.0.0/dist/stimulus-loading.umd.js"
      ],
      meta: ''
    },
    'swiper': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.1.2/swiper-bundle.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.1.2/swiper-bundle.min.js"
      ],
      meta: ''
    },
    'tachyons': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.12.0/tachyons.min.css"
      ],
      meta: ''
    },
    'tailwind css': {
      libraries: [
        "https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"
        // "https://cdn.tailwindcss.com"
      ],
      meta: ''
    },
    'three.js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/three.min.js"
      ],
      meta: ''
    },
    'tippy js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/tippy-bundle.umd.min.js"
      ],
      meta: ''
    },
    'uikit': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.17.2/css/uikit.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.17.2/js/uikit.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.17.2/js/uikit-icons.min.js"
      ],
      meta: ''
    },
    'vis js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"
      ],
      meta: ''
    },
    'vite': {
      libraries: [
        "https://unpkg.com/vite@latest/dist/vite.min.js"
      ],
      meta: ''
    },
    'vivus': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.6/vivus.min.js"
      ],
      meta: ''
    },
    'vue js': {
      libraries: [
        "https://unpkg.com/vue@latest/dist/vue.global.prod.js"
      ],
      meta: ''
    },
    'water.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/water.css/2.1.1/water.min.css"
      ],
      meta: ''
    }
  }
};
const icons = (function() {
  const SidebarIconCSS = "h-4 w-4";
  const navIconCSS = "h-3 w-3";
  const modalIconCSS = "h-4 w-4";
  const panelIconCSS = "h-3 w-3";
  const previewIconCSS = "h-3 -mt-1";

  return {
    sun: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>`,
    moon: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>`,

    undo: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
    </svg>`,
    redo: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
    </svg>`,
    cut: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
    </svg>`,
    copy: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>`,
    paste: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
    </svg>`,
    indent: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>`,
    outdent: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
    </svg>`,
    search: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>`,
    goto: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>`,
    comment: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>`,
    fold: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>`,
    unfold: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>`,
    cursor: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
    </svg>`
  };
})();

// Reactive objects
window.project = onChange(p, async (property, oldValue, newValue) => {
  const iframe = document.getElementById('iframe');
  const doc = iframe ? iframe.contentWindow.document : null;
  if (oldValue !== newValue) {
    localStorage.setItem('kodeWeave', JSON.stringify(project));
    App.render('#app');
    
    if (property.toString() === 'activePanel') {
      getIFrameClientSize();
      if (!window.editorManager) return;
      if (project.activePanel === 'html') setActiveEditor(editorManager.htmlEditor)
      if (project.activePanel === 'css') setActiveEditor(editorManager.cssEditor)
      if (project.activePanel === 'javascript') setActiveEditor(editorManager.javascriptEditor)
    }
    
    if (!App.initialRender) {
      let string = property.toString();
      
      if (string === 'css' || string === 'console') {
        let consoleCSS = `
      [data-zwj=zwjkonsole] {
        display: ${project.console ? 'flex' : 'none'};
      }
        
      ${project.css}`

        if (!window.editorManager) return;
        if (string === 'css' && editorManager.cssEditor.state.doc.toString() !== project.css) {
          dispatchChanges(editorManager.cssEditor, project.css);
        }
        if (doc.getElementById('cuxjju3ew')) {
          doc.getElementById('cuxjju3ew').textContent = consoleCSS;
        }
      }
      
      if (string === 'html') {
        renderPreview(project.autorun);
        if (!window.editorManager) return;
        if (window.editorManager.htmlEditor.state.doc.toString() !== project.html) {
          dispatchChanges(editorManager.htmlEditor, project.html);
        }
      }

      if (string === 'javascript') {
        renderPreview(project.autorun);
        if (!window.editorManager) return;
        if (window.editorManager.jsEditor.state.doc.toString() !== project.javascript) {
          dispatchChanges(editorManager.jsEditor, project.javascript);
        }
      }

      if (string === 'module' || string === 'meta' || string === 'libraries' || string === 'html_pre_processor' || string === 'css_pre_processor' || string === 'javascript_pre_processor') {
        renderPreview(project.autorun);
      }

      if (string === "previewDark") {
        if (doc) {
          doc.documentElement.setAttribute('data-theme', project.previewDark ? 'dark' : 'light');
          doc.documentElement.querySelector('meta[name=apple-mobile-web-app-status-bar-style]').setAttribute('content', project.previewDark ? 'black-translucent' : 'default');
          doc.documentElement.querySelector('meta[name=theme-color]').setAttribute('content', project.previewDark ? '#13171f' : '#d9e0e5');
          doc.documentElement.querySelector('meta[name=msapplication-navbutton-color]').setAttribute('content', project.previewDark ? '#13171f' : '#d9e0e5');
        }
      }

      if (string === "dark") {
        App.render('#app');
        document.documentElement.setAttribute('data-theme', project.dark ? 'dark' : 'light');
        document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]').setAttribute('content', project.dark ? 'black-translucent' : 'default');
        document.querySelector('meta[name=theme-color]').setAttribute('content', project.dark ? '#13171f' : '#ffffff');
        document.querySelector('meta[name=msapplication-navbutton-color]').setAttribute('content', project.dark ? '#13171f' : '#ffffff');
      }
    }
  }
});
window.data = onChange(d, (property, oldValue, newValue) => {
  // Only render if the actual value has changed
  if (oldValue !== newValue) App.render('#app');
});

// Components
function Homepage() {
  // Frameworks
  const frameworks = [
    "blank",
    "javascript",
    "typescript",
    "react",
    "vue",
    "preact",
    "angular",
    "alpine",
    "solid",
    "stimulus",
    "mithril",
    "hyperapp",
    "aurelia",
    "lit",
    "knockout",
    "moon"
  ];

  const frameworkDisplayNames = {
    'blank': 'Blank',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'react': 'React',
    'vue': 'Vue',
    'preact': 'Preact',
    'angular': 'Angular',
    'alpine': 'Alpine.js',
    'solid': 'Solid',
    'stimulus': 'Stimulus',
    'mithril': 'Mithril',
    'hyperapp': 'Hyperapp',
    'aurelia': 'Aurelia',
    'lit': 'Lit',
    'knockout': 'Knockout',
    'moon': 'Moon.js'
  };

  let frameworkHTML = "";
  for (const name of frameworks) {
    const displayName = frameworkDisplayNames[name] || (name.charAt(0).toUpperCase() + name.slice(1));
    frameworkHTML += `<button
        aria-label="new ${name} project"
        name="new ${name} project"
        class="rounded-2xl border border-white/[.08] bg-white/[.035] p-4 text-sm hover:bg-white/[.06] transition group"
        onclick="newProject('${name}')">
          <div class="mx-auto mb-2 h-10 w-10 grid place-items-center font-bold group-hover:scale-110 transition-transform">
            <img loading="lazy" width="256" height="256" src="imgs/frameworks/${name}.svg" alt="${displayName}" />
          </div>
          <span class="text-slate-300 group-hover:text-white transition">
            ${displayName}
          </span>
        </button>`;
  }

  if (data.activeNav === "Home") {
    return `<div class="absolute inset-0 overflow-auto bg-[#07090f]/70 backdrop-blur-xl">
      <header class="sticky inset-x-0 top-0 h-16 border-b border-white/[.08] bg-[#07090f]/70 backdrop-blur-xl flex items-center gap-4 px-5 max-[900px]:h-14 max-[900px]:px-3 z-10">
        <div class="text-lg font-bold tracking-tight max-[500px]:text-base">
          kode<span class="gradient-text">Weave</span> <span class="text-xs text-slate-500">v${app.version}</span>
        </div>

        <div class="flex-1 max-w-xl"></div>

        <button 
          class="ml-auto h-10 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,.28)] max-[520px]:px-3"
          onclick="data.demos = true">
          New Project
        </button>

        <div class="flex gap-2 max-[500px]:hidden">
          <button onclick="window.open('https://github.com/sponsors/michaelsboost', '_blank')" class="iconbox text-slate-300 hover:text-pink-400 hover:bg-pink-500/10 transition group" title="Sponsor this project">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button onclick="shareKodeWeave()" class="iconbox text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition group" title="Share kodeWeave">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button onclick="window.open('https://github.com/michaelsboost/kodeWeave', '_blank')" class="iconbox text-slate-300 hover:text-white hover:bg-white/10 transition group" title="GitHub Repository">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </button>
        </div>
      </header>

      <!-- SCROLL AREA -->
      <section class="flex-1 overflow-auto p-5 max-[900px]:p-3 pb-24">

        <!-- HERO -->
        <div class="glass rounded-[28px] p-6 relative overflow-hidden mb-6">
          <div class="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-400/10"></div>
          <div class="relative flex items-end justify-between gap-6 max-[760px]:block">
            <div>
              <div class="inline-flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.05] px-3 py-1 text-xs text-slate-300 mb-4">
                <span class="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,.8)]"></span>
                App-builder workspace
              </div>
              <h1 class="text-4xl font-black tracking-tight max-[760px]:text-2xl">What do you want to build?</h1>
              <p class="mt-2 max-w-2xl text-sm text-slate-400">
                Start with a framework, template, or jump straight into HTML/CSS/JS with live preview.
              </p>
            </div>

            <div class="flex gap-2 max-[760px]:mt-5">
              <button 
                class="rounded-2xl border border-white/[.08] bg-white/[.05] px-4 py-3 text-sm text-slate-200 hover:bg-white/[.1] transition"
                onclick="importProject()">
                Import
              </button>
              <button 
                class="rounded-2xl bg-white text-slate-950 px-4 py-3 text-sm font-semibold hover:bg-gray-100 transition"
                onclick="data.activeNav = null;">
                Open Editor
              </button>
            </div>
          </div>
        </div>

        <!-- CONTENT GRIDS (Frameworks & Examples) -->
        <div class="glass rounded-[28px] p-6 mb-6">
          
          <!-- Popular Frameworks -->
          <section class="glass rounded-[26px] p-5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-bold text-white flex items-center gap-2">
                <span class="text-xl">⚛️</span> Popular Frameworks
              </h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              ${frameworkHTML}
            </div>
          </section>
        </div>
      </section>
    </div>`;
  } else {
    return '';
  }
}
function SearchPage() {
  if (data.activeNav === "Search") {
    return `<div class="absolute inset-0 overflow-auto bg-[#07090f]/70 backdrop-blur-xl">
      <!-- Header -->
      <header class="sticky inset-x-0 top-0 h-16 border-b border-white/[.08] bg-[#07090f]/70 backdrop-blur-xl flex items-center gap-4 px-5 max-[900px]:h-14 max-[900px]:px-3 z-10">
        <button onclick="data.activeNav = 'Home'" class="flex items-center gap-2 text-slate-400 hover:text-white transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15.75 19.5L8.25 12l7.5-7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="hidden sm:inline">Back</span>
        </button>
        
        <div class="flex-1 w-full relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input 
            id="searchPageInput"
            class="w-full h-12 rounded-2xl border border-white/[.08] bg-white/[.045] pl-10 pr-4 text-sm outline-none focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10" 
            placeholder="Search for images, audio, SVGs..."
            value="${d.lastMediaQuery || ''}"
            oninput="performMediaSearch(this.value)"
          />
        </div>
        
        <!-- Media Type Filter -->
        <select id="mediaTypeFilter" class="h-12 px-4 rounded-2xl border border-white/[.08] bg-white/[.045] text-sm outline-none focus:border-cyan-400/40">
          <option value="all" ${d.lastSelectedMediaType === 'all' ? 'selected' : ''}>All</option>
          <option value="image" ${d.lastSelectedMediaType === 'image' ? 'selected' : ''}>Images</option>
          <option value="audio" ${d.lastSelectedMediaType === 'audio' ? 'selected' : ''}>Audio</option>
          <option value="svg" ${d.lastSelectedMediaType === 'svg' ? 'selected' : ''}>SVG Icons</option>
        </select>
        
        <div class="flex gap-2">
          <button onclick="data.activeNav = 'Home'" class="h-10 px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,.28)]">
            Cancel
          </button>
        </div>
      </header>

      <!-- Search Results -->
      <section class="flex-1 p-5 max-[900px]:p-3 pb-24">
        <div id="searchResultsContainer" class="space-y-6">
          <!-- Loading or empty state -->
          <div class="flex items-center justify-center py-20">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 border border-white/[.08] flex items-center justify-center">
                <svg class="w-8 h-8 text-slate-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Search Media</h3>
              <p class="text-slate-400 text-sm">Search for images, audio files, or SVG icons</p>
            </div>
          </div>
        </div>
      </section>
    </div>`;
  }
  return '';
}
function SettingsPage() {
  let frameworks = data.frameworks;

  // Get the keys, sort them alphabetically
  let sortedFrameworks = Object.keys(frameworks)
    .sort()
    .reduce((acc, key) => {
      acc[key] = frameworks[key];
      return acc;
    }, {});

  return `<div class="absolute inset-0 overflow-auto bg-[#07090f]/95 backdrop-blur-xl z-20">
    <!-- Header -->
    <header class="sticky inset-x-0 top-0 h-16 border-b ${project.dark ? 'border-white/[.08] bg-[#07090f]/80' : 'border-black/[.08] bg-white/80'} backdrop-blur-xl flex items-center gap-4 px-5 max-[900px]:h-14 max-[900px]:px-3 z-10">
      <button onclick="activeNav(null)" class="flex items-center gap-2 text-slate-400 hover:text-white transition">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15.75 19.5L8.25 12l7.5-7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="hidden sm:inline">Back to Editor</span>
      </button>
      
      <div class="flex-1">
        <h1 class="text-xl font-bold">Settings</h1>
      </div>
      
      <div class="flex gap-2">
        <div class="relative group">
          <button onclick="toggleExportMenuSettings()" class="h-10 px-4 rounded-2xl bg-white/[.05] hover:bg-white/[.1] text-sm font-semibold text-slate-300 hover:text-white transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export
          </button>
          <div id="exportMenuSettings" class="absolute right-0 top-full mt-1 w-56 rounded-xl bg-[#0f1522] border border-white/[.08] shadow-2xl overflow-hidden z-50 hidden">
            <div class="py-1">
              <button onclick="downloadJSON(); hideExportMenuSettings()" class="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/[.08] hover:text-white transition">💾 Save Project (.json)</button>
              <button onclick="downloadHTML(); hideExportMenuSettings()" class="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/[.08] hover:text-white transition">📄 Export as HTML</button>
              <button onclick="downloadProject(); hideExportMenuSettings()" class="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/[.08] hover:text-white transition">📦 Download ZIP Archive</button>
              <div class="border-t border-white/[.08] my-1"></div>
              <button onclick="shareProject(); hideExportMenuSettings()" class="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/[.08] hover:text-white transition">🔗 Share Weave</button>
              <button onclick="shareToCodepen(); hideExportMenuSettings()" class="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/[.08] hover:text-white transition">🎨 Share to CodePen</button>
            </div>
          </div>
        </div>
        <button onclick="activeNav(null)" class="h-10 px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,.28)]">
          Done
        </button>
      </div>
    </header>

    <!-- Settings Content -->
    <section class="p-5 max-[900px]:p-3 pb-24">
      <div class="max-w-4xl mx-auto space-y-6">
        
        <!-- Project Logo -->
        <div class="glass rounded-[26px] p-6">
          <h2 class="font-bold text-white mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Project Logo
          </h2>
          <div class="flex items-center gap-4">
            <img id="projectLogoSettings" class="w-16 h-16 rounded-xl object-cover border border-white/[.08] bg-white/[.05]" alt="Project Logo" src="${project.logo}" loading="lazy">
            <input id="logoFileInput" type="file" accept="image/*" class="hidden" onchange="handleLogoChange(event)">
            <button onclick="document.getElementById('logoFileInput').click()" class="px-4 py-2 rounded-xl bg-white/[.05] hover:bg-white/[.1] text-sm transition">
              Change Logo
            </button>
          </div>
        </div>

        <!-- Project Info -->
        <div class="glass rounded-[26px] p-6">
          <h2 class="font-bold text-white mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4v16h16V4H4zm2 2h12v12H6V6zm2 2v8h8V8H8z" stroke="currentColor" stroke-width="2"/></svg>
            Project Information
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-slate-400 mb-1">Project Name</label>
              <input type="text" value="${project.name.replace(/"/g, '&quot;')}" oninput="project.name = this.value" class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none transition">
            </div>
            <div>
              <label class="block text-sm text-slate-400 mb-1">Version</label>
              <div class="grid grid-cols-3 gap-3">
                <input type="number" min="0" placeholder="Major" value="${project.version.split('.')[0]}" oninput="updateVersionPart('major', this.value)" class="flex-1 p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
                <input type="number" min="0" placeholder="Minor" value="${project.version.split('.')[1]}" oninput="updateVersionPart('minor', this.value)" class="flex-1 p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
                <input type="number" min="0" placeholder="Patch" value="${project.version.split('.')[2]}" oninput="updateVersionPart('patch', this.value)" class="flex-1 p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
              </div>
            </div>
            <div>
              <label class="block text-sm text-slate-400 mb-1">Title</label>
              <input type="text" value="${project.title.replace(/"/g, '&quot;')}" oninput="project.title = this.value" class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
            </div>
            <div>
              <label class="block text-sm text-slate-400 mb-1">Description</label>
              <textarea rows="3" oninput="project.description = this.value" class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none resize-none">${project.description.replace(/"/g, '&quot;')}</textarea>
            </div>
            <div>
              <label class="block text-sm text-slate-400 mb-1">Author</label>
              <input type="text" value="${project.author.replace(/"/g, '&quot;')}" oninput="project.author = this.value" class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
            </div>
            <div>
              <label class="block text-sm text-slate-400 mb-1">URL</label>
              <input type="url" value="${project.url.replace(/"/g, '&quot;')}" oninput="project.url = this.value" class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
            </div>
          </div>
        </div>

        <!-- Appearance -->
        <div class="glass rounded-[26px] p-6">
          <h2 class="font-bold text-white mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" stroke="currentColor" stroke-width="1.5"/></svg>
            Appearance
          </h2>
          <div class="space-y-3">
            <label class="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-white/[.05] transition">
              <span>Module Mode</span>
              <input type="checkbox" ${project.module ? 'checked' : ''} onchange="project.module = this.checked" class="w-5 h-5 rounded border-white/[.08] accent-cyan-400">
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-white/[.05] transition">
              <span>Auto Run Preview</span>
              <input type="checkbox" ${project.autorun ? 'checked' : ''} onchange="project.autorun = this.checked" class="w-5 h-5 rounded border-white/[.08] accent-cyan-400">
            </label>
            <label class="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-white/[.05] transition">
              <span>PWA Support</span>
              <input type="checkbox" ${project.pwa ? 'checked' : ''} onchange="project.pwa = this.checked; updatePwaSettingsVisibility()" class="w-5 h-5 rounded border-white/[.08] accent-cyan-400">
            </label>

            <!-- PWA Settings (shown only when PWA is enabled) -->
            <div id="pwaSettingsSection" class="space-y-3 pl-4 border-l-2 border-cyan-400/30" style="${project.pwa ? '' : 'display: none;'}">
              <div class="text-sm text-cyan-400 mb-2 font-semibold">PWA Colors</div>
              
              <!-- Light Mode Section -->
              <div class="bg-white/[.03] rounded-xl p-3 space-y-2">
                <div class="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  ☀️ Light Mode
                </div>
                <div>
                  <label class="block text-xs text-slate-400 mb-1">Theme Color (Light)</label>
                  <div class="flex gap-2">
                    <input type="color" 
                          id="pwaThemeColorLight"
                          value="${project.pwaThemeColorLight}" 
                          onchange="project.pwaThemeColorLight = this.value"
                          class="w-12 h-8 rounded-lg cursor-pointer">
                    <input type="text" 
                          value="${project.pwaThemeColorLight}" 
                          onchange="project.pwaThemeColorLight = this.value; document.getElementById('pwaThemeColorLight').value = this.value"
                          class="flex-1 px-2 py-1.5 text-xs rounded-lg bg-white/[.05] border border-white/[.08] font-mono"
                          placeholder="#d9e0e5">
                  </div>
                </div>
                <div>
                  <label class="block text-xs text-slate-400 mb-1">Background Color (Light)</label>
                  <div class="flex gap-2">
                    <input type="color" 
                          id="pwaBgColorLight"
                          value="${project.pwaBgColorLight}" 
                          onchange="project.pwaBgColorLight = this.value"
                          class="w-12 h-8 rounded-lg cursor-pointer">
                    <input type="text" 
                          value="${project.pwaBgColorLight}" 
                          onchange="project.pwaBgColorLight = this.value; document.getElementById('pwaBgColorLight').value = this.value"
                          class="flex-1 px-2 py-1.5 text-xs rounded-lg bg-white/[.05] border border-white/[.08] font-mono"
                          placeholder="#d9e0e5">
                  </div>
                </div>
              </div>
              
              <!-- Dark Mode Section -->
              <div class="bg-white/[.03] rounded-xl p-3 space-y-2">
                <div class="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  🌙 Dark Mode
                </div>
                <div>
                  <label class="block text-xs text-slate-400 mb-1">Theme Color (Dark)</label>
                  <div class="flex gap-2">
                    <input type="color" 
                          id="pwaThemeColorDark"
                          value="${project.pwaThemeColorDark}" 
                          onchange="project.pwaThemeColorDark = this.value"
                          class="w-12 h-8 rounded-lg cursor-pointer">
                    <input type="text" 
                          value="${project.pwaThemeColorDark}" 
                          onchange="project.pwaThemeColorDark = this.value; document.getElementById('pwaThemeColorDark').value = this.value"
                          class="flex-1 px-2 py-1.5 text-xs rounded-lg bg-white/[.05] border border-white/[.08] font-mono"
                          placeholder="#13171f">
                  </div>
                </div>
                <div>
                  <label class="block text-xs text-slate-400 mb-1">Background Color (Dark)</label>
                  <div class="flex gap-2">
                    <input type="color" 
                          id="pwaBgColorDark"
                          value="${project.pwaBgColorDark}" 
                          onchange="project.pwaBgColorDark = this.value"
                          class="w-12 h-8 rounded-lg cursor-pointer">
                    <input type="text" 
                          value="${project.pwaBgColorDark}" 
                          onchange="project.pwaBgColorDark = this.value; document.getElementById('pwaBgColorDark').value = this.value"
                          class="flex-1 px-2 py-1.5 text-xs rounded-lg bg-white/[.05] border border-white/[.08] font-mono"
                          placeholder="#13171f">
                  </div>
                </div>
              </div>
              
              <div class="text-xs text-slate-500 bg-cyan-400/5 p-2 rounded-lg">
                💡 These colors are used in your PWA manifest and browser UI
              </div>
            </div>
          </div>
        </div>

        <!-- Libraries -->
        <div class="glass rounded-[26px] p-6">
          <h2 class="font-bold text-white mb-4 flex justify-between items-center gap-2">
            <div class="w-full flex gap-2"> 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              <span>Libraries & Frameworks</span>
            </div>
            <button aria-label="search libraries" name="search libraries" class="p-2 rounded-xl hover:bg-white/[.08] transition" onclick="searchLibraries()">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
              </svg>
            </button>
          </h2>
          
          <div class="mb-4">
            <select onchange="
              if (this.value) {
                data.chosenFramework = this.value.toLowerCase();
                let framework = data.frameworks[data.chosenFramework];
                if (framework && framework.libraries) {
                  for (let item of framework.libraries) {
                    if (!project.libraries.includes(item)) project.libraries.push(item);
                  }
                }
                if (framework && framework.meta) project.meta += framework.meta;
                renderPreview(true);
                this.value = '';
              }
            " class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
              <option value="">-- Add Popular Library/Framework --</option>
              ${Object.keys(sortedFrameworks).map(framework => {
                let name = framework.toLowerCase();
                name = name.charAt(0).toUpperCase() + name.slice(1);
                return `<option value="${name}">${name}</option>`
              }).join('')}
            </select>
          </div>

          <div id="librariesBoxSettings" class="space-y-2">
            ${project.libraries.map((library, index) => `
              <div class="flex gap-2 items-center" data-index="${index}">
                <input type="text" value="${library.replace(/"/g, '&quot;')}" oninput="project.libraries[${index}] = this.value; renderPreview(true);" class="flex-1 p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none text-sm font-mono" placeholder="https://cdnjs.cloudflare.com/ajax/libs/...">
                <button onclick="project.libraries.splice(${index}, 1); renderPreview(true);" class="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
          
          <button onclick="project.libraries.push(''); renderPreview(true);" class="mt-4 w-full py-3 rounded-xl bg-white/[.05] hover:bg-white/[.1] text-sm transition flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Add Library
          </button>
        </div>

        <!-- Preprocessors -->
        <div class="glass rounded-[26px] p-6">
          <h2 class="font-bold text-white mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Preprocessors
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-slate-400 mb-1">JavaScript</label>
              <select onchange="setPreprocessor('javascript', this.value); renderPreview(true);" class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none">
                <option value="javascript" ${project.javascript_pre_processor === 'javascript' ? 'selected' : ''}>JavaScript</option>
                <option value="babel" ${project.javascript_pre_processor === 'babel' ? 'selected' : ''}>Babel (JSX / ES6)</option>
                <option value="typescript" ${project.javascript_pre_processor === 'typescript' ? 'selected' : ''}>TypeScript</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Meta Tags -->
        <div class="glass rounded-[26px] p-6">
          <h2 class="font-bold text-white mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Custom Head HTML
          </h2>
          <textarea rows="6" oninput="project.meta = this.value" class="w-full p-3 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none font-mono text-sm" placeholder="<!-- HTML to be added before closing </head> tag -->">${project.meta.replace(/"/g, '&quot;')}</textarea>
          <p class="text-xs text-slate-500 mt-2">Add custom meta tags, link tags, or script tags that will be injected into the &lt;head&gt; of your preview.</p>
        </div>

        <!-- Danger Zone -->
        <div class="glass rounded-[26px] p-6 border border-red-500/20">
          <h2 class="font-bold text-red-400 mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Danger Zone
          </h2>
          <button onclick="emptyStorage()" class="w-full py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Clear All Project Data
          </button>
          <p class="text-xs text-slate-500 mt-2">This will permanently delete all your projects and reset kodeWeave to its initial state.</p>
        </div>
      </div>
    </section>
  </div>`;
}
function LeftMenubar() {
  // Helper function to check if Snapshot button should be hidden
  const shouldHideMain = () => {
    return data.activeNav === 'Home' || data.activeNav === 'Search' || data.activeNav === 'Settings';
  };

  return `<div class="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center shadow-[0_0_28px_rgba(124,58,237,.45)]">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style="transform: scale(1.5); transform-origin: center;">
        <path d="M 9.8046875,2.2929688 C 9.625,2.296875 8.9921875,2.3710938 8.6601563,2.4375 7.5546875,2.6484375 6.046875,3.3203125 5.8085937,3.7148438 c -0.074219,0.1210937 -0.078125,0.28125 -0.078125,6.28125 0,5.9492192 0.00391,6.1601562 0.074219,6.2773432 0.203125,0.332032 1.4335937,0.925782 2.4804688,1.191407 0.3828125,0.09766 1.3398437,0.246093 1.5039062,0.234375 0.078125,-0.0078 0.078125,-0.03906 0.089844,-2.855469 0.00391,-1.59375 0.027344,-2.863281 0.046875,-2.882812 0.054687,-0.05469 0.2851563,0.07422 0.4062493,0.222656 0.05859,0.07031 0.539063,0.808593 1.070313,1.632812 2.007812,3.125 1.972656,3.066406 2.082031,3.09375 0.128906,0.03125 0.492188,-0.148437 1.078125,-0.539062 C 15.117188,16 15.496094,15.675781 15.921875,15.199219 16.363281,14.707031 16.5,14.519531 16.5,14.40625 c 0,-0.04687 -0.585937,-0.957031 -1.304687,-2.03125 -0.71875,-1.070312 -1.332032,-2 -1.367188,-2.066406 -0.03516,-0.06641 -0.05859,-0.160157 -0.05859,-0.210938 0,-0.05078 0.488282,-0.8710935 1.113282,-1.8710935 1.738281,-2.7773438 1.636718,-2.5898438 1.515625,-2.84375 C 16.296875,5.171875 15.796875,4.6132812 15.378906,4.2460938 14.929688,3.8515625 14.007813,3.2304688 13.820313,3.1953125 13.707031,3.171875 13.664063,3.1835938 13.589844,3.2617188 13.539063,3.3125 12.792969,4.5234375 11.9375,5.953125 11.078125,7.3828125 10.332031,8.609375 10.28125,8.6796875 10.179688,8.8203125 10.019531,8.9179688 9.9414063,8.890625 9.9023438,8.875 9.890625,8.1796875 9.890625,5.59375 9.890625,3.6601563 9.875,2.3046875 9.855469,2.2890625 9.851559,2.2851525 9.835938,2.2851525 9.808594,2.2851525 Z"></path>
      </svg>
    </div>

    <nav class="mt-4 flex flex-col justify-between gap-2 w-full h-full px-3">
      <div class="flex flex-col justify-between gap-2">
        <button onclick="activeNav('Home')" class="w-full ${(data.activeNav === 'Home') ? 'active text-white' : ''} rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition" title="Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3V10.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>
        </button>
      
        <a href="https://twitter.com/kodeweave_app" target="_blank" class="w-full rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="X/Twitter">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs id="defs2"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath7"><path style="display:none;fill:#2a34ff;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M 2.7194315,3.6106111 H 8.5920036 L 21.280954,20.389389 h -5.727371 z" id="path7"></path><path id="lpe_path-effect7" style="fill:#2a34ff;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" class="powerclip" d="M -2.8448815,-3.9722732 H 26.113213 V 27.972273 H -2.8448815 Z M 2.7194315,3.6106111 15.553583,20.389389 h 5.727371 L 8.5920036,3.6106111 Z"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath11"><rect style="fill:#ff2a2a;fill-opacity:1;stroke:none;stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" id="rect11" width="21.586601" height="18.278778" x="1.2021173" y="2.8606112"></rect></clipPath></defs><g style="fill:none;stroke:currentColor;stroke-width:1.5" id="g2" transform="translate(-0.04613684)"><g id="g8" clip-path="url(#clipPath11)"><path d="M 2.7194315,3.6106111 H 8.5920036 L 21.280954,20.389389 h -5.727371 z" id="path2-8"></path><path d="M 20.541589,1.5132639 19.650846,2.5619375 18.760104,3.6106111 17.869362,4.6592848 16.978619,5.7079584 16.087877,6.756632 15.197135,7.8053056 14.306392,8.8539793 13.41565,9.9026529 12.524908,10.951326 11.634165,12 10.743423,13.048674 9.852681,14.097347 8.961938,15.146021 8.071196,16.194695 7.1804539,17.243368 6.2897116,18.292042 5.3989693,19.340715 4.5082269,20.389389 3.6174846,21.438063 2.7267423,22.486736" id="path4" clip-path="url(#clipPath7)"></path></g></g></svg>
        </a>
      
        <button onclick="activeNav('Search')" class="w-full ${(data.activeNav === 'Search') ? 'active text-white' : ''} rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="Search">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>
        </button>
      </div>
    
      <div class="flex flex-col justify-between gap-2">
        <button onclick="activeNav('HTML')" class="w-full ${(project.activePanel === 'html') ? 'active text-white' : ''} rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="HTML">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"></path></svg>
        </button>
      
        <button onclick="activeNav('CSS')" class="w-full ${(project.activePanel === 'css') ? 'active text-white' : ''} rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="CSS">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z"></path></svg>
        </button>
      
        <button onclick="activeNav('Javascript')" class="w-full ${(project.activePanel === 'javascript') ? 'active text-white' : ''} rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="Javascript">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"></path></svg>
        </button>

        <button onclick="activeNav('Preview')" class="${(project.preview) ? '' : ''} ${(project.preview ? 'bg-white/[.15]' : '')} w-full rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="Preview">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"></path></svg>
        </button>
      </div>
      
      <div class="flex flex-col justify-between gap-2">
        <button onclick="project.dark = !project.dark;" class="w-full rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="Toggle Theme">
          ${project.dark ? icons.sun : icons.moon}
        </button>
      
        <button onclick="activeNav('Settings')" class="${(data.activeNav === 'Settings') ? 'active text-white' : ''} w-full rail-item group relative h-12 rounded-2xl border border-transparent grid place-items-center text-slate-400 hover:text-white hover:bg-white/[.05] transition " title="Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" stroke="currentColor" stroke-width="2"></path><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 3.6 15a1.7 1.7 0 0 0-.6-1A1.7 1.7 0 0 0 1.9 13H2a2 2 0 1 1 0-4h-.1A1.7 1.7 0 0 0 3.6 7a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 8 3.6 1.7 1.7 0 0 0 9 3a1.7 1.7 0 0 0 .4-1.1V2a2 2 0 1 1 4 0v-.1A1.7 1.7 0 0 0 15 3.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 8c.12.39.34.74.6 1 .3.3.7.5 1.1.5h.1a2 2 0 1 1 0 4h-.1c-.4 0-.8.2-1.1.5-.26.26-.48.61-.6 1Z" stroke="currentColor" stroke-width="1.5"></path></svg>
        </button>
      </div>
    </nav>`;
}
function PreviewMenu() {
  const buttonClass = "p-2 rounded-xl hover:bg-white/[.08] transition-all duration-200 text-slate-400 hover:text-white";
  const selectClass = "appearance-none px-3 py-2 rounded-xl bg-white/[.05] border border-white/[.08] text-sm text-slate-300 focus:border-cyan-400/40 focus:outline-none transition cursor-pointer";

  const sizeOptions = {
    Phones: {
      '320x480': 'iPhone 3/3GS',
      '375x667': 'iPhone 6/7/8/SE',
      '414x736': 'iPhone 6/7/8 Plus',
      '375x812': 'iPhone X / 11 Pro',
      '414x896': 'iPhone XR / 11',
      '390x844': 'iPhone 12/13/14/15',
      '428x926': 'iPhone Pro Max',
      '360x780': 'iPhone Mini',
      '360x640': 'Android Baseline',
      '360x740': 'Android Tall',
      '393x851': 'Pixel 5',
      '412x915': 'Android XL',
    },
    Tablets: {
      '768x1024': 'iPad Classic',
      '820x1180': 'iPad Air',
      '810x1080': 'iPad 10.2"',
      '834x1194': 'iPad Pro 11"',
      '1024x1366': 'iPad Pro 12.9"',
      '800x1280': 'Android Tablet',
      '912x1368': 'Android Large',
    },
    Desktops: {
      '1280x800': 'HD Laptop',
      '1366x768': 'Standard Laptop',
      '1440x900': 'MacBook Air',
      '1536x864': 'HD+',
      '1680x1050': 'WSXGA+',
      '1920x1080': 'Full HD',
      '2560x1440': 'WQHD',
      '3440x1440': 'UltraWide',
      '3840x2160': '4K UHD',
    }
  };

  const previewSize = `
    <div class="relative">
      <select id="selectedSize" onchange="resizeCanvas(this.value)" class="${selectClass}" value="${data.selectedSize}">
        <option value="none" ${data.selectedSize === 'none' ? 'selected' : ''}>📱 Select Device Size</option>
        ${Object.keys(sizeOptions).map(group => `
          <optgroup label="${group}" class="bg-[#0f1522]">
            ${Object.keys(sizeOptions[group]).map(option => `
              <option value="${option}" ${data.selectedSize === option ? 'selected' : ''} class="bg-[#0f1522]">${sizeOptions[group][option]} (${option})</option>
            `).join('')}
          </optgroup>
        `).join('')}
      </select>
      <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>`;

  function canTidyShow() {
    if (!project.activePanel) return 'hidden';
    if (project.activePanel === 'html' && project.html_pre_processor !== 'html') return 'hidden';
    if (project.activePanel === 'css' && project.css_pre_processor !== 'css') return 'hidden';
    if (project.activePanel === 'javascript' && project.javascript_pre_processor !== 'javascript') return 'hidden';
    return '';
  }

  return `
    <div class="flex flex-wrap items-center justify-between gap-2 p-2 bg-gradient-to-r from-[#0f1522]/50 to-[#0a0f18]/50 backdrop-blur-sm border-b border-white/[.08]">
      <!-- Device Size Selector -->
      <div class="flex items-center gap-2">
        <div class="block">
          ${previewSize}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-1">
        <span class="flex items-center gap-1">
          <!-- Rotate Canvas -->
          <button 
            aria-label="rotate canvas"
            onclick="rotateCanvas()"
            class="${buttonClass} ${data.selectedSize === 'none' ? 'opacity-50 cursor-not-allowed hidden' : ''}"
            ${data.selectedSize === 'none' ? 'disabled' : ''}
            title="Rotate preview">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <!-- Toggle Columns View -->
          <button 
            aria-label="change view"
            onclick="project.columns = !project.columns"
            class="${buttonClass} hidden md:inline-block ${!project.activePanel ? 'hidden md:hidden' : ''}"
            title="Toggle split view">
            <svg class="w-5 h-5 transition-transform duration-300 ${project.columns ? '' : 'rotate-90'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Swap Columns Position -->
          <button 
            aria-label="swap columns position"
            onclick="project.columnsRight = !project.columnsRight"
            class="${buttonClass} hidden md:inline-block ${!project.activePanel ? 'hidden md:hidden' : ''}"
            title="Swap editor/preview position">
            <svg class="w-5 h-5 transition-transform duration-300 ${project.columnsRight ? '' : 'scale-x-[-1]'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </span>
        <span class="flex items-center gap-1">
          <!-- Tidy Code -->
          <button 
            aria-label="tidy code"
            onclick="tidy()"
            class="${buttonClass} ${canTidyShow()}"
            title="Format code">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 4.5l-7.5 7.5 7.5 7.5"></path>
            </svg>
          </button>

          <!-- Export Menu Button (uses Modal.render) -->
          <button 
            aria-label="export project"
            onclick="showExportModal()"
            class="${buttonClass}"
            title="Export project">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <!-- Run Preview -->
          <button 
            aria-label="run preview"
            onclick="renderPreview(true)"
            class="${buttonClass} ${project.autorun ? 'hidden' : ''}"
            title="Run preview">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <!-- Snapshot/Screenshot Button -->
          <button 
            aria-label="take screenshot"
            onclick="screenshot()"
            class="${buttonClass}"
            title="Take screenshot">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          </button>

          <!-- Theme Toggle Button -->
          <button 
            onclick="project.previewDark = !project.previewDark;" 
            class="${buttonClass}"
            title="Toggle theme">
            ${project.previewDark ? `
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ` : `
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            `}
          </button>

          <!-- Console Toggle Button -->
          <button 
            onclick="project.console = !project.console;" 
            class="${buttonClass} ${project.console ? 'text-green-500' : ''}"
            title="Toggle console">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </button>

          <!-- Auto-run indicator -->
          ${project.autorun ? `
            <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
              <div class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              <span>Auto-run</span>
            </div>
          ` : ''}
        </span>
      </div>
    </div>
  `;
}
window.App = {
  initialRender: true,
  render(container) {
    // Calculate zoom transform based on viewport size and iframe size
    const size = data.selectedSize;
    let viewportWidth, viewportHeight;
    const previewElm = document.getElementById('previewElm');
    if (document.getElementById('previewElm')) {
      viewportWidth = previewElm.clientWidth;
      viewportHeight = previewElm.clientHeight;
    }
    let [width, height] = size.split('x').map(Number);
  
    // Determine which overlay to show
    const showHomepage = data.activeNav === "Home";
    const showSearchPage = data.activeNav === "Search";
    const showSettingsPage = data.activeNav === "Settings";
    const showEditor = !showHomepage && !showSearchPage && !showSettingsPage;

    const html = `
      <div class="grid h-full grid-cols-[76px_1fr]">
        <aside class="w-20 h-full border-r border-white/[.08] bg-[#080b13]/80 backdrop-blur-xl flex flex-col items-center py-4 gap-3 overflow-y-auto">
          ${LeftMenubar()}
        </aside>
        
        <!-- flexbox for panels and preview -->
        <main class="flex flex-col flex-col-reverse sm:flex-row absolute inset-y-0 right-0 left-20 bottom-0 overflow-hidden">
          <div class="relative w-full h-full border-0 border-x border-solid overflow-auto p-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
            <nav class="absolute inset-0 flex flex-col ${project.columns ? 'flex-col' : `sm:flex-row ${project.columnsRight ? 'sm:flex-row-reverse' : ''}`}">
              <div class="flex-grow w-full h-full flex flex-col ${project.columns ? '' : `border-0 border-x border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}`} ${project.preview ? '' : 'hidden'}">
                <div class="flex-none border-0 border-b border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}">
                  ${PreviewMenu()}
                </div>
                <div class="flex-grow overflow-hidden h-full">
                  <div id="previewElm" class="relative grid grid-cols-1 align-center items-center w-full h-full">
                    <iframe
                      id="iframe"
                      title="${project.title}"
                      class="bg-white ${data.selectedSize !== 'none' ? `border border-solid ${project.dark ? "border-gray-800" : "border-gray-200"} shadow-2xl shadow-blue-500` : ''} ${(data.activeNav === "Home" || data.activeNav === "Search" || data.activeNav === "Settings") ? 'hidden' : ''}"
                      style="${data.selectedSize === 'none' ? 'width: 100%; height: 100%' : `
      width: ${width}px;
      height: ${height}px;
      transform: scale(${Math.min(viewportWidth / width, viewportHeight / height)});
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -${height / 2}px;
      margin-left: -${width / 2}px;`}"
                      allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *"
                      allowfullscreen="true"
                      allowpaymentrequest="true"
                      allowtransparency="true"
                      sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                      loading="lazy"
                    ></iframe>

                    <span 
                      id="iframeClientSize" 
                      class="hidden opacity-0 transition-opacity duration-300 absolute top-0 right-0 ${project.dark ? 'bg-gray-800' : 'bg-gray-200'} p-1 text-xs">
                        ${data.iframeSize}
                    </span>
                  </div>
                </div>
              </div>
              <div class="relative flex-grow w-full h-full ${project.columns ? '' : '2xl:w-1/2 sm:border-solid sm:border-0 lg:border-r '+project.dark ? "border-gray-800" : "border-gray-200"+''} ${project.activePanel ? '' : 'hidden'}">
                <div class="absolute inset-0 flex flex-col justify-between">
                  <div class="flex-grow overflow-auto ${project.columns ? `border-0 border-t border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}` : ''}">
                    <div class="h-full ${project.activePanel === 'html' ? '' : 'hidden'}">
                      <div 
                        data-ignore
                        class="h-full"
                        name="html editor"
                        id="htmlEditor"></div>
                    </div>
                    <div class="h-full ${project.activePanel === 'css' ? '' : 'hidden'}">
                      <div 
                        data-ignore
                        class="h-full"
                        name="css editor"
                        id="cssEditor"></div>
                    </div>
                    <div class="h-full ${project.activePanel === 'javascript' ? '' : 'hidden'}">
                      <div 
                        data-ignore
                        class="h-full"
                        name="javascript editor"
                        id="jsEditor"></div>
                    </div>
                  </div>
                  <div class="flex-none overflow-auto border-0 border-t border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}">
                    ${editorNav()}
                  </div>
                </div>
              </div>
            </nav>

            ${showHomepage ? Homepage() : ''}
            ${showSearchPage ? SearchPage() : ''}
            ${showSettingsPage ? SettingsPage() : ''}
          </div>
        </main>
      </div>`
    
    const element = document.querySelector(container);
    if (!element) return;

    // Create a new temporary element to compare
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    if (doc.body.innerHTML.trim() === html.trim()) return;
    if (App.initialRender) {
      element.innerHTML = html;
      renderPreview(true);
      App.initialRender = false;
      return false;
    }

    // Compare and update only the changed parts
    const currentDoc = element.firstElementChild;
    const newDoc = doc.body.firstElementChild;
    diffNodes(currentDoc, newDoc);
  }
}
window.Modal = {
  render({
    large,
    title = "Are you sure you want to proceed?",
    content,
    CloseLabel,
    ConfirmLabel,
    onLoad,
    onClose,
    onConfirm
  }) {
    const times = `<svg class="w-4 h-4" viewBox="0 0 384 512" fill="currentColor">
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
    </svg>`;

    const html = `
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
        <dialog open class="relative bg-transparent p-0 m-0 max-w-2xl w-full mx-4">
          <article class="${large ? 'flex flex-col h-[80vh]' : ''} relative rounded-2xl bg-gradient-to-br from-[#0f1522] to-[#0a0f18] border border-white/[.08] shadow-2xl shadow-black/50 overflow-hidden animate-in zoom-in duration-300">
            
            <!-- Animated gradient border effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <!-- Header -->
            <header class="${large ? 'flex-none' : ''} flex justify-between items-center p-5 border-b border-white/[.08] bg-white/[.02]">
              <h1 class="text-xl font-semibold modal-title">${title}</h1>
              <button class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[.08] transition-all duration-200" aria-label="Close">
                ${times}
              </button>
            </header>
            
            <!-- Content -->
            <main class="font-light text-slate-300 ${large ? 'flex-grow overflow-auto' : ''} p-6">
              ${content ? content : '<div class="text-center">No additional content provided.</div>'}
            </main>
            
            <!-- Footer -->
            <footer class="${large ? 'flex-none' : ''} flex justify-end gap-3 p-5 border-t border-white/[.08] bg-white/[.02]">
              <button class="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/[.05] hover:bg-white/[.1] border border-white/[.08] transition-all duration-200" aria-label="Close">
                ${CloseLabel || 'Cancel'}
              </button>
              ${onConfirm ? `<button class="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]" aria-label="Confirm">
                ${ConfirmLabel || 'Confirm'}
              </button>` : ''}
            </footer>
          </article>
        </dialog>
      </div>
    `;

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = html;
    const modalElement = modalContainer.firstElementChild;
    
    document.body.appendChild(modalElement);
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#modal-animations')) {
      const style = document.createElement('style');
      style.id = 'modal-animations';
      style.textContent = `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation-duration: 0.2s;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .zoom-in {
          animation-name: zoom-in;
        }
      `;
      document.head.appendChild(style);
    }
    
    if (onLoad && typeof onLoad === 'function') {
      onLoad();
    }

    // Get elements
    const containerDiv = modalElement;
    const closeBtn = containerDiv.querySelector('header button');
    const cancelBtn = containerDiv.querySelector('footer button:first-child');
    const confirmBtn = containerDiv.querySelector('footer button:last-child');

    // Close handler
    const closeModal = () => {
      containerDiv.classList.remove('fade-in');
      containerDiv.querySelector('article')?.classList.remove('zoom-in');
      setTimeout(() => {
        if (onClose && typeof onClose === 'function') {
          onClose();
        }
        document.body.removeChild(containerDiv);
      }, 200);
    };

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Close on backdrop click
    containerDiv.addEventListener('click', (e) => {
      if (e.target === containerDiv) {
        closeModal();
      }
    });
    
    // Button handlers
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        if (onConfirm && typeof onConfirm === 'function') {
          onConfirm();
        }
        closeModal();
      };
    }
  }
}
function editorNav() {
  const buttonClass = "w-full p-2 grid grid-cols-1 gap-0 place-items-center";

  return `<div class="flex justify-between">
    <button
      aria-label="indent"
      name="indent"
      class="${buttonClass}"
      onclick="editorCommand('indent', getActiveEditor())">
      ${icons.indent}
    </button>
    <button
      aria-label="outdent"
      name="outdent"
      class="${buttonClass}"
      onclick="editorCommand('outdent', getActiveEditor())">
      ${icons.outdent}
    </button>
    <button
      aria-label="undo"
      name="undo"
      class="${buttonClass}"
      onclick="editorCommand('undo', getActiveEditor())">
      ${icons.undo}
    </button>
    <button
      aria-label="redo"
      name="redo"
      class="${buttonClass}"
      onclick="editorCommand('redo', getActiveEditor())">
      ${icons.redo}
    </button>
    <button
      aria-label="search"
      name="search"
      class="${buttonClass}"
      onclick="editorCommand('search', getActiveEditor())">
      ${icons.search}
    </button>
    <button
      aria-label="goto line"
      name="goto line"
      class="${buttonClass}"
      onclick="editorCommand('goto', getActiveEditor())">
      ${icons.goto}
    </button>
  </div>

  <div class="flex justify-between">
    <button
      aria-label="comment"
      name="comment"
      class="${buttonClass}"
      onclick="editorCommand('toggleComment', getActiveEditor())">
      ${icons.comment}
    </button>
    <button
      aria-label="fold"
      name="fold"
      class="${buttonClass}"
      onclick="editorCommand('foldAll', getActiveEditor())">
      ${icons.fold}
    </button>
    <button
      aria-label="unfold"
      name="unfold"
      class="${buttonClass}"
      onclick="editorCommand('unfoldAll', getActiveEditor())">
      ${icons.unfold}
    </button>
    <button
      aria-label="cut"
      name="cut"
      class="${buttonClass}"
      onclick="editorCommand('cut', getActiveEditor())">
      ${icons.cut}
    </button>
    <button
      aria-label="copy"
      name="copy"
      class="${buttonClass}"
      onclick="editorCommand('copy', getActiveEditor())">
      ${icons.copy}
    </button>
    <button
      aria-label="paste"
      name="paste"
      class="${buttonClass}"
      onclick="editorCommand('paste', getActiveEditor())">
      ${icons.paste}
    </button>
    <button
      aria-label="select all"
      name="select all"
      class="${buttonClass}"
      onclick="editorCommand('selectAll', getActiveEditor())">
      ${icons.cursor}
    </button>
  </div>`;
}

// Helper Functions
window.activeNav = item => {
  if (item === "X/Twitter") {
    window.open('https://twitter.com/kodeweave_app');
  } else if (item === "Search") {
    data.activeNav = 'Search'; 
    data.searchQuery = ''
  } else if (item === "HTML") {
    project.activePanel = project.activePanel === 'html' ? null : 'html';
    if (project.activePanel === 'html') {
      data.activeNav = "HTML";
      setActiveEditor(htmlEditor); 
    } else {
      data.activeNav = null;
    }
  } else if (item === "CSS") {
    project.activePanel = project.activePanel === 'css' ? null : 'css';
    if (project.activePanel === 'css') {
      data.activeNav = "CSS";
      setActiveEditor(cssEditor); 
    } else {
      data.activeNav = null;
    }
  } else if (item === "Javascript") {
    project.activePanel = project.activePanel === 'javascript' ? null : 'javascript';
    if (project.activePanel === 'javascript') {
      data.activeNav = "Javascript";
      setActiveEditor(jsEditor); 
    } else {
      data.activeNav = null;
    }
  } else if (item === "Preview") {
    data.activeNav = null;
    project.preview = !project.preview;
  } else if (item === "Console") {
    project.console = !project.console;
  } else if (item === "Snapshot") {
    screenshot();
  } else if (item === "Settings") {
    data.activeNav = 'Settings';
  } else {
    data.activeNav = item;
  }
}
window.performMediaSearch = async query => {
  if (!query || query.length < 2) {
    document.getElementById('searchResultsContainer').innerHTML = `
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 border border-white/[.08] flex items-center justify-center">
            <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Type to search</h3>
          <p class="text-slate-400 text-sm">Enter at least 2 characters to search for media</p>
        </div>
      </div>
    `;
    return;
  }
  
  // Update the stored query
  d.lastMediaQuery = query;
  d.lastSelectedMediaType = document.getElementById('mediaTypeFilter')?.value || 'all';
  const mediaType = d.lastSelectedMediaType;
  
  // Show loading state
  document.getElementById('searchResultsContainer').innerHTML = `
    <div class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin"></div>
        <p class="text-slate-400 text-sm">Searching for "${query}"...</p>
      </div>
    </div>
  `;
  
  try {
    let results = [];
    
    // Use your existing API functions
    if (mediaType === 'all' || mediaType === 'image') {
      const images = await searchOpenverseImage(query);
      results.push(...images.map(img => ({ type: 'image', ...img })));
    }
    if (mediaType === 'all' || mediaType === 'audio') {
      const audios = await searchOpenverseAudio(query);
      results.push(...audios.map(audio => ({ type: 'audio', ...audio })));
    }
    if (mediaType === 'all' || mediaType === 'svg') {
      const icons = await searchIcons(query);
      results.push(...icons.map(icon => ({ 
        type: 'icon', 
        url: `https://api.iconify.design/${icon}.svg`, 
        name: icon 
      })));
    }
    
    d.lastSearchResults = results;
    displaySearchResults(results);
  } catch (error) {
    console.error('Search error:', error);
    document.getElementById('searchResultsContainer').innerHTML = `
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-400/20 border border-white/[.08] flex items-center justify-center">
            <svg class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Search Error</h3>
          <p class="text-slate-400 text-sm">Failed to fetch results. Please try again.</p>
        </div>
      </div>
    `;
  }
};
window.displaySearchResults = results => {
  const container = document.getElementById('searchResultsContainer');
  
  if (!container) return;
  
  if (!results || results.length === 0) {
    container.innerHTML = `
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-white/[.08] flex items-center justify-center">
            <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">No results found</h3>
          <p class="text-slate-400 text-sm">Try different keywords or adjust your filters</p>
        </div>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  // Images section
  const images = results.filter(r => r.type === 'image');
  if (images.length > 0) {
    html += `
      <div class="glass rounded-[26px] p-5 mb-4">
        <h2 class="font-bold text-white mb-4 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" stroke="currentColor" stroke-width="1.5"/><path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" stroke="currentColor" stroke-width="1.5"/></svg>
          Images (${images.length})
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          ${images.map(img => `
            <div class="group cursor-pointer" onclick="copyToClipboard('${img.url.replace(/'/g, "\\'")}'); alert('Image URL copied to clipboard'); closeOpenDialog();">
              <div class="rounded-xl overflow-hidden border border-white/[.08] bg-white/[.035] group-hover:border-cyan-400/50 transition">
                <img src="${img.url}" alt="${img.title || 'Image'}" class="w-full h-32 object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
              </div>
              <div class="mt-2 text-xs text-slate-500 truncate text-center">${(img.title?.substring(0, 30) || 'Image').replace(/'/g, "\\'")}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Audio section
  const audios = results.filter(r => r.type === 'audio');
  if (audios.length > 0) {
    html += `
      <div class="glass rounded-[26px] p-5 mb-4">
        <h2 class="font-bold text-white mb-4 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          Audio (${audios.length})
        </h2>
        <div class="space-y-3">
          ${audios.map(audio => `
            <div class="rounded-2xl border border-white/[.08] bg-white/[.035] p-4 hover:bg-white/[.06] transition">
              <div class="flex items-center justify-between flex-wrap gap-3">
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-white truncate">${(audio.title || 'Audio Track').replace(/'/g, "\\'")}</div>
                  <div class="text-xs text-slate-500">${(audio.creator || 'Unknown Artist').replace(/'/g, "\\'")}</div>
                </div>
                <audio controls class="max-w-xs" preload="none">
                  <source src="${audio.url}" type="${audio.mime_type || 'audio/mpeg'}">
                </audio>
                <button onclick="copyToClipboard(this.previousElementSibling?.outerHTML || ''); alert('Audio HTML copied!'); closeOpenDialog();" class="px-3 py-1.5 rounded-lg text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition">
                  Copy
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // SVG Icons section
  const icons = results.filter(r => r.type === 'icon');
  if (icons.length > 0) {
    html += `
      <div class="glass rounded-[26px] p-5 mb-4">
        <h2 class="font-bold text-white mb-4 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" stroke="currentColor" stroke-width="2"/><path d="M8 7h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          SVG Icons (${icons.length})
        </h2>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          ${icons.map((icon, idx) => `
            <div class="group cursor-pointer" onclick="fetchAndCopyIcon('${icon.url}')">
              <div class="rounded-xl border border-white/[.08] bg-white/[.035] p-4 text-center group-hover:border-cyan-400/50 group-hover:bg-white/[.06] transition">
                <div class="h-12 w-12 mx-auto flex items-center justify-center icon-preview-${idx}" data-icon-url="${icon.url}">
                  <div class="animate-pulse text-xs text-slate-500">Loading...</div>
                </div>
              </div>
              <div class="mt-2 text-xs text-slate-500 truncate text-center">${(icon.name?.split('/').pop() || 'Icon').replace(/'/g, "\\'")}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Load icons after rendering
    setTimeout(() => {
      icons.forEach((icon, idx) => {
        const container = document.querySelector(`.icon-preview-${idx}`);
        if (container && container.getAttribute('data-icon-url')) {
          loadIconPreview(container, icon.url);
        }
      });
    }, 100);
  }
  
  container.innerHTML = html;
  d.lastDisplayedResultsHTML = html;
};
window.fetchAndCopyIcon = async url => {
  try {
    const response = await fetch(url);
    const svgContent = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    if (svgElement) {
      svgElement.removeAttribute('width');
      svgElement.removeAttribute('height');
      const serializer = new XMLSerializer();
      const cleanedSvg = serializer.serializeToString(svgElement);
      copyToClipboard(cleanedSvg);
      closeOpenDialog();
      return false;
    } else {
      alert('❌ Failed to extract SVG');
    }
  } catch (error) {
    console.error('Failed to copy icon:', error);
  }
};
window.loadIconPreview = async (container, iconUrl) => {
  try {
    const response = await fetch(iconUrl);
    const svgContent = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    
    if (svgElement) {
      svgElement.removeAttribute('width');
      svgElement.removeAttribute('height');
      svgElement.setAttribute('width', '48');
      svgElement.setAttribute('height', '48');
      svgElement.style.fill = 'currentColor';
      container.innerHTML = '';
      container.appendChild(svgElement);
    } else {
      container.innerHTML = '<span class="text-red-400 text-xs">Error</span>';
    }
  } catch (err) {
    console.error('Failed to load icon:', err);
    container.innerHTML = '<span class="text-red-400 text-xs">Failed</span>';
  }
};
window.preloadFrameworkTemplates = async () => {
  const frameworks = [
    "javascript", "typescript", "react", "vue", "preact", 
    "angular", "alpine", "solid", "stimulus", "mithril", 
    "hyperapp", "aurelia", "lit", "knockout", "moon"
  ];
  
  const cache = {};
  for (const name of frameworks) {
    try {
      const response = await fetch(`json/frameworks/${name}.json`);
      if (response.ok) {
        cache[name] = await response.json();
      }
    } catch (error) {
      console.warn(`Failed to preload ${name}:`, error);
    }
  }
  window.frameworkCache = cache;
};
async function searchMediaAssets(query) {
  // You can integrate with Openverse API here
  // For now, return mock data
  return [];
}
window.emptyStorage = () => {
  Modal.render({
    title: "Are you sure you want to a new clean slate?",
    content: '<div class="p-4 text-center">All current data will be lost.</div>',
    onConfirm() {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      // Clear local storage
      localStorage.removeItem('kodeWeave');
    
      // Clear session storage specific to kodeWeave (if you use a specific key)
      sessionStorage.removeItem('kodeWeave');
    
      // Clear cookies specific to kodeWeave
      document.cookie.split(";").forEach(function(c) {
        if (c.trim().startsWith('kodeWeave')) {
          document.cookie = c.trim().split("=")[0] + 
                            '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
        }
      });
    
      // Clear service worker caches specific to kodeWeave
      if ('caches' in window) {
        caches.keys().then(function(names) {
          names.forEach(function(name) {
            if (name === 'kodeWeave-cache') {
              caches.delete(name);
            }
          });
        });
      }
    
      // Unregister service workers specific to kodeWeave
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          registrations.forEach(function(registration) {
            if (registration.scope.includes('kodeWeave')) {
              registration.unregister();
            }
          });
        });
      }
    
      location.reload();
    }
  });
}
window.updateVersionPart = (part, value) => {
  const versionParts = project.version.split('.');
  if (part === 'major') {
    versionParts[0] = value;
  } else if (part === 'minor') {
    versionParts[1] = value;
  } else if (part === 'patch') {
    versionParts[2] = value;
  }
  project.version = versionParts.join('.');
}
window.checkApiConnection = async () => {
  try {
    const response = await fetch('https://api.iconify.design/collections');
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("API connection failed:", error);
  }
  return false;
}
window.searchOpenverseImage = async query => {
  const url = `https://api.openverse.org/v1/images?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (response.ok) {
      const data = await response.json();
      return data.results;
  } else {
      console.error("API request failed:", response.status);
      return [];
  }
}
window.searchOpenverseAudio = async query => {
  const url = `https://api.openverse.org/v1/audio?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data.results;
  } else {
    console.error("API request failed:", response.status);
    return [];
  }
}
window.searchIcons = async query => {
  const searchUrl = `https://api.iconify.design/search?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(searchUrl);
    if (response.ok) {
      const data = await response.json();
      return data.icons || [];
    } else {
      console.error("Failed to fetch icon search results.");
    }
  } catch (error) {
    console.error("Error during icon search:", error);
  }
  return [];
}
window.copyToClipboard = text => {
  navigator.clipboard.writeText(text).then(function() {
    alert('✅ Copied to clipboard!');
  }).catch(function(error) {
    console.error('Failed to copy text: ', error);
  });
}
window.searchLibraries = () => {
  let modalContent = `
    <div class="space-y-4">
      <div class="relative">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input 
          id="librarySearchInput" 
          type="search" 
          placeholder="Search for libraries (jQuery, React, Bootstrap, Three.js...)" 
          class="w-full p-3 pl-12 rounded-xl bg-white/[.05] border border-white/[.08] focus:border-cyan-400/40 outline-none transition"
          autofocus
          oninput="performLibrarySearch(this.value)"
        />
      </div>
      
      <div id="librarySearchResults" class="space-y-2 max-h-96 overflow-auto">
        <div class="text-center py-8 text-slate-400">
          <svg class="w-12 h-12 mx-auto mb-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Type to search for libraries from CDNJS</p>
          <p class="text-xs mt-2">Search for JavaScript libraries, CSS frameworks, and more</p>
        </div>
      </div>
      
      <div class="text-xs text-slate-500 text-center border-t border-white/[.08] pt-4 mt-2">
        <p>Results from <a href="https://cdnjs.com" target="_blank" class="text-cyan-400 hover:text-cyan-300">cdnjs.com</a> — Click any library to add it to your project</p>
      </div>
    </div>
  `;

  Modal.render({
    title: "🔍 Search Libraries & Frameworks",
    content: modalContent,
    large: false,
    onLoad: function() {
      // Focus the search input
      const searchInput = document.getElementById('librarySearchInput');
      if (searchInput) searchInput.focus();
    },
    onClose: function() {
      // Clear search results when closing
      data.searchLibKey = null;
      data.librarySuggestions = null;
    }
  });
};
window.performLibrarySearch = async query => {
  const resultsContainer = document.getElementById('librarySearchResults');
  
  if (!query || query.length < 2) {
    resultsContainer.innerHTML = `
      <div class="text-center py-8 text-slate-400">
        <svg class="w-12 h-12 mx-auto mb-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p>Type at least 2 characters to search</p>
      </div>
    `;
    return;
  }
  
  // Show loading state
  resultsContainer.innerHTML = `
    <div class="text-center py-8">
      <div class="w-8 h-8 mx-auto mb-3 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin"></div>
      <p class="text-slate-400 text-sm">Searching for "${escapeHtml(query)}"...</p>
    </div>
  `;
  
  try {
    const response = await fetch(`https://api.cdnjs.com/libraries?search=${encodeURIComponent(query)}&fields=name,description,version,latest,filename`);
    
    if (!response.ok) throw new Error('Search failed');
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      resultsContainer.innerHTML = data.results.map(library => `
        <div onclick="addLibraryFromSearch('${escapeHtml(library.latest)}', '${escapeHtml(library.name)}')" 
             class="p-4 rounded-xl bg-white/[.03] border border-white/[.06] hover:bg-white/[.08] hover:border-cyan-400/30 transition-all cursor-pointer group">
          <div class="flex justify-between items-start gap-3">
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-white group-hover:text-cyan-300 transition">${escapeHtml(library.name)}</div>
              <div class="text-xs text-cyan-400 font-mono mt-0.5">${escapeHtml(library.version)}</div>
              ${library.description ? `<div class="text-xs text-slate-500 mt-2 line-clamp-2">${escapeHtml(library.description.substring(0, 150))}${library.description.length > 150 ? '...' : ''}</div>` : ''}
            </div>
            <button class="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium transition whitespace-nowrap">
              Add →
            </button>
          </div>
          <div class="mt-2 text-[11px] text-slate-600 font-mono truncate">${escapeHtml(library.latest)}</div>
        </div>
      `).join('');
    } else {
      resultsContainer.innerHTML = `
        <div class="text-center py-8 text-slate-400">
          <svg class="w-12 h-12 mx-auto mb-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No libraries found for "${escapeHtml(query)}"</p>
          <p class="text-xs mt-2">Try a different search term</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Search error:', error);
    resultsContainer.innerHTML = `
      <div class="text-center py-8 text-red-400">
        <svg class="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>Failed to search libraries</p>
        <p class="text-xs mt-2">Please check your internet connection</p>
      </div>
    `;
  }
};
window.addLibraryFromSearch = (url, name) => {
  if (!project.libraries.includes(url)) {
    project.libraries.push(url);
    renderPreview(true);
    
    // Show success feedback
    const btn = event?.target?.closest('button');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.classList.add('bg-green-500/20', 'text-green-300');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500/20', 'text-green-300');
      }, 1500);
    }
    
    // Also update the settings page libraries list if it exists
    const librariesBox = document.getElementById('librariesBoxSettings');
    if (librariesBox) {
      // Force a re-render of the settings page to show the new library
      if (data.activeNav === 'Settings') {
        App.render('#app');
      }
    }
  } else {
    // Library already exists
    const btn = event?.target?.closest('button');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = 'Already added!';
      btn.classList.add('bg-yellow-500/20', 'text-yellow-300');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-yellow-500/20', 'text-yellow-300');
      }, 1500);
    }
  }
};
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
window.showExportModal = () => {
  const modalContent = `
    <div class="space-y-2">
      <p class="text-slate-400 text-sm mb-4">Export your project in various formats</p>
      
      <button onclick="downloadJSON(); closeExportModal()" class="w-full p-3 rounded-xl bg-white/[.05] hover:bg-white/[.1] transition flex items-center gap-3 group">
        <svg class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <div class="flex-1 text-left">
          <div class="font-semibold text-white group-hover:text-cyan-300 transition">Save Project (.json)</div>
          <div class="text-xs text-slate-500">Export as JSON file for backup or sharing</div>
        </div>
      </button>
      
      <button onclick="downloadHTML(); closeExportModal()" class="w-full p-3 rounded-xl bg-white/[.05] hover:bg-white/[.1] transition flex items-center gap-3 group">
        <svg class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
        </svg>
        <div class="flex-1 text-left">
          <div class="font-semibold text-white group-hover:text-cyan-300 transition">Export as HTML</div>
          <div class="text-xs text-slate-500">Single HTML file with all code embedded</div>
        </div>
      </button>
      
      <button onclick="downloadProject(); closeExportModal()" class="w-full p-3 rounded-xl bg-white/[.05] hover:bg-white/[.1] transition flex items-center gap-3 group">
        <svg class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <div class="flex-1 text-left">
          <div class="font-semibold text-white group-hover:text-cyan-300 transition">Download ZIP Archive</div>
          <div class="text-xs text-slate-500">Complete project with all assets</div>
        </div>
      </button>
      
      <div class="border-t border-white/[.08] my-2"></div>
      
      <button onclick="shareProject(); closeExportModal()" class="w-full p-3 rounded-xl bg-white/[.05] hover:bg-white/[.1] transition flex items-center gap-3 group">
        <svg class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        <div class="flex-1 text-left">
          <div class="font-semibold text-white group-hover:text-cyan-300 transition">Share Weave</div>
          <div class="text-xs text-slate-500">Create a shareable URL</div>
        </div>
      </button>
      
      <button onclick="shareToCodepen(); closeExportModal()" class="w-full p-3 rounded-xl bg-white/[.05] hover:bg-white/[.1] transition flex items-center gap-3 group">
        <svg class="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L6.5 7 12 3.5 17.5 7 12 9.5zm0 2.5l-6-3v4l6 3 6-3v-4l-6 3z"/>
        </svg>
        <div class="flex-1 text-left">
          <div class="font-semibold text-white group-hover:text-cyan-300 transition">Share to CodePen</div>
          <div class="text-xs text-slate-500">Open in CodePen editor</div>
        </div>
      </button>
    </div>
  `;
  
  Modal.render({
    title: "📦 Export Project",
    content: modalContent,
    CloseLabel: "Cancel",
    onClose: () => {
      // Cleanup if needed
    }
  });
};
window.closeExportModal = () => {
  const modal = document.querySelector('.fixed.inset-0.z-50');
  if (modal) {
    const closeBtn = modal.querySelector('footer button:first-child');
    if (closeBtn) closeBtn.click();
  }
};
window.toggleExportMenuSettings = () => {
  const menu = document.getElementById('exportMenuSettings');
  if (menu) menu.classList.toggle('hidden');
};
window.hideExportMenuSettings = () => {
  const menu = document.getElementById('exportMenuSettings');
  if (menu) menu.classList.add('hidden');
};
window.toggleExportMenu = () => {
  const menu = document.getElementById('exportMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
};
window.hideExportMenu = () => {
  const menu = document.getElementById('exportMenu');
  if (menu) {
    menu.classList.add('hidden');
  }
};
document.addEventListener('click', e => {
  const menu = document.getElementById('exportMenu');
  const exportBtn = e.target.closest('[aria-label="export menu"]');
  if (menu && !exportBtn && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

// editor functions
window.addLibrary = url => {
  if (!url) {
    project.libraries.push('');
    document.getElementById('librariesBox').innerHTML = renderLibraries();
    return false;
  }

  if (!project.libraries.includes(url)) {
    project.libraries.push(url);
  } else {
    console.error(`Library already exists: ${url}`);
  }

  if (document.getElementById('librariesBox')) {
    document.getElementById('librariesBox').innerHTML = renderLibraries();
  }
};
function renderLibraries() {
  return project.libraries.map((library, index) => `
    <nav class="flex justify-between py-2" data-index="${index}">
      <input 
        type="text" 
        placeholder="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js" 
        data="library" 
        class="w-full pl-3 pr-0 rounded-md rounded-r-none focus:shadow-none"
        style="margin-bottom: 0;"
        value="${library}" 
        oninput="project.libraries[${index}] = this.value" />
      <button 
        aria-label="delete library"
        name="delete library"
        class="px-3 py-[15px] h-full border-0 rounded-md rounded-l-none"
        onclick="project.libraries.splice(${index}, 1);">
        ${icons.trash}
      </button>
    </nav>
  `).join('')
}
window.fetchSuggestions = key => {
  fetch(
    `https://api.cdnjs.com/libraries?search=${key}&fields=filename,description,version`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(item => {
      if (item && item.results && item.results.length > 0) {
        const suggestions = item.results.map(result => result);

        data.librarySuggestions = suggestions.map(result => {
          return `
            <section 
              class="cursor-pointer"
              onclick="
                if (!project.libraries.includes('${result.latest}')) project.libraries.push('${result.latest}'); 
                data.libraries = null;
                data.searchLibKey = null;
                data.librarySuggestions = null;
                searchInput.value = null;
              ">
              <div class="flex justify-between mb-2 font-bold text-1xl">
                <span class="font-bold">${result.name}</span>
                <span class="font-bold">${result.version}</span>
              </div>
              <div class="text-sm font-thin">${result.description}<br><hr></div>
            </section>`;
        }).join('');
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
window.removeScript = src => {
  const script = document.querySelector(`script[src="${src}"]`);
  if (script) script.remove();
}
window.removeScripts = scripts => {
  scripts.forEach(src => {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) script.remove();
  });
}
window.loadScript = async scriptUrl => {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      resolve(); // If the script is already present, resolve immediately
      return;
    }

    // Create a new script element if not present
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.onload = resolve; // Resolve when the script is successfully loaded
    scriptElement.onerror = () => reject(new Error(`Failed to load script: ${scriptUrl}`)); // Reject on error
    document.body.appendChild(scriptElement); // Append the script to the body
  });
}
window.loadScripts = async srcArray => {
  return Promise.all(srcArray.map(loadScript));
}
window.setPreprocessor = async (editor, value) => {
  const scriptMap = {
    html: {
      markdown: "libraries/preprocessors/marked.min.js",
      jade: "libraries/preprocessors/jade.js",
      pug: "libraries/preprocessors/pug.js"
    },
    css: {
      sass: "libraries/preprocessors/sass.sync.min.js",
      less: "libraries/preprocessors/less.min.js",
      stylus: "libraries/preprocessors/stylus.min.js"
    },
    javascript: {
      typescript: "libraries/preprocessors/typescript.min.js",
      babel: "libraries/preprocessors/babel.min.js"
    }
  };

  const currentPreprocessors = {
    html: project.html_pre_processor,
    css: project.css_pre_processor,
    javascript: project.javascript_pre_processor
  };

  try {
    const scriptSrcCondition = (value !== 'html' || value !== 'css' || value !== 'javascript');
    const scriptSrc = scriptSrcCondition ? scriptMap[editor][value] : null;

    // Remove the current preprocessor scripts
    if (currentPreprocessors[editor] && scriptSrcCondition) {
      const currentScriptSrc = scriptMap[editor][currentPreprocessors[editor]];
      Array.isArray(currentScriptSrc) ? removeScripts(currentScriptSrc) : removeScript(currentScriptSrc)

      // Load the new preprocessor scripts
      if (Array.isArray(scriptSrc)) {
        await loadScripts(scriptSrc);
      } else if (scriptSrc) {
        await loadScript(scriptSrc);
      }
    }

    // Set the new preprocessor
    if (editor === 'html') {
      project.html_pre_processor = value;
      // if (!window.editorManager || !window.editorManager.htmlEditor) return;
      // window.editorManager.setMode(project.html_pre_processor === 'html' ? 'html' : value, editorManager.htmlEditor);
    } else if (editor === 'css') {
      project.css_pre_processor = value;
      // if (!window.editorManager || !window.editorManager.cssEditor) return;
      // window.editorManager.setMode(project.css_pre_processor === 'css' ? 'css' : value, editorManager.cssEditor);
    } else if (editor === 'javascript') {
      project.javascript_pre_processor = value;
      if (!window.editorManager || !window.editorManager.jsEditor) return;
      window.editorManager.setMode(project.javascript_pre_processor === 'javascript' ? 'javascript' : value, editorManager.jsEditor);
    }
  } catch (error) {
    console.error('Error setting preprocessor:', error);
  }
}
window.initializePreprocessors = async () => {
  await Promise.all([
    setPreprocessor('html', project.html_pre_processor),
    setPreprocessor('css', project.css_pre_processor),
    setPreprocessor('javascript', project.javascript_pre_processor)
  ]);
  
  if (!window.editorManager) return;
  dispatchChanges(editorManager.htmlEditor, project.html);
  dispatchChanges(editorManager.cssEditor, project.css);
  dispatchChanges(editorManager.jsEditor, project.javascript);
  renderPreview(true);
}
window.loadBeautifyLibraries = async () => {
  const beautifyLibraries = [
    "libraries/js-beautify/beautify.min.js",
    "libraries/js-beautify/beautify-css.min.js",
    "libraries/js-beautify/beautify-html.min.js"
  ];
  await loadScripts(beautifyLibraries);
}
window.removeBeautifyLibraries = async () => {
  const beautifyLibraries = [
    "libraries/js-beautify/beautify.min.js",
    "libraries/js-beautify/beautify-css.min.js",
    "libraries/js-beautify/beautify-html.min.js"
  ];
  removeScripts(beautifyLibraries);
}
window.tidy = async () => {
  await loadBeautifyLibraries();

  let formattedCode;
  switch (project.activePanel) {
    case 'html':
      formattedCode = html_beautify(project.html, {
        indent_size: 2,
        max_preserve_newlines: 1,
        wrap_line_length: 80,              // Wrap lines at 80 characters
        wrap_attributes: 'auto',           // Wrap long attribute lists
        wrap_attributes_indent_size: 2,    // Indent wrapped attributes
        end_with_newline: true,            // Add newline at file end
        preserve_newlines: true,           // Keep semantic line breaks
        indent_inner_html: false,          // Don't indent <head>/<body> sections
        indent_scripts: 'keep',            // Keep script tag formatting
        extra_liners: ['head', 'body', '/html'] // Add extra lines after these tags
      });
      dispatchChanges(editorManager.htmlEditor, formattedCode);
      break;
    case 'css':
      formattedCode = css_beautify(project.css, {
        indent_size: 2,
        max_preserve_newlines: 1,
        end_with_newline: true,                 // Add trailing newline at file end
        newline_between_rules: true,            // Add blank line between CSS rules
        selector_separator_newline: true,       // Put multiple selectors on separate lines
        brace_style: "collapse"                 // Keep braces on same line (default)
      });
      project.css = formattedCode;
      dispatchChanges(editorManager.cssEditor, formattedCode);
      break;
    case 'javascript':
      formattedCode = js_beautify(project.javascript, {
        indent_size: 2,
        max_preserve_newlines: 1,
        brace_style: "collapse-preserve-inline",  // Better ES6+ support
        space_before_conditional: true,           // "if (true)" not "if(true)"
        space_in_paren: false,                    // No spaces inside parentheses
        space_after_anon_function: false,         // "function()" not "function ()"
        break_chained_methods: true,              // Break long method chains
        wrap_line_length: 80,                     // Wrap long lines
        end_with_newline: true,                   // Add trailing newline
        preserve_newlines: true,                  // Keep intentional blank lines
        keep_array_indentation: false,            // Let beautifier handle arrays
        keep_function_indentation: false,         // Let beautifier handle functions
        unescape_strings: false,                  // Keep \xNN notation as-is
        e4x: false                                // Don't parse E4X (rarely used)
      });
      project.javascript = formattedCode;
      dispatchChanges(editorManager.jsEditor, formattedCode);
      break;
    default:
      formattedCode = 'Unknown editor panel.';
  }

  await removeBeautifyLibraries();
}
window.closeOpenDialog = () => {
   document.querySelector('dialog[open] footer button:last-child').click();
}

// iframe functions
window.generateId = () => {
  let id = '';
  while (!/^[a-zA-Z]/.test(id)) {
    id = Math.random().toString(36).substr(2, 9);
  }
  return id;
}
window.resizeCanvas = size => {
  data.selectedSize = size;
  getIFrameClientSize();
}
window.rotateCanvas = () => {
  const iframe = document.getElementById('previewElm').firstElementChild;
  if (iframe.style.width === '100%') return false;

  // Extract current width and height
  let width = parseInt(iframe.style.width);
  let height = parseInt(iframe.style.height);

  // Swap width and height
  [width, height] = [height, width];

  // Calculate the new transform scale
  const viewportWidth = previewElm.clientWidth;
  const viewportHeight = previewElm.clientHeight;
  const scale = Math.min(viewportWidth / width, viewportHeight / height);

  // Apply the new styles
  iframe.style.width = `${width}px`;
  iframe.style.height = `${height}px`;
  iframe.style.transform = `scale(${scale})`;
  iframe.style.marginTop = `-${height / 2}px`;
  iframe.style.marginLeft = `-${width / 2}px`;
  data.selectedSize = width+'x'+height;
  getIFrameClientSize();
}
let fadeTimeout;
window.getIFrameClientSize = () => {
  const iframe = document.getElementById('iframe');
  data.iframeSize = `${iframe.offsetWidth}px x ${iframe.offsetHeight}px`;
  const element = document.getElementById('iframeClientSize');

  if (element.classList.contains('hidden')) {
    // Clear existing timeout to prevent multiple calls
    if (fadeTimeout) clearTimeout(fadeTimeout);

    // Remove hidden and add opacity-100 to show the element
    element.classList.remove('hidden', 'opacity-0');
    element.classList.add('opacity-100');

    // Set a timeout to handle fade-out
    fadeTimeout = setTimeout(() => {
      element.classList.remove('opacity-100');
      element.classList.add('opacity-0');

      // Add hidden class after fade-out
      setTimeout(() => {
        element.classList.add('hidden');
      }, 300); // Match the duration of the opacity transition
    }, 2000); // Show duration
  }
}
window.compileCode = async detect => {
  try {
    if (detect === 'html') {
      switch (project.html_pre_processor) {
        case 'html':
          return project.html;
        case 'markdown':
          return marked.parse(project.html);
        case 'jade':
          return jade.render(project.html, { pretty: true });
        case 'pug':
          const appScript = document.getElementById('appScript');
          if (appScript.hasAttribute('type') && appScript.getAttribute('type') === 'module') {
            // import pug from 'libraries/preprocessors/pug.js';
            console.error('Cannot import pug as script is a module!');
            return false;
          }

          const pug = require("pug");
          return pug.compile(project.html)({name: this.name });
        default:
          return project.html;
      }
    }

    if (detect === 'css') {
      switch (project.css_pre_processor) {
        case 'css':
          return project.css;
        case 'stylus':
          return stylus.render(project.css);
        case 'less':
          return new Promise((resolve, reject) => {
            less.render(project.css, (err, output) => err ? reject(err) : resolve(output.css));
          });
        case 'sass':
          return new Promise((resolve, reject) => {
            Sass.compile(project.css, result => result.status === 0 ? resolve(result.text) : reject(new Error(result.message)));
          });
        default:
          return project.css;
      }
    }

    if (detect === 'javascript') {
      switch (project.javascript_pre_processor) {
        case 'javascript':
          return project.javascript;
        case 'babel':
          if (typeof Babel === 'undefined') {
            await loadScript("libraries/preprocessors/babel.min.js");
          }
          return Babel.transform(project.javascript, { presets: ['env', 'react'] }).code;
        case 'typescript':
          return ts.transpileModule(project.javascript, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
        default:
          return project.javascript;
      }
    }
  } catch (error) {
    console.error('Error compiling code:', error);
  }
}

// save functions
window.handleLogoChange = async event => {
  const file = event.target.files[0];
  if (!file) return; // If no file selected, return

  try {
    // Convert file to base64 string
    const base64String = await fileToBase64(file);
    // if (base64String.length > 3000) {
    //   Modal.render({
    //     title: "🚨 Large Logo Detected 🚨",
    //     content: `
    //       <div class="p-4 text-center">
    //         Your logo is quite large (${base64String.length} characters)! <br/>
    //         Consider reducing its size for faster sharing. 🖼️
    //       </div>
    //     `
    //   });
    // } else {
    //   project.logo = base64String;
    // }

    project.logo = base64String;
  } catch (error) {
    console.error('Error converting image to base64:', error);
  }
}
window.fileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
window.newProject = async (name) => {
  history.replaceState(null, '', window.location.pathname + window.location.search);
  
  // Define quick templates (modern UI templates)
  const quickTemplates = [
    'blank'
  ];
  
  // Map display names to actual filenames
  const fileMap = {
    // Basic templates
    'blank': 'blank'
  };
  
  let templatePath;
  
  // Determine which folder to look in
  if (quickTemplates.includes(name)) {
    const fileName = fileMap[name] || name;
    templatePath = `json/quick/${fileName}.json`;
  } else {
    templatePath = `json/frameworks/${name}.json`;
  }
  
  try {
    let template;
    
    // Try cache first, otherwise fetch
    if (window.frameworkCache && window.frameworkCache[name]) {
      template = window.frameworkCache[name];
    } else {
      const response = await fetch(templatePath);
      if (!response.ok) throw new Error(`Template ${name} not found at ${templatePath}`);
      template = await response.json();
    }
    
    // Apply template data to project
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const capitalizedTitle = capitalizeFirstLetter(template.displayName || name);
    
    // Set preprocessors
    setPreprocessor('html', template.html_pre_processor || 'html');
    setPreprocessor('css', template.css_pre_processor || 'css');
    setPreprocessor('javascript', template.javascript_pre_processor || 'javascript');
    
    // Update project properties
    project.name = template.name || `${capitalizedTitle} Template`;
    project.version = template.version || '0.0.1';
    project.title = template.title || `A Cool ${capitalizedTitle} App`;
    project.description = template.description || `A modern ${capitalizedTitle} application!`;
    project.author = template.author || "kodeWeave";
    project.url = template.url || "https://michaelsboost.com/";
    project.module = template.module !== undefined ? template.module : true;
    project.preview = true;
    project.pwa = template.pwa || false;
    project.meta = template.meta || "";
    project.libraries = template.libraries || [];
    project.html = template.html || "";
    project.css = template.css || "";
    project.javascript = template.javascript || "";
    project.logo = template.logo || project.logo;
    
    // PWA colors if they exist in template
    if (template.pwaThemeColorLight) project.pwaThemeColorLight = template.pwaThemeColorLight;
    if (template.pwaThemeColorDark) project.pwaThemeColorDark = template.pwaThemeColorDark;
    if (template.pwaBgColorLight) project.pwaBgColorLight = template.pwaBgColorLight;
    if (template.pwaBgColorDark) project.pwaBgColorDark = template.pwaBgColorDark;
    
    // Special handling for Angular (disable module)
    if (name === 'angular') project.module = false;
    
    // Update editors
    data.activeNav = "HTML";
    if (window.editorManager) {
      dispatchChanges(editorManager.htmlEditor, project.html);
      dispatchChanges(editorManager.cssEditor, project.css);
      dispatchChanges(editorManager.jsEditor, project.javascript);
    }
    
    // Close modal and render preview
    data.demos = false;
    renderPreview(true);
    
    // Show success message
    console.log(`✅ Loaded ${quickTemplates.includes(name) ? 'quick template' : 'framework'}: ${name}`);
    
  } catch (error) {
    console.error('Failed to load template:', error);
    // Fallback to empty project if JSON fails to load
    Modal.render({
      title: "Error Loading Template",
      content: `<div class="text-center p-4">
        <p class="text-red-400 mb-2">Failed to load "${name}" template</p>
        <p class="text-sm text-slate-400">Could not find template at: ${templatePath}</p>
        <p class="text-xs text-slate-500 mt-2">Make sure the JSON file exists in the correct folder.</p>
      </div>`,
      CloseLabel: "OK"
    });
    
    // Start with empty project as fallback
    project.html = `<div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">Start Coding!</h1>
      <p class="text-xl mb-4">Your ${name} project is ready</p>
    </div>`;
    project.css = "";
    project.javascript = "";
    project.libraries = [];
    
    data.activeNav = "HTML";
    if (window.editorManager) {
      dispatchChanges(editorManager.htmlEditor, project.html);
      dispatchChanges(editorManager.cssEditor, project.css);
      dispatchChanges(editorManager.jsEditor, project.javascript);
    }
    data.demos = false;
    renderPreview(true);
  }
};
window.importJSON = obj => {
  if (obj === null) return;
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  const clone = { ...obj };
  project.autorun = false;
  project.name = obj.name;
  project.version = obj.version;
  project.title = obj.title;
  project.description = obj.description;
  project.author = obj.author;
  project.url = obj.url;
  project.logo = obj.logo;
  project.console = obj.console;
  project.dark = obj.dark;
  project.module = obj.module;
  project.pwa = obj.pwa;
  project.activePanel = obj.activePanel;
  project.preview = obj.preview;
  project.columns = obj.columns;
  project.columnsRight = obj.columnsRight;
  
  // Check and set previewDark state
  if (typeof project.previewDark === 'undefined') {
    project.previewDark = obj.previewDark !== undefined ? obj.previewDark : obj.dark;
  } else {
    project.previewDark = obj.previewDark;
  }
  
  project.meta = obj.meta;
  project.libraries = obj.libraries;
  project.html = obj.html;
  project.css = obj.css;
  project.javascript = obj.javascript;

  // Dispatch changes to editors
  if (window.editorManager) {
    dispatchChanges(editorManager.htmlEditor, project.html);
    dispatchChanges(editorManager.cssEditor, project.css);
    dispatchChanges(editorManager.jsEditor, project.javascript);
  }

  setPreprocessor('html', obj.html_pre_processor);
  setPreprocessor('css', obj.css_pre_processor);
  setPreprocessor('javascript', obj.javascript_pre_processor);
  project.autorun = clone.autorun;
}
window.htmlToProjectJSON_text = htmlRaw => {
  // --- utils ---
  const kw_matchAll = (re, s) => { const out = []; let m; while ((m = re.exec(s)) !== null) out.push(m); return out; };

  // Replace <template> blocks with placeholders, run a transform, then restore them.
  function kw_withTemplatesPreserved(html, transformFn) {
    const templates = [];
    const placeholder = (i) => `__KW_TEMPLATE_PLACEHOLDER_${i}__`;
    const tplRe = /<template\b[^>]*>[\s\S]*?<\/template>/gi;
    let i = 0;
    const withoutTpl = html.replace(tplRe, (m) => { templates.push(m); return placeholder(i++); });
    let transformed = transformFn(withoutTpl);
    templates.forEach((tpl, idx) => { transformed = transformed.replace(placeholder(idx), tpl); });
    return transformed;
  }

  const html = String(htmlRaw || '');

  // <title>
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').trim();

  // metas
  const metaNameRe = /<meta[^>]*\bname=["']?([^"'>\s]+)["']?[^>]*\bcontent=["']?([^"'>]*)["']?[^>]*>/gi;
  const metaPropRe = /<meta[^>]*\bproperty=["']?([^"'>\s]+)["']?[^>]*\bcontent=["']?([^"'>]*)["']?[^>]*>/gi;
  let description = '', author = '', ogUrl = '';
  for (const m of kw_matchAll(metaNameRe, html)) {
    const n = (m[1] || '').toLowerCase(), c = m[2] || '';
    if (!description && n === 'description') description = c;
    if (!author && n === 'author') author = c;
  }
  for (const m of kw_matchAll(metaPropRe, html)) {
    const p = (m[1] || '').toLowerCase(), c = m[2] || '';
    if (!ogUrl && p === 'og:url') ogUrl = c;
  }

  // external libs
  const libraries = [];
  const extraHeadBits = []; // collect defer scripts here

  // <link ... href=...>
  const linkRe = /<link[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  for (const m of kw_matchAll(linkRe, html)) {
    const tag = m[0], href = m[1]; if (!href) continue;
    const rel = (tag.match(/\brel=["']?([^"'>\s]+)["']?/i)?.[1] || '').toLowerCase();
    const isCSS  = rel === 'stylesheet' || /\.css(\?|$)/i.test(href);
    const isFont = /fonts\.googleapis\.com|fonts\.gstatic\.com|\/font(s)?\b/i.test(href);
    if (isCSS || isFont) libraries.push(href);
  }

  // <script src=...>  → if defer present, keep full tag in meta; else push src to libraries
  const scriptSrcTagRe = /<script[^>]*\bsrc=["']([^"']+)["'][^>]*>(?:<\/script>)?/gi;
  for (const m of kw_matchAll(scriptSrcTagRe, html)) {
    const fullTag = m[0];
    const src = m[1];
    if (!src) continue;
    const hasDefer = /\bdefer\b/i.test(fullTag);
    if (hasDefer) {
      extraHeadBits.push(fullTag); // stays in meta
    } else {
      libraries.push(src);         // normal external dep
    }
  }

  // inline CSS (all <style>)
  const css = kw_matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, html)
    .map(m => m[1] || '')
    .join('\n\n/* --- */\n\n');

  // inline JS (ignore <template> content)
  const htmlNoTpl = html.replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, '');
  const inlineScriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  const inlineTypeRe   = /<script(?![^>]*\bsrc=)[^>]*\btype=["']?([^"'>\s]+)["']?[^>]*>/i;
  const jsParts = [];
  let module = false;
  for (const m of kw_matchAll(inlineScriptRe, htmlNoTpl)) {
    const openTag = m[0].slice(0, m[0].indexOf('>') + 1);
    const body = m[1] || '';
    const t = openTag.match(inlineTypeRe)?.[1]?.toLowerCase() || '';
    if (t === 'module') module = true;
    if (body.trim()) jsParts.push(body);
  }
  const javascript = jsParts.join('\n\n// ---\n\n');

  // body HTML (keep templates, but remove <script> and <style> outside templates)
  const bodyHTMLRaw = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]) ?? html;
  const bodyHTML = kw_withTemplatesPreserved(bodyHTMLRaw, (s) =>
    s
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  );

  // ----- META FILTERING -----
  // Gather candidate head bits (importmaps, base, preload, etc.)
  const headCandidates = kw_matchAll(
    /<(?:base|link(?=[^>]*\brel=)|meta(?=\s+(name|http-equiv|property)=)|script(?=[^>]*\btype=["']importmap["']))[^>]*>(?:<\/script>)?/gi,
    html
  ).map(m => m[0]);

  // Exclude tags KodeWeave injects by default
  const isDefaultMeta = (tag) =>
    /<meta[^>]*\bname=["']viewport["']/i.test(tag) ||
    /<meta[^>]*\bname=["']description["']/i.test(tag) ||
    /<meta[^>]*\bname=["']author["']/i.test(tag) ||
    /<meta[^>]*\bname=["']theme-color["']/i.test(tag);

  const isDefaultIcon = (tag) =>
    /<link[^>]*\brel=["'](?:icon|shortcut icon|apple-touch-icon)["']/i.test(tag) ||
    /<link[^>]*\brel=["']manifest["']/i.test(tag);

  // Allow-list: keep only things KW doesn't manage automatically
  const isImportMap = (tag) => /<script[^>]*\btype=["']importmap["']/i.test(tag);
  const isBase      = (tag) => /^<base\b/i.test(tag);
  const isPreload   = (tag) => /<link[^>]*\brel=["']preload["']/i.test(tag);

  const filteredHeadBits = headCandidates.filter(tag =>
    !isDefaultMeta(tag) &&
    !isDefaultIcon(tag) &&
    (isImportMap(tag) || isBase(tag) || isPreload(tag))
  );

  // merge + dedupe meta bits (only filtered + defer scripts)
  const metaCombined = Array.from(new Set([...filteredHeadBits, ...extraHeadBits])).join('\n');

  // theme detection (inverted internal flag)
  const theme = (html.match(/<html[^>]*\bdata-theme=["']?([^"'>\s]+)["']?[^>]*>/i)?.[1] || 'light').toLowerCase();
  const previewDark = theme === 'dark';
  const dark = !previewDark; // internal inversion

  return {
    name: title || 'Imported Project',
    version: "0.0.1",
    title: title || '',
    description: description || '',
    author: author || '',
    url: ogUrl || '',
    meta: metaCombined,
    libraries: Array.from(new Set(libraries)),
    html_pre_processor: "html",
    css_pre_processor: "css",
    javascript_pre_processor: "javascript",
    html: bodyHTML,
    css: css || '',
    javascript: javascript || '',
    logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogICB2aWV3Qm94PSIwIDAgNTEyIDUxMiIKICAgd2lkdGg9IjUxMiIKICAgaGVpZ2h0PSI1MTIiPgogICA8ZGVmcz4KICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMTAwJSIgeTE9IjUwJSIgeDI9IjAlIiB5Mj0iNTAlIj4KICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmQ1ZDkyIi8+CiAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmMDAwMCIvPgogICAgICA8L2xpbmVhckdyYWRpZW50PgogICA8L2RlZnM+CiAgIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNTEgNTguN2MtNC42LjEtMjAuOCAyLTI5LjMgMy43LTI4LjMgNS40LTY2LjkgMjIuNi03MyAzMi43LTEuOSAzLjEtMiA3LjItMiAxNjAuOCAwIDE1Mi4zLjEgMTU3LjcgMS45IDE2MC43IDUuMiA4LjUgMzYuNyAyMy43IDYzLjUgMzAuNSA5LjggMi41IDM0LjMgNi4zIDM4LjUgNiAyLS4yIDItMSAyLjMtNzMuMS4xLTQwLjguNy03My4zIDEuMi03My44IDEuNC0xLjQgNy4zIDEuOSAxMC40IDUuNyAxLjUgMS44IDEzLjggMjAuNyAyNy40IDQxLjggNTEuNCA4MCA1MC41IDc4LjUgNTMuMyA3OS4yIDMuMy44IDEyLjYtMy44IDI3LjYtMTMuOCAxNC4yLTkuNSAyMy45LTE3LjggMzQuOC0zMCAxMS4zLTEyLjYgMTQuOC0xNy40IDE0LjgtMjAuMyAwLTEuMi0xNS0yNC41LTMzLjQtNTItMTguNC0yNy40LTM0LjEtNTEuMi0zNS01Mi45LS45LTEuNy0xLjUtNC4xLTEuNS01LjQgMC0xLjMgMTIuNS0yMi4zIDI4LjUtNDcuOSA0NC41LTcxLjEgNDEuOS02Ni4zIDM4LjgtNzIuOC0yLjYtNS40LTE1LjQtMTkuNy0yNi4xLTI5LjEtMTEuNS0xMC4xLTM1LjEtMjYtMzkuOS0yNi45LTIuOS0uNi00LS4zLTUuOSAxLjctMS4zIDEuMy0yMC40IDMyLjMtNDIuMyA2OC45LTIyIDM2LjYtNDEuMSA2OC00Mi40IDY5LjgtMi42IDMuNi02LjcgNi4xLTguNyA1LjQtMS0uNC0xLjMtMTguMi0xLjMtODQuNCAwLTQ5LjUtLjQtODQuMi0uOS04NC42LS4xLS4xLS41LS4xLTEuMi0uMXoiLz4KPC9zdmc+",
    console: false,
    dark: true,
    previewDark: dark || '',
    module: module || '',
    autorun: true,
    pwa: false,
    preview: true,
    activePanel: 'html',
    columns: false,
    columnsRight: true
  };
}
window.importProject = () => {
  Modal.render({
    title: "Are you sure you want to load a new project?",
    content: `<div class="p-4 text-center">All current data will be lost.</div>`,
    onConfirm: function() {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,.html,text/html,application/json'; // ✅ only json or html

      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) { console.error('No file selected.'); return; }

        const name = (file.name || '').toLowerCase();
        const isJSON = name.endsWith('.json');
        const isHTML = name.endsWith('.html') || file.type === 'text/html';

        // Hard gate: only .json or .html
        if (!isJSON && !isHTML) {
          console.error('Unsupported file type. Please select a .json or .html file.');
          input.remove();
          return;
        }

        const reader = new FileReader();
        reader.onload = evt => {
          try {
            const raw = String(evt.target.result || '');

            let obj;
            if (isJSON) {
              obj = JSON.parse(raw);
            } else {
              // HTML path (text-only parsing)
              obj = htmlToProjectJSON_text(raw);
            }

            data.activeNav = null;
            importJSON(obj);
            renderPreview(true);
          } catch (e) {
            console.error('Error importing project:', e);
          } finally {
            input.remove();
          }
        };

        reader.readAsText(file);
      });

      input.click();
    }
  });
}
window.getFileNameAndType = url => {
  // Extract the file name with extension from the URL
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  
  // Extract the file extension
  const fileExtension = fileName.split('.').pop().toLowerCase();
  
  // Map file extensions to MIME types
  const mimeTypes = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogv': 'video/ogg'
  };
  
  // Get the MIME type based on the file extension
  const fileType = mimeTypes[fileExtension] || 'application/octet-stream';
  
  return {
    fileName,
    fileType
  };
}
window.fetchResources = obj => {
  try {
    const doc = new DOMParser().parseFromString(obj.html, 'text/html');
    const body = doc.body;

    const imageResources = [];
    const audioResources = [];
    const vectorResources = [];
    const videoResources = [];

    let fileCounter = 1;

    // Helper function to check if a string is Base64
    function isBase64(str) {
      return str.startsWith('data:') && str.includes('base64,');
    }

    // Helper function to extract file type from Base64 string
    function getBase64FileType(str) {
      const mimeMatch = str.match(/^data:(.*);base64,/);
      if (mimeMatch) {
        const mimeType = mimeMatch[1];
        return mimeTypeToExtension(mimeType);
      }
      return 'unknown';
    }

    // Helper function to map MIME types to file extensions
    function mimeTypeToExtension(mimeType) {
      const typeMap = {
        // Images
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/svg+xml': 'svg',
        'image/webp': 'webp',
        'image/tiff': 'tiff',
        'image/bmp': 'bmp',
        'image/x-icon': 'ico',

        // Audio
        'audio/mpeg': 'mp3',
        'audio/wav': 'wav',
        'audio/ogg': 'ogg',
        'audio/aac': 'aac',
        'audio/webm': 'webm',
        'audio/flac': 'flac',

        // Video
        'video/mp4': 'mp4',
        'video/webm': 'webm',
        'video/ogg': 'ogv',
        'video/avi': 'avi',
        'video/mpeg': 'mpg',
        'video/quicktime': 'mov',
        'video/x-msvideo': 'avi',
        'video/x-matroska': 'mkv',

        // Fallback for unknown types
        'unknown': 'bin'
      };
      return typeMap[mimeType] || 'bin';
    }

    // Helper function to extract file name from URL
    function getFileName(url) {
      return url.substring(url.lastIndexOf('/') + 1);
    }

    // Generate a file name for Base64 resources
    function getBase64FileName() {
      return `file-${fileCounter++}`;
    }

    // Extract image URLs and filenames
    body.querySelectorAll('img').forEach(img => {
      if (img.hasAttribute('src')) {
        const src = img.getAttribute('src');

        if (isBase64(src)) {
          const fileType = getBase64FileType(src);
          const fileName = `${getBase64FileName()}.${fileType}`;
          imageResources.push({ url: src, fileName: fileName });
          img.src = `imgs/${fileName}`;
        } else {
          const fileName = getFileName(src);
          imageResources.push({ url: src, fileName: fileName });
          img.src = `imgs/${getFileNameAndType(src).fileName}`;
        }
      }

      if (img.hasAttribute('srcset')) {
        img.srcset.split(',').forEach(srcset => {
          const url = srcset.trim().split(' ')[0];
          if (isBase64(url)) {
            const fileType = getBase64FileType(src);
            const fileName = `${getBase64FileName()}.${fileType}`;
            imageResources.push({ url: url, fileName: fileName });
            img.src = `imgs/${fileName}`;
          } else {
            const fileName = getFileName(url);
            imageResources.push({ url: url, fileName: fileName });
            img.src = `imgs/${getFileNameAndType(img.getAttribute('src')).fileName}`;
          }
        });
      }
    });
    body.querySelectorAll('image').forEach(img => {
      if (img.hasAttribute('href')) {
        const src = img.getAttribute('href');

        if (isBase64(src)) {
          const fileType = getBase64FileType(src);
          const fileName = `${getBase64FileName()}.${fileType}`;
          imageResources.push({ url: src, fileName: fileName });
          img.setAttribute('href', `imgs/${fileName}`);
        } else {
          const fileName = getFileName(src);
          imageResources.push({ url: src, fileName: fileName });
          img.setAttribute('href', `imgs/${getFileNameAndType(src).fileName}`);
        }
      }

      if (img.hasAttribute('srcset')) {
        img.srcset.split(',').forEach(srcset => {
          const url = srcset.trim().split(' ')[0];
          if (isBase64(url)) {
            const fileType = getBase64FileType(src);
            const fileName = `${getBase64FileName()}.${fileType}`;
            imageResources.push({ url: url, fileName: fileName });
            img.src = `imgs/${fileName}`;
          } else {
            const fileName = getFileName(url);
            imageResources.push({ url: url, fileName: fileName });
            img.src = `imgs/${getFileNameAndType(img.getAttribute('src')).fileName}`;
          }
        });
      }
    });

    // Extract audio URLs and filenames
    body.querySelectorAll('audio').forEach(audio => {
      audio.querySelectorAll('source').forEach(source => {
        if (source.hasAttribute('src')) {
          const src = source.getAttribute('src');

          if (isBase64(src)) {
            const fileType = getBase64FileType(src);
            const fileName = `${getBase64FileName()}.${fileType}`;
            audioResources.push({ url: src, fileName: fileName });
            source.src = `audios/${fileName}`;
          } else {
            const fileName = getFileName(src);
            audioResources.push({ url: src, fileName: fileName });
            source.src = `audios/${getFileNameAndType(src).fileName}`;
          }
        }
      });
    });

    // Extract vectors
    body.querySelectorAll('svg').forEach(svg => {
      vectorResources.push({ content: svg.outerHTML, fileName: `vector-${vectorResources.length + 1}.svg` });
    });

    // Extract video URLs and filenames
    body.querySelectorAll('video').forEach(video => {
      video.querySelectorAll('source').forEach(source => {
        if (source.hasAttribute('src')) {
          const src = source.getAttribute('src');

          if (isBase64(src)) {
            const fileType = getBase64FileType(src);
            const fileName = `${getBase64FileName()}.${fileType}`;
            videoResources.push({ url: src, fileName: fileName });
            source.src = `vids/${fileName}`;
          } else {
            const fileName = getFileName(src);
            videoResources.push({ url: src, fileName: fileName });
            source.src = `vids/${getFileNameAndType(src).fileName}`;
          }
        }
      });
    });

    // Function to extract and process background images from CSS
    function extractBackgroundImageUrls(css) {
      const urls = [];
      const regex = /background-image\s*:\s*url\(([^)]+)\)/g;
      let match;
      while ((match = regex.exec(css)) !== null) {
        let url = match[1].replace(/['"]/g, ""); // Remove quotes around URLs
        if (isBase64(url)) {
          const fileType = getBase64FileType(url);
          const fileName = `${getBase64FileName()}.${fileType}`;
          imageResources.push({ url: url, fileName: fileName });
        } else {
          const fileName = getFileName(url);
          imageResources.push({ url: url, fileName: fileName });
        }
        urls.push(url);
      }
      return urls;
    }

    // Extract background-image URLs from project CSS
    const projectCss = obj.css || '';
    extractBackgroundImageUrls(projectCss);

    return {
      html: doc.body.innerHTML,
      imageResources,
      audioResources,
      vectorResources,
      videoResources
    };
  } catch (error) {
    console.error('Error fetching resources:', error);
    return null; // Or handle the error in an appropriate way
  }
}
window.getBase64Media = async mediaUrl => {
  const response = await fetch(mediaUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
window.downloadJSON = async () => {
  try {
    await loadScript("libraries/jszip/FileSaver.min.js");
    let blob = new Blob([JSON.stringify(project, null, 2)], {type: "application/json"});
    saveAs(blob, `${project.name.split(' ').join('').toLowerCase()}-kodeWeave.json`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up scripts after use
    removeScript("libraries/jszip/FileSaver.min.js");
  }
}
window.downloadHTML = async (opts = {}) => {
  const {
    returnHTML = false // 🔥 If true, return the HTML string instead of downloading
  } = opts;

  try {
    // Ensure FileSaver is available only if we plan to download
    if (!returnHTML) {
      await loadScripts(["libraries/jszip/FileSaver.min.js"]);
    }

    // Helpers
    const safe = {
      title: (project.title || project.name || 'kodeWeave Project'),
      description: (project.description || ''),
      author: (project.author || ''),
      theme: project.previewDark ? '#13171f' : '#d9e0e5'
    };
    const escapeInlineJS = (s='') => String(s).replace(/<\/script>/gi, '<\\/script>');
    const escapeInlineCSS = (s='') => String(s).replace(/<\/style>/gi, '<\\/style>');

    // Classify libraries
    let scriptTags = '', cssTags = '', gFonts = '';
    (project.libraries || []).forEach(lib => {
      if (typeof lib !== 'string') return;
      if (lib.endsWith('.js'))      scriptTags += `<script src="${lib}"></script>\n    `;
      else if (lib.endsWith('.css')) cssTags  += `<link href="${lib}" rel="stylesheet">\n    `;
      else                          gFonts    += `<link href="${lib}" rel="stylesheet">\n    `;
    });

    // Inline JS
    let singleScript = '';
    if (project.javascript) {
      if (project.javascript_pre_processor === 'babel') {
        singleScript =
`<script src="https://michaelsboost.github.io/kodeWeave/go/libraries/babel.min.js"></script>
<script type="text/babel"${project.module ? ' data-type="module"' : ''}>
${escapeInlineJS(project.javascript)}
</script>`;
      } else if (project.javascript_pre_processor === 'typescript') {
        singleScript =
`<script type="text/typescript">
${escapeInlineJS(project.javascript)}
</script>
<script type="text/javascript" src="https://michaelsboost.github.io/typescript-compile/js/typescript.min.js"></script>
<script type="text/javascript" src="https://michaelsboost.github.io/typescript-compile/js/typescript.compile.min.js"></script>`;
      } else {
        singleScript =
`<script${project.module ? ' type="module"' : ''}>
${escapeInlineJS(project.javascript)}
</script>`;
      }
    }

    // 🔥 Compose the final HTML string
    const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="${project.previewDark ? 'dark' : 'light'}">
  <head>
    <title>${safe.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${safe.description}">
    <meta name="author" content="${safe.author}">
    <meta name="theme-color" content="${safe.theme}">
    <link rel="shortcut icon" type="image/x-icon" href="${project.logo}">
    ${gFonts}${cssTags}${project.meta ? project.meta + '\n    ' : ''}
    ${project.css ? `<style>${escapeInlineCSS(project.css)}</style>` : ''}
  </head>
  <body>
${project.html || ''}

    ${scriptTags}${singleScript}
  </body>
</html>`;

    // 🔄 If returnHTML is true, don't download — just return the string
    if (returnHTML) {
      return htmlContent;
    }

    // Otherwise, proceed with download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const safeName = (project.name || 'project').toLowerCase().replace(/\s+/g, '');
    saveAs(blob, `${safeName}.html`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (!returnHTML) {
      removeScripts(['libraries/jszip/FileSaver.min.js']);
    }
  }
}
window.getFile = async (url, callback = null) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const fileContent = await response.text();
    if (callback && typeof callback === 'function') {
      callback(null, fileContent); // Call the callback with the file content
    } else {
      return fileContent; // Return the file content
    }
  } catch (error) {
    console.warn("Request error:", error);
    if (callback && typeof callback === 'function') {
      callback(error, null); // Call the callback with the error
    } else {
      throw error; // Re-throw to handle in caller
    }
  }
}
window.downloadProject = async () => {
  try {
    await loadScripts([
      "libraries/jszip/jszip.min.js",
      "libraries/jszip/FileSaver.min.js"
    ]);

    // Extract srcset URLs
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    const idoc = iframe.contentDocument || iframe.contentWindow.document;
    const { html, imageResources, audioResources, vectorResources, videoResources } = fetchResources(project);

    const zip = new JSZip();

    // Project file
    zip.file(`${project.name.split(' ').join('').toLowerCase()}-kodeWeave.json`, JSON.stringify(project, null, 2));

    function checkCSSDependencies() {
      if (!twFound && project.css.trim() !== '') {
        return `,
    "postcss": "^8.4.6",
    "autoprefixer": "^10.4.2",
    "cssnano": "^5.0.12"`;
      }
      return '';
    }
    
    function checkJSDependencies() {
      if (project.javascript_pre_processor === 'babel') {
        return `,
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "rollup-plugin-babel": "^4.4.0"`;
      }
      if (project.javascript_pre_processor === 'typescript') {
        return `,
    "rollup-plugin-typescript2": "^0.31.1",
    "typescript": "^4.4.3"`;
      }
      return '';
    }

    let rollupInput = ``;
    
    // Rollup Configuration
    let rollupPlugins = `import { terser } from 'rollup-plugin-terser';
`;
    
    if (project.javascript_pre_processor === 'javascript') {
      rollupInput = `src/script.js`;
    }

    if (project.javascript_pre_processor === 'babel') {
      rollupPlugins += `import babel from 'rollup-plugin-babel';
`;
      rollupInput = `src/script.jsx`;
    }
    
    if (project.javascript_pre_processor === 'typescript') {
      rollupPlugins += `import typescript from 'rollup-plugin-typescript2';
`;
      rollupInput = `src/script.ts`;
    }
    
    let rollupStr = `${rollupPlugins}
export default {
  input: '${rollupInput}', // entry point to your Javascript
  output: {
    file: 'dist/script.js',
    format: ${project.module ? "'es'" : "'iife'"}, // Immediately Invoked Function Expression, suitable for <script> tags
    name: '${project.name.toLowerCase().split(' ').join('')}'
  },
  plugins: [
    ${project.javascript_pre_processor === 'typescript' ? 'typescript(),' : ''}
    ${project.javascript_pre_processor === 'babel' ? `babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-react"]
    }),` : ''}
    terser() // minifies the JavaScript
  ]
};`;
    zip.file("rollup.config.js", rollupStr);
    
    // Babel Configuration
    if (project.javascript_pre_processor === 'babel') {
      let babelStr = `{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}`;
      zip.file("babel.config.json", babelStr);
    }
    
    // TypeScript Configuration
    if (project.javascript_pre_processor === 'typescript') {
      let tsconfig = `{
  "compilerOptions": {
    "target": "ES5",
    "module": "ESNext",
    "moduleResolution": "Node",
    "jsx": "react",
    "allowJs": true,
    "checkJs": false,
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"]
}`;
      zip.file("tsconfig.json", tsconfig);
    }

    let licenseStr = `The MIT License (MIT)
Copyright (c) ${new Date().getFullYear()} ${project.author}

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
    zip.file("LICENSE.md", licenseStr);

    let READMEStr = `# ${project.name}

A Weave created on [kodeWeave](https://michaelsboost.com/kodeWeave/go)

${project.description}`;
    zip.file("README.md", READMEStr);

    // Always include the original logo
    if (project.logo) {
      try {
        let base64Logo = '';
    
        if (project.logo.startsWith('data:')) {
          // If logo is already a data URL, extract base64 part
          base64Logo = project.logo; // Get the base64 part
        } else {
          // Otherwise fetch and convert to base64
          base64Logo = await getBase64Media(project.logo);
        }
    
        // Determine file extension based on MIME type
        let logoType;
        if (project.logo.startsWith('data:image/png')) {
          logoType = 'png';
        } else if (project.logo.startsWith('data:image/jpeg')) {
          logoType = 'jpeg';
        } else if (project.logo.startsWith('data:image/svg+xml')) {
          logoType = 'svg';
        } else {
          console.error('Unsupported logo MIME type:', project.logo);
          return; // Exit or handle error appropriately
        }
    
        const logoFileName = `logo.${logoType}`;
        zip.folder('imgs').file(logoFileName, base64Logo.split(",")[1], { base64: true });
    
        // Add icons to manifest.json based on image sizes
        const sizes = ['192x192', '256x256', '384x384', '512x512'];
        const icons = sizes.map(size => ({
          "src": `./imgs/logo-${size}.png`,
          "sizes": size,
          "type": "image/png",
          "purpose": "any"
        }));

        // Helper function to create resized images
        const createResizedImage = (size) => {
          return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            canvas.width = parseInt(size.split('x')[0]);
            canvas.height = parseInt(size.split('x')[1]);
            const ctx = canvas.getContext('2d');
    
            const img = new Image();
            img.src = base64Logo;
            img.onload = function() {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const base64Image = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
              zip.folder('imgs').file(`logo-${size}.png`, base64Image, { base64: true });
              resolve();
            };
            img.onerror = reject;
    
            // Clean up canvas element
            canvas.remove();
          });
        };
    
        // Create all resized images
        await Promise.all(sizes.map(createResizedImage));
    
        zip.file(`manifest.json`, JSON.stringify({
          "theme_color": project.previewDark ? project.pwaThemeColorDark : project.pwaThemeColorLight,
          "background_color": project.previewDark ? project.pwaThemeColorDark : project.pwaThemeColorLight,
          "display": "standalone",
          "start_url": "./index.html",
          "lang": "en-US",
          "name": project.name,
          "short_name": project.name,
          "description": project.description,
          "icons": icons
        }, null, 2));
    
      } catch (error) {
        console.error('Error adding logo to ZIP:', error);
        return; // Exit method or handle error as needed
      }
    }

    function minifyCSS(cssCode) {
      // Remove comments
      let minified = cssCode.replace(/\/\*[\s\S]*?\*\//g, '');
      // Remove whitespace and newlines
      minified = minified.replace(/\s{2,}/g, ' ').replace(/\n/g, '');
      // Remove spaces around selectors, properties, and values
      minified = minified.replace(/\s*([{}:;])\s*/g, '$1');
      // Remove the last semicolon before the closing brace
      minified = minified.replace(/;}/g, '}');
      return minified;
    }

    let cssContent = '';
    let cssBuildItems = [];
    let cssBuildItemsString = '';
    let TailwindNoReset = null;
    const promises = project.libraries.map(async library => {
      try {
        const data = await getFile(library);
        const parts = library.split("/");
        const name = parts[parts.length - 1];

        // Check if the library is one of the Tailwind files to ignore
        if (name === "tailwind-mod-noreset.min.js") {
          TailwindNoReset = true;
        }
        
        // Assuming libraries have .css extensions for simplicity
        if (name.endsWith('.css')) {
          cssContent += data + '\n';
          cssBuildItems.push(name);
          cssBuildItemsString += `libraries/${name} `;
          zip.folder('libraries').file(name, data);
        }
        
        // Assuming libraries have .js extensions for simplicity
        if (name.endsWith('.js')) {
          zip.folder('libraries').file(name, data);
        }
      } catch (error) {
        console.warn(`Failed to fetch library ${library}:`, error);
      }
    });
    await Promise.all(promises);

    // Checks css for html
    let cssBuild = '';
    let css4html = '';
    let twFound = '';
    let tailwindDirectives = '';
    let tailwindStyles = '';
    let cssImport = '';

    // Find out if user is using tailwind
    if (idoc.getElementById('vyhibnq91')) {
      twFound = true;
      tailwindDirectives = `
  ${!TailwindNoReset ? `@tailwind base;` : ''}
@tailwind components;
@tailwind utilities;
`

      if (twFound) {
        cssBuildItems.map(async library => {
          cssImport += `@import '../libraries/${library}';
`;
        });
        cssImport += tailwindDirectives;
      } else {
        cssImport = cssContent;
      }
      tailwindStyles = idoc.getElementById('vyhibnq91').textContent;

      // Tailwind config
      if (twFound) {
        let twJS = "";
        if (project.javascript_pre_processor === "javascript") {
          twJS = `
      './src/**/*.js',`;
        }
        if (project.javascript_pre_processor === "babel") {
          twJS = `
      './src/**/*.jsx',`;
        }
        if (project.javascript_pre_processor === "typescript") {
          twJS = `
      './src/**/*.ts',`;
        }
        let configCode = `module.exports = {
    content: [
      './src/**/*.html',${twJS}
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };`
        zip.file("tailwind.config.js", configCode);
      }
    }

    // Add style.css & tailwind build
    if (cssContent && project.css) {
      css4html = `<link rel="stylesheet" href="dist/bundle.css">
    `;
      cssBuild = `"build:css": "postcss src/bundle.css -o dist/bundle.css",`;
      zip.file("src/style.css", project.css + cssImport);
      zip.file("src/bundle.css", cssImport + project.css);
      zip.file('dist/bundle.css', minifyCSS(cssContent + tailwindStyles + project.css));
    }
    if (cssContent && !project.css) {
      css4html = `<link rel="stylesheet" href="dist/bundle.css">
    `;
      cssBuild = `"build:css": "postcss src/bundle.css -o dist/bundle.css",`;
      zip.file("src/bundle.css", cssImport);
      zip.file('dist/bundle.css', minifyCSS(cssContent + tailwindStyles));
    }
    if (!cssContent && project.css) {
      css4html = `<link rel="stylesheet" href="dist/bundle.css">
    `;
      cssBuild = `"build:css": "postcss src/bundle.css -o dist/bundle.css",`;
      zip.file("src/bundle.css", project.css + cssImport);
      zip.file("src/style.css", project.css);
      zip.file('dist/bundle.css', minifyCSS(tailwindStyles + project.css));
    }

    // Nodejs Package JSON
    let npmBuildConditions = '';
    if (cssBuild && !project.javascript) {
      npmBuildConditions = `"build": "npm run build:css",`
    }
    if (!cssBuild && project.javascript) {
      npmBuildConditions = `"build": "npm run build:js",`
    }
    if (cssBuild && project.javascript) {
      npmBuildConditions = `"build": "npm run build:css && npm run build:js",`
    }

    let nodeStr = `{
  "name": "${project.name.toLowerCase().split(' ').join('')}",
  "version": "${project.version}",
  "type": "module",
  "scripts": {
    ${cssBuild}
    ${project.javascript ? '"build:js": "rollup -c",' : ''}
    ${npmBuildConditions}
    "serve": "http-server -c-1 -p 8081"
  },
  "devDependencies": {
    ${cssBuild || twFound ? `"autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "postcss-import": "^16.1.0",
    "cssnano": "^7.0.2",${twFound ? `
    "tailwindcss": "^3.4.4",` : ''}` : ''}
    "rollup": "^2.79.1",
    "rollup-plugin-terser": "^7.0.2",
    "terser": "^5.10.0",
    "http-server": "^14.1.1"${checkCSSDependencies()}${checkJSDependencies()}
  }
}`;
    zip.file("package.json", nodeStr);

    // PostCSS config
    if (cssBuild) {
      zip.file("postcss.config.cjs", `module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),${twFound ? `
    require('tailwindcss'),` : ''}
    require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true }, // Remove all comments
      }],
    }),
  ],
};`);
    }

    // if pwa is enabled
    let swinit = '';
    if (project.pwa) {
  swinit = `
    <script src="https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"></script>
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(reg => {
          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing;
            newSW.addEventListener('statechange', () => {
              if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                // Notify the user and reload if they confirm
                if (confirm('A new version is available. Reload now?')) {
                  window.location.reload();
                }
              }
            });
          });
        });

        // Ensure immediate activation of a new service worker
        navigator.serviceWorker.ready.then(registration => {
          registration.active.postMessage({ type: 'SKIP_WAITING' });
        });
      }
    </script>`;
  const swjs = `// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;
const { clientsClaim, skipWaiting } = workbox.core;

// Define cache name dynamically based on the project name
const cacheName = '${project.name.split(' ').join('')}-cache';

// Force update when a new service worker is available
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Immediately apply new service worker
});

// Clear old caches when activating a new service worker
self.addEventListener('activate', async (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== cacheName && name !== cacheName + '-modules')
          .map(name => caches.delete(name))
      );
    })
  );
  clientsClaim(); // Take control of all open clients
});

// NEW: Cache ES module imports from CDNs (like unpkg.com)
registerRoute(
  ({ url, request }) => {
    // Cache module requests from common CDNs
    return url.hostname === 'unpkg.com' || 
           url.hostname === 'cdn.skypack.dev' ||
           url.hostname === 'esm.sh' ||
           url.hostname === 'jspm.dev' ||
           // Also cache any .js or .mjs files that might be modules
           request.destination === 'script' && url.pathname.match(/\\.(js|mjs)$/);
  },
  new StaleWhileRevalidate({
    cacheName: cacheName + '-modules',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100, // Store more modules
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      }),
    ],
  })
);

// Use Network First for primary scripts, styles, and documents
registerRoute(
  ({ request }) => {
    return request.destination === 'document' || 
           request.destination === 'style' ||
           // For local scripts (not from CDN)
           (request.destination === 'script' && new URL(request.url).hostname === location.hostname);
  },
  new NetworkFirst({
    cacheName: cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache images, fonts, audio, and video for performance
registerRoute(
  ({ request }) =>
    request.destination === 'image' || request.destination === 'font' ||
    request.destination === 'audio' || request.destination === 'video',
  new CacheFirst({
    cacheName: cacheName,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Limit stored assets
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Also cache the workbox library itself
registerRoute(
  ({ url }) => url.href.includes('storage.googleapis.com/workbox-cdn'),
  new CacheFirst({
    cacheName: cacheName + '-workbox',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 5,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// Listen for messages to skip waiting and apply new updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});`
  zip.file("sw.js", swjs);
    }

    // Iterate over each library
    let scriptTags = '';
    let scriptTagsTWChecked = '';
    let cssTags = '';
    let gFonts = '';
    project.libraries.forEach(library => {
      if (library.endsWith('.js')) {
        scriptTags += `<script src="${library}"></script>\n    `;
        if (twFound && (library.startsWith('https://michaelsboost.com/TailwindCSSMod/') || library.startsWith('http://michaelsboost.com/TailwindCSSMod/') || library.startsWith('//michaelsboost.com/TailwindCSSMod/'))) return;
        scriptTagsTWChecked += `<script src="${library}"></script>\n    `;
      } else if (library.endsWith('.css')) {
        cssTags += `<link href="${library}" rel="stylesheet">\n    `;
      } else {
        // Assuming it's a Google font
        gFonts += `<link href="${library}" rel="stylesheet">\n    `;
      }
    });

    async function minifyJS(jsCode) {
      // detect if terser exists
      if (!document.querySelector("script[src='libraries/terser/bundle.min.js']")) {
        await loadScript("libraries/terser/bundle.min.js");
      }
      return Terser.minify(jsCode);
    }

    let minifiedJS = await minifyJS(await compileCode('javascript'));
    minifiedJS = minifiedJS.code;

    // Add script.js
    zip.file(`${rollupInput}`, project.javascript);
    if (project.javascript_pre_processor === 'javascript') zip.file('dist/script.js', project.javascript);
    if (project.javascript_pre_processor === 'babel') zip.file('dist/script.js', minifiedJS);
    if (project.javascript_pre_processor === 'typescript') zip.file('dist/script.js', minifiedJS);

    // script tag for test.html
    let placeScript = `<script src="dist/script.js"${project.module ? ' type="module"' : ''}></script>`;
    if (project.javascript_pre_processor === 'babel') {
      const library = "libraries/preprocessors/babel.min.js";
      const data = await getFile(library);
      const parts = library.split("/");
      const name = parts[parts.length - 1];

      zip.folder('libraries').file(name, data);

      placeScript = `<script src="libraries/babel.min.js"></script>
    <script type="text/babel" src="src/script.jsx"${project.module ? ' data-type="module"' : ''}></script>`;
    }
    if (project.javascript_pre_processor === 'typescript') {
      let library = "libraries/preprocessors/typescript.min.js";
      let data = await getFile(library);
      let parts = library.split("/");
      let name = parts[parts.length - 1];
      zip.folder('libraries').file(name, data);

      library = "libraries/preprocessors/typescript.compile.min.js";
      data = await getFile(library);
      parts = library.split("/");
      name = parts[parts.length - 1];
      zip.folder('libraries').file(name, data);

      placeScript = `<script type="text/typescript" src="src/script.ts"></script>
    <script type="text/javascript" src="libraries/typescript.min.js"></script>
    <script type="text/javascript" src="libraries/typescript.compile.min.js"></script>`;
    }

    // Add index.html
    const indexHtmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="${project.previewDark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, interactive-widget=resizes-content">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${project.title}">
    <meta name="theme-color" content="${project.previewDark ? '#13171f' : '#d9e0e5'}">
    <meta name="apple-mobile-web-app-title" content="${project.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="./index.html">
    <meta name="msapplication-navbutton-color" content="${project.previewDark ? '#13171f' : '#d9e0e5'}">
    <meta property="og:url" content="${project.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <link rel="shortcut icon" type="image/x-icon" href="imgs/logo.svg">
    <link rel="icon" type="image/svg+xml" href="imgs/logo.svg" />
    <link rel="apple-touch-icon" href="imgs/logo.svg">
    ${gFonts}${cssTags ? cssTags : ''}${project.meta ? `${project.meta}\n  ` : ''}
    ${twFound ? 
    cssContent ? `<link rel="stylesheet" href="src/bundle.css">` : `<link rel="stylesheet" href="src/style.css">` 
    : `<link rel="stylesheet" href="src/bundle.css">`}
  </head>
  <body>

${html}

${scriptTags ? scriptTags : ''}
${project.javascript ? placeScript : ''}
  </body>
</html>`;
    const indexHtmlContentCompiled = `<!DOCTYPE html>
<html lang="en" data-theme="${project.previewDark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, interactive-widget=resizes-content">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${project.title}">
    <meta name="theme-color" content="${project.previewDark ? '#13171f' : '#d9e0e5'}">
    <meta name="apple-mobile-web-app-title" content="${project.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="./index.html">
    <meta name="msapplication-navbutton-color" content="${project.previewDark ? '#13171f' : '#d9e0e5'}">
    <meta property="og:url" content="${project.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" type="image/x-icon" href="imgs/logo.svg">
    <link rel="icon" type="image/svg+xml" href="imgs/logo.svg" />
    <link rel="apple-touch-icon" href="imgs/logo.svg">
    ${gFonts}${css4html}${project.meta ? `${project.meta}\n  ` : ''}${scriptTags ? twFound ? scriptTagsTWChecked : scriptTags : ''}
  </head>
  <body>
    
${html}

    ${project.javascript ? `<script src="dist/script.js"${project.module ? ' type="module"' : ''}></script>` : ''}${(project.pwa ? swinit : '')}
  </body>
</html>`;
    const singleHTML = await downloadHTML({ returnHTML: true });
    zip.file('single-indexed.html', singleHTML);
    zip.file('test.html', indexHtmlContent);
    zip.file('index.html', indexHtmlContentCompiled);
    if (project.html_pre_processor === 'html') zip.file('src/source.html', project.html);
    if (project.html_pre_processor === 'markdown') zip.file('src/source.md', project.html);
    if (project.html_pre_processor === 'pug') zip.file('src/source.pug', project.html);
    if (project.html_pre_processor === 'jade') zip.file('src/source.jade', project.html);

    // Save audio files to ZIP
    if (audioResources.length > 0) {
      const audioFolder = zip.folder('audios');
      try {
        for (const { url, fileName } of audioResources) {
          const base64Audio = await getBase64Media(url);
          audioFolder.file(fileName, base64Audio, { base64: true });
        }
      } catch (error) {
        console.error('Error adding audio to ZIP:', error);
        return;
      }
    }

    // Save image files to ZIP
    if (imageResources.length > 0) {
      try {
        for (const { url, fileName } of imageResources) {
          const base64Image = await getBase64Media(url);
          zip.folder('imgs').file(fileName, base64Image, { base64: true });
        }
      } catch (error) {
        console.error('Error adding images to ZIP:', error);
        return;
      }
    }

    // Save SVG files to ZIP
    if (vectorResources.length > 0) {
      const svgFolder = zip.folder('svgs');
      try {
        for (const { content, fileName } of vectorResources) {
          svgFolder.file(fileName, content);
        }
      } catch (error) {
        console.error('Error adding SVGs to ZIP:', error);
        return;
      }
    }

    // Save video files to ZIP
    if (videoResources.length > 0) {
      const videoFolder = zip.folder('vids');
      try {
        for (const { url, fileName } of videoResources) {
          const base64Video = await getBase64Media(url);
          videoFolder.file(fileName, base64Video, { base64: true });
        }
      } catch (error) {
        console.error('Error adding videos to ZIP:', error);
        return;
      }
    }

    // Generate the ZIP file
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${project.name.toLowerCase().split(' ').join('')}.zip`);
    
    // Clear all arrays after saving
    imageResources.length = audioResources.length = vectorResources.length = videoResources.length = 0;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up scripts after use
    const scriptsToRemove = [
      'libraries/jszip/FileSaver.min.js',
      'libraries/jszip/jszip.min.js'
    ];

    removeScripts(scriptsToRemove);
  }
}
window.shareToCodepen = async () => {
  try {
    if (navigator.onLine) {
      let jsPreprocessor = null;
      if (project.javascript_pre_processor === 'javascript') {
        jsPreprocessor = "none";
      } else {
        jsPreprocessor = project.javascript_pre_processor;
      }

      const shareProject = {
        title: project.title,
        description: project.description,
        head: project.meta,
        html: project.html,
        html_pre_processor: project.html_pre_processor === "html" ? "none" : "",
        css: project.css,
        css_pre_processor: project.css_pre_processor === "css" ? "none" : "",
        css_external: project.libraries.filter(lib => lib.endsWith('.css')).join(';'),
        css_starter: "neither",
        css_prefix: "neither",
        js_module: project.module,
        js: `document.documentElement.setAttribute('data-theme', '${project.previewDark ? 'dark' : 'light'}');
        
${project.javascript}`,
        js_pre_processor: jsPreprocessor,
        js_external: project.libraries.filter(lib => lib.endsWith('.js')).join(';'),
        editors: '111',
        layout: 'left'
      };

      // Stringify the JSON object and escape quotes
      const JSONstring = JSON.stringify(shareProject)
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
      document.querySelector('form').remove();
    } else {
      Modal.render({
        title: "Unable to share!",
        content: `<div class="p-4 text-center">No internet connection!</div>`
      });
    }
  } catch (error) {
    console.error('Error sharing project:', error);
  }
}
window.shareKodeWeave = () => {
  const shareData = {
    title: 'kodeWeave',
    text: 'The browser is your new development environment. No limits. No excuses. Just code.',
    url: 'https://michaelsboost.com/kodeWeave/'
  };
  
  if (navigator.share) {
    navigator.share(shareData).catch((error) => {
      console.log('Error sharing:', error);
      // Fallback to copy to clipboard
      copyToClipboard(shareData.url);
      alert('Link copied to clipboard!');
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    copyToClipboard(shareData.url);
    alert('Link copied to clipboard!');
  }
};
window.shareProject = () => {
  const jsonData = JSON.stringify(project);
  const compressedData = LZString.compressToEncodedURIComponent(jsonData);

  // Check if the compressed data length exceeds 2000 characters
  if (compressedData.length > 50000) {
    Modal.render({
      title: "🚨 Project Too Large! 🚨",
      content: `
        <div class="p-4 text-center">
          🛑 <strong>Oops!</strong> Your project is too big to be shared in the URL.<br/><br/>
          ✂️ Try trimming it down to keep it short and sweet! 🌟<br/><br/>
          🧑‍💻 Happy Coding! 🚀
        </div>
      `
    });        
    return;
  }
  
  window.location.hash = compressedData;
  
  Modal.render({
    title: "✅ Project Shared! ✅",
    content: `<div class="p-4 text-center">📦 Copy this URL to share your project!</div>`,
    onConfirm: () => {
      copyToClipboard(window.location.href);
    }
  });
}

if (window.location.hash) {
  const hash = window.location.hash.substring(1);

  try {
    const compressedData = decodeURIComponent(hash);
    const jsonData = LZString.decompressFromEncodedURIComponent(compressedData);
    project = JSON.parse(jsonData);
  } catch (error) {
    console.error('Failed to load project from URL:', error);
  }
}

window.screenshot = async () => {
  const iframe = document.getElementById('iframe');
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  try {
    await loadScripts([
      "libraries/html2canvas/html2canvas.min.js",
      "libraries/jszip/FileSaver.min.js"
    ]);
    
    html2canvas(iframeDocument.documentElement).then(canvas => {
      const context = canvas.getContext('2d');
      const videoElements = iframeDocument.getElementsByTagName('video');

      // Draw video elements
      Array.from(videoElements).forEach(video => {
        const { currentTime, paused, volume } = video;

        // Set volume to 0 for the screenshot process
        video.volume = 0;

        // Draw the video frame
        if (!paused) video.pause();
        context.drawImage(video, video.offsetLeft, video.offsetTop, video.clientWidth, video.clientHeight);

        // Restore the original volume and playback state
        video.volume = volume;
        video.currentTime = currentTime;
        if (!paused) video.play();
      });

      // Convert canvas to Blob
      canvas.toBlob(blob => {
        // Save the Blob using FileSaver.js
        saveAs(blob, 'screenshot.png');
      }, 'image/png');
    }).catch(error => {
      console.error('Error taking screenshot:', error);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up scripts after use
    removeScript("../libraries/html2canvas/html2canvas.min.js");
    removeScript("../libraries/jszip/FileSaver.min.js");
  }
}
window.createBlobURL = (content, type) => {
  const blob = new Blob([content], { type });
  return URL.createObjectURL(blob);
}
window.renderPreview = async (forceRun = false) => {
  const iframe = document.getElementById('iframe');
  if (!iframe) return;

  let scriptTags = '';
  let cssTags = '';
  project.libraries.forEach(library => {
    if (library.endsWith('.js')) {
      scriptTags += `<script src="${library}"></script>\n    `;
    } else if (library.endsWith('.css')) {
      cssTags += `<link rel="stylesheet" href="${library}">\n          `;
    } else {
      cssTags += `<link href="${library}" rel="stylesheet">\n          `;
    }
  });

  const javascriptCode = await compileCode('javascript');
  const cssCode = await compileCode('css');
  const consoleCSS = `[data-zwj=zwjkonsole] {
  display: ${project.console ? 'flex' : 'none'};
}

`

  // Add error handling for the fetch
  let domconsoleContent = '';
  try {
    const response = await fetch('libraries/domconsole/dom-console-mod.min.js');
    if (response.ok) {
      domconsoleContent = await response.text();
    } else {
      console.warn('Failed to fetch domconsole library, proceeding without it');
    }
  } catch (error) {
    console.warn('Network error fetching domconsole, proceeding without it:', error);
  }

  let jsLink = createBlobURL(javascriptCode, 'application/javascript');
  const iframeSrc = `<html data-theme="${project.previewDark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    ${project.meta ? project.meta : ''}
    ${cssTags}
    <style id="cuxjju3ew" type="text/${project.css_pre_processor === 'css' || project.css_pre_processor === 'stylus' || project.css_pre_processor === 'sass' ? 'css' : project.css_pre_processor}">
      ${consoleCSS + cssCode}
    </style>
    <script type="module">
      ${domconsoleContent}
    </script>
  </head>
  <body>
    ${await compileCode('html')}
    ${scriptTags ? scriptTags : ''}
    ${project.css_pre_processor === 'less' ? '<script src="libraries/preprocessors/less.js"></script>' : ''}
    <script type="${project.module ? 'module' : 'text/javascript'}" src="${jsLink}"></script>
  </body>
</html>`;
  const newHtmlBlobURL = createBlobURL(iframeSrc, 'text/html');

  if (forceRun) {
    iframe.setAttribute('src', newHtmlBlobURL);
  }
}

// Diffing algorithm to update ui when changes occur
window.diffNodes = (oldNode, newNode) => {
  if (!oldNode || !newNode) {
    return;
  }

  // Check for data-ignore attribute
  if (oldNode.hasAttribute && oldNode.hasAttribute('data-ignore') || 
      newNode.hasAttribute && newNode.hasAttribute('data-ignore')) {
    return;
  }

  // Check if nodes are iframe elements
  if (oldNode.nodeName === 'IFRAME' && newNode.nodeName === 'IFRAME') {
    const acceptableIframeAttributes = ['id', 'title', 'class', 'style', 'sandbox'];
    // Compare acceptable attributes only
    acceptableIframeAttributes.forEach(attr => {
      if (oldNode.getAttribute(attr) !== newNode.getAttribute(attr)) {
        oldNode.setAttribute(attr, newNode.getAttribute(attr));
      }
    });

    const oldSrcdoc = oldNode.getAttribute('srcdoc');
    const newSrcdoc = newNode.getAttribute('srcdoc');
    // Ignore srcdoc attribute if it hasn't changed
    if (oldSrcdoc === newSrcdoc) return;
    return;
  }

  // If nodes are different types, replace the old node
  if (oldNode.nodeName !== newNode.nodeName) {
    oldNode.replaceWith(newNode.cloneNode(true));
    // console.log('Different node names:', oldNode, newNode);
    return;
  }

  // Diff the attributes of the nodes
  if (oldNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
    const oldAttributes = Array.from(oldNode.attributes);
    const newAttributes = Array.from(newNode.attributes);

    // Remove old attributes not present in the new node
    oldAttributes.forEach(attr => {
      if (!newNode.hasAttribute(attr.name)) {
        oldNode.removeAttribute(attr.name);
      }
    });

    // Add or update attributes from the new node
    newAttributes.forEach(attr => {
      if (oldNode.getAttribute(attr.name) !== attr.value) {
        oldNode.setAttribute(attr.name, attr.value);
      }
    });
  }

  const oldChildren = Array.from(oldNode.childNodes);
  const newChildren = Array.from(newNode.childNodes);

  // Update or remove existing child nodes
  oldChildren.forEach((oldChild, index) => {
    const newChild = newChildren[index];
    if (!newChild) {
      oldNode.removeChild(oldChild);
      return;
    }
    // Special handling for <title> elements
    if (oldNode.tagName === 'TITLE' || oldNode.tagName === 'STYLE' && oldNode.textContent !== newNode.textContent) {
      oldNode.textContent = newNode.textContent;
    } else if (oldChild.nodeType === Node.TEXT_NODE && oldChild.nodeValue !== newChild.nodeValue) {
      oldChild.nodeValue = newChild.nodeValue;
    }
    diffNodes(oldChild, newChild);
  });

  // Add new child nodes
  newChildren.slice(oldChildren.length).forEach(newChild => {
    oldNode.appendChild(newChild.cloneNode(true));
  });
}

// Once dom has loaded init functions
document.addEventListener('DOMContentLoaded', function() {
  window.onload = () => {
    window.galleryCache = null;
    App.render('#app');
    if (window.initEditors) initEditors();
    getIFrameClientSize();

    if (localStorage.getItem('kodeWeave')) {
      importJSON(JSON.parse(localStorage.getItem('kodeWeave')));
      renderPreview(true);
    }
  }
  window.onresize = () => getIFrameClientSize();
  preloadFrameworkTemplates();
  const filterSelect = document.getElementById('mediaTypeFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      if (d.lastMediaQuery && d.lastMediaQuery.length >= 2) {
        performMediaSearch(d.lastMediaQuery);
      }
    });
  }
});