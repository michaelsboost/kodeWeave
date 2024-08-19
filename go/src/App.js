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

// Keep project and data in the global scope
let app = {
  name: 'kodeWeave',
  author: {
    name: 'Michael Schwartz',
    href: 'https://michaelsboost.com/',
    src: 'imgs/author.jpg'
  },
  version: '1.2.2',
  url: 'https://github.com/michaelsboost/kodeWeave/',
  license: 'https://github.com/michaelsboost/kodeWeave/blob/main/LICENSE'
}
let p = {
  name: "App name",
  version: "0.0.1",
  title: "An attractive title",
  description: "The most attractive description ever!",
  author: "kodeWeave",
  url: "https://michaelsboost.com/",
  meta: "",
  libraries: [],
  html_pre_processor: "html",
  css_pre_processor: "css",
  javascript_pre_processor: "javascript",
  html: ``,
  css: ``,
  javascript: ``,
  logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHZpZXdCb3g9IjAgMCA1MTEuOTk5OTkgNTExLjk5OTk5IgogICBoZWlnaHQ9IjUxMiIKICAgd2lkdGg9IjUxMiIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNDE5MCI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNDE5NiI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczQxOTQiPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0Mjc2Ij4KICAgICAgPHN0b3AKICAgICAgICAgaWQ9InN0b3A0Mjc4IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZDVkOTI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wNDI4MCIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICB5Mj0iMjU3LjMxMjUiCiAgICAgICB4Mj0iMC4xMzQwNDE2NSIKICAgICAgIHkxPSIyNTcuMzEyNSIKICAgICAgIHgxPSI1MTEuNzE4NzUiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0MjgyIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50NDI3NiIgLz4KICA8L2RlZnM+CiAgPGcKICAgICBpZD0iZzQyODQiPgogICAgPGNpcmNsZQogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ0MjgyKTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTo3MiwgNzI7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgaWQ9InBhdGg0MjcwIgogICAgICAgY3g9IjI1NiIKICAgICAgIGN5PSIyNTYiCiAgICAgICByPSIyNTYiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6NzIsIDcyO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMjUxLjA2MDY4LDU4LjY3ODI3MiBjIC00LjU2MDMyLDAuMDcwMzUgLTIwLjc2MDYxLDIuMDQxOTQ1IC0yOS4yOTc5MiwzLjY1NTk4NCAtMjguMzQzOTEsNS4zNTg2MiAtNjYuODgwODEsMjIuNjE5ODE0IC03My4wMzY5OSwzMi43MTkwNjEgLTEuODk3NTUsMy4xMTI5MzUgLTEuOTQ2MTYsNy4xNDcwMTMgLTEuOTQ2MTYsMTYwLjgxNzAyMyAwLDE1Mi4yNTg4IDAuMDY3MSwxNTcuNzI0NjQgMS44OTk5OCwxNjAuNzMxMjEgNS4yMDU5OSw4LjUzOTg5IDM2LjcyMDAzLDIzLjcwOTM0IDYzLjQ1MTMzLDMwLjU0MTM0IDkuNzY1NzIsMi40OTU5MyAzNC4zMzUwOSw2LjM0NDggMzguNTA3NTQsNi4wMzE2OSAyLjAwMzg4LC0wLjE1MDM2IDIuMDMyMDMsLTAuOTc0NjkgMi4yODkyMSwtNzMuMDkzMjQgMC4xNDU1OCwtNDAuODM3NTkgMC42NTY0MywtNzMuMzM0MTQgMS4xNjEwOSwtNzMuODM4OTYgMS4zNzc1MSwtMS4zNzc5NSA3LjM0NzM5LDEuODg0NzMgMTAuMzU3NTIsNS42NjIxNSAxLjQ2MjAyLDEuODM0NjggMTMuNzk3NTUsMjAuNjU1MjggMjcuNDE3NzQsNDEuODE5NDMgNTEuNDQ0NTIsNzkuOTM4NDcgNTAuNDY1MTEsNzguNDc3OTggNTMuMzA0OTQsNzkuMTkwOTQgMy4zMjQ3OCwwLjgzNDc0IDEyLjU2NzA4LC0zLjc4OTQ3IDI3LjU3NjA2LC0xMy43ODU4MyAxNC4yNDMzOCwtOS40ODY0NiAyMy44ODU1LC0xNy43ODMxIDM0LjgxOTcyLC0yOS45NjcxNyAxMS4yOTUwMiwtMTIuNTg2MTUgMTQuODMwMzksLTE3LjQxNzg1IDE0LjgzMDM5LC0yMC4yNTMwOCAwLC0xLjIyMDA5IC0xNC45NzA2LC0yNC41NDAzMyAtMzMuNDAxMzMsLTUyLjAyODQ2IC0xOC4zNzA1NywtMjcuMzk4MzcgLTM0LjEwMTA3LC01MS4xNjg3NiAtMzQuOTU4MjgsLTUyLjgyNjk2IC0wLjg1NzIzLC0xLjY1ODIgLTEuNTU2OTMsLTQuMDczMzUgLTEuNTU2OTMsLTUuMzY1MTkgMCwtMS4zMjEyMyAxMi40ODk1OSwtMjIuMjk0ODcgMjguNTQ1ODQsLTQ3Ljk0MzUyIDQ0LjQ4MzE1LC03MS4wNTg1NiA0MS45MzgzMywtNjYuMjkxNzggMzguODMwODEsLTcyLjg0MjQ3IC0yLjU1NzU1LC01LjM5MTM2IC0xNS4zNjI2MiwtMTkuNjU4MDkgLTI2LjEzMTI5LC0yOS4xMTU4NyAtMTEuNDU0NTksLTEwLjA2MDE5MSAtMzUuMDY0MTMsLTI1Ljk1MDI3NiAtMzkuOTA2MTIsLTI2Ljg1ODkzNCAtMi45NDE1NCwtMC41NTIwMSAtMy45NzUxOSwtMC4yNDY3ODggLTUuOTE3NjYsMS43NDIyMDEgLTEuMjk1NjQsMS4zMjY2NDggLTIwLjM1MDEyLDMyLjM0ODMwMyAtNDIuMzQwNDgsNjguOTM1NzIzIC0yMS45OTAzNiwzNi41ODc0IC00MS4wNjUzOSw2Ny45OTE2NyAtNDIuMzg2NjUsNjkuNzg3MDIgLTIuNjE5NTQsMy41NTkzNyAtNi43MzI4MSw2LjA5MzA2IC04LjczNDYzLDUuMzc4MzggLTAuOTk5NDcsLTAuMzU2ODMgLTEuMjY2NjUsLTE4LjE3MDM1IC0xLjI2NjY1LC04NC40NDM5NCAwLC00OS41MTMxOTYgLTAuMzc4NjQsLTg0LjIxOTIyNiAtMC45MjM2LC04NC41NTYxMzggLTAuMTE5ODQsLTAuMDc0MSAtMC41MzYwMSwtMC4xMDI0NDYgLTEuMTg3NDgsLTAuMDkyMzggeiIKICAgICAgIGlkPSJwYXRoNDI2MCIgLz4KICA8L2c+Cjwvc3ZnPgo=",
  console: false,
  dark: true,
  module: true,
  autorun: true,
  pwa: false,
  preview: true,
  activePanel: 'html',
  columns: false,
  columnsRight: true
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
  demos: null
};
const icons = (function() {
  const SidebarIconCSS = "h-4 w-4";
  const navIconCSS = "h-3 w-3";
  const modalIconCSS = "h-4 w-4";
  const panelIconCSS = "h-3 w-3";
  const previewIconCSS = "h-3 -mt-1";

  return {
    logo: `<svg
      class="${SidebarIconCSS}" 
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 511.99999 511.99999"
      height="512"
      width="512"
      version="1.1"
      id="svg4190">
      <metadata
        id="metadata4196">
        <rdf:RDF>
          <cc:Work
            rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
              rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <defs
        id="defs4194">
        <linearGradient
          id="linearGradient4276">
          <stop
            id="stop4278"
            offset="0"
            style="stop-color:#fd5d92;stop-opacity:1" />
          <stop
            id="stop4280"
            offset="1"
            style="stop-color:#ff0000;stop-opacity:1" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          y2="257.3125"
          x2="0.13404165"
          y1="257.3125"
          x1="511.71875"
          id="linearGradient4282"
          xlink:href="#linearGradient4276" />
      </defs>
      <g
        id="g4284">
        <circle
          style="opacity:1;fill:url(#linearGradient4282);fill-opacity:1;stroke:none;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:72, 72;stroke-dashoffset:0;stroke-opacity:1"
          id="path4270"
          cx="256"
          cy="256"
          r="256" />
        <path
          style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:72, 72;stroke-dashoffset:0;stroke-opacity:1"
          d="m 251.06068,58.678272 c -4.56032,0.07035 -20.76061,2.041945 -29.29792,3.655984 -28.34391,5.35862 -66.88081,22.619814 -73.03699,32.719061 -1.89755,3.112935 -1.94616,7.147013 -1.94616,160.817023 0,152.2588 0.0671,157.72464 1.89998,160.73121 5.20599,8.53989 36.72003,23.70934 63.45133,30.54134 9.76572,2.49593 34.33509,6.3448 38.50754,6.03169 2.00388,-0.15036 2.03203,-0.97469 2.28921,-73.09324 0.14558,-40.83759 0.65643,-73.33414 1.16109,-73.83896 1.37751,-1.37795 7.34739,1.88473 10.35752,5.66215 1.46202,1.83468 13.79755,20.65528 27.41774,41.81943 51.44452,79.93847 50.46511,78.47798 53.30494,79.19094 3.32478,0.83474 12.56708,-3.78947 27.57606,-13.78583 14.24338,-9.48646 23.8855,-17.7831 34.81972,-29.96717 11.29502,-12.58615 14.83039,-17.41785 14.83039,-20.25308 0,-1.22009 -14.9706,-24.54033 -33.40133,-52.02846 -18.37057,-27.39837 -34.10107,-51.16876 -34.95828,-52.82696 -0.85723,-1.6582 -1.55693,-4.07335 -1.55693,-5.36519 0,-1.32123 12.48959,-22.29487 28.54584,-47.94352 44.48315,-71.05856 41.93833,-66.29178 38.83081,-72.84247 -2.55755,-5.39136 -15.36262,-19.65809 -26.13129,-29.11587 -11.45459,-10.060191 -35.06413,-25.950276 -39.90612,-26.858934 -2.94154,-0.55201 -3.97519,-0.246788 -5.91766,1.742201 -1.29564,1.326648 -20.35012,32.348303 -42.34048,68.935723 -21.99036,36.5874 -41.06539,67.99167 -42.38665,69.78702 -2.61954,3.55937 -6.73281,6.09306 -8.73463,5.37838 -0.99947,-0.35683 -1.26665,-18.17035 -1.26665,-84.44394 0,-49.513196 -0.37864,-84.219226 -0.9236,-84.556138 -0.11984,-0.0741 -0.53601,-0.102446 -1.18748,-0.09238 z"
          id="path4260" />
      </g>
    </svg>`,
    twitterfill: `<svg class="${SidebarIconCSS}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
    </svg>`,
    twitter: `<svg class="${SidebarIconCSS}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs
     id="defs2"><clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath7"><path
         style="display:none;fill:#2a34ff;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
         d="M 2.7194315,3.6106111 H 8.5920036 L 21.280954,20.389389 h -5.727371 z"
         id="path7" /><path
         id="lpe_path-effect7"
         style="fill:#2a34ff;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
         class="powerclip"
         d="M -2.8448815,-3.9722732 H 26.113213 V 27.972273 H -2.8448815 Z M 2.7194315,3.6106111 15.553583,20.389389 h 5.727371 L 8.5920036,3.6106111 Z" /></clipPath><clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath11"><rect
         style="fill:#ff2a2a;fill-opacity:1;stroke:none;stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
         id="rect11"
         width="21.586601"
         height="18.278778"
         x="1.2021173"
         y="2.8606112" /></clipPath></defs><g
     style="fill:none;stroke:currentColor;stroke-width:1.5"
     id="g2"
     transform="translate(-0.04613684)"><g
       id="g8"
       clip-path="url(#clipPath11)"><path
         d="M 2.7194315,3.6106111 H 8.5920036 L 21.280954,20.389389 h -5.727371 z"
         id="path2-8" /><path
         d="M 20.541589,1.5132639 19.650846,2.5619375 18.760104,3.6106111 17.869362,4.6592848 16.978619,5.7079584 16.087877,6.756632 15.197135,7.8053056 14.306392,8.8539793 13.41565,9.9026529 12.524908,10.951326 11.634165,12 10.743423,13.048674 9.852681,14.097347 8.961938,15.146021 8.071196,16.194695 7.1804539,17.243368 6.2897116,18.292042 5.3989693,19.340715 4.5082269,20.389389 3.6174846,21.438063 2.7267423,22.486736"
         id="path4"
         clip-path="url(#clipPath7)" /></g></g>
    </svg>`,
    heart: `<svg class="w-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>`,
    html: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512">
      <path 
        d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/>
      </svg>`,
    css: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
      <path 
        d="M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z"/>
      </svg>`,
    javascript: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
      <path 
        d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/>
      </svg>`,
    columns: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
    </svg>`,
    leftChev: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>`,
    rightChev: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>`,
    console: `<svg class="${SidebarIconCSS}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="m 12,18.340203 h 8.757019" />
      <path d="M 3.3316546,18.340203 10.159567,11.778315 3.2429806,5.6597968" />
    </svg>`,
    play: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>`,
    camera: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>`,
    cog: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>`,
    tidy: `<svg class="${previewIconCSS}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M566.6 54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192-34.7-34.7c-4.2-4.2-10-6.6-16-6.6c-12.5 0-22.6 10.1-22.6 22.6l0 29.1L364.3 320l29.1 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16l-34.7-34.7 192-192zM341.1 353.4L222.6 234.9c-42.7-3.7-85.2 11.7-115.8 42.3l-8 8C76.5 307.5 64 337.7 64 369.2c0 6.8 7.1 11.2 13.2 8.2l51.1-25.5c5-2.5 9.5 4.1 5.4 7.9L7.3 473.4C2.7 477.6 0 483.6 0 489.9C0 502.1 9.9 512 22.1 512l173.3 0c38.8 0 75.9-15.4 103.4-42.8c30.6-30.6 45.9-73.1 42.3-115.8z"/>
    </svg>`,
    rotate: `<svg class="${previewIconCSS}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
    </svg>`,
    times: `<svg class="${modalIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>`,
    file: `<svg class="h-3 -mt-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
    </svg>`,
    import: `<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z" />
    </svg>`,
    download: `<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
    </svg>`,
    codepen: `<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z" />
    </svg>`,
    trash: `<svg class="${panelIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>`,
    undo: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
    </svg>`,
    redo: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
    </svg>`,
    cut: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
    </svg>`,
    copy: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>`,
    paste: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
    </svg>`,
    indent: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>`,
    outdent: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
    </svg>`,
    search: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>`,
    goto: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>`,
    comment: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>`,
    fold: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>`,
    unfold: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>`,
    cursor: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
    </svg>`
  };
})();

// Reactive objects
const project = onChange(p, (property, oldValue, newValue) => {
  const iframe = document.getElementById('iframe');
  const doc = iframe.contentWindow.document;
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
      // diff nodes
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
        doc.getElementById('cuxjju3ew').textContent = consoleCSS;
      }
      // render right away
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
      if (string === "dark") {
        App.render('#app');
        document.documentElement.setAttribute('data-theme', project.dark ? 'dark' : 'light');
        doc.documentElement.setAttribute('data-theme', project.dark ? 'dark' : 'light');
        document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]').setAttribute('content', project.dark ? 'black-translucent' : 'default');
        document.querySelector('meta[name=theme-color]').setAttribute('content', project.dark ? '#13171f' : '#ffffff');
        document.querySelector('meta[name=msapplication-navbutton-color]').setAttribute('content', project.dark ? '#13171f' : '#ffffff');
      }
    }
  }
});
const data = onChange(d, (property, oldValue, newValue) => {
  // Only render if the actual value has changed
  if (oldValue !== newValue) App.render('#app');
});
window.project = project;
window.data = data;

// Components
function LeftMenubar() {
  const buttonSize = "w-full";

  return `<ul class="p-0 m-0">
  <li class="list-none m-0">
    <button
      aria-label="toggle menu"
      name="toggle menu"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="data.menuDialog = true"
    >
      ${icons.logo}
    </button>
  </li>
  <li class="list-none m-0">
    <a
      aria-label="toggle html"
      name="toggle html"
      class="${buttonSize} text-sm border-0 px-4 py-3 rounded-md bg-transparent"
      style="color: unset;"
      role="button"
      href="https://twitter.com/kodeweave_app"
    >
      ${icons.twitter}
    </a>
  </li>
  <li class="list-none m-0">
    <a
      href="https://michaelsboost.com/donate/"
      aria-label="Donation helps developer maintence"
      target="_blank"
      role="button"
      class="${buttonSize} text-sm border-0 px-4 py-3 rounded-md bg-transparent text-red-400"
    >
      ${icons.heart}
    </a>
  </li>
</ul>
<ul class="p-0 m-0">
  <li class="list-none m-0">
    <hr />
  </li>
  <li class="list-none m-0">
    <button
      aria-label="toggle html"
      name="toggle html"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${project.activePanel === 'html' ? 'text-blue-500' : ''}"
      ${project.activePanel === 'html' ? '' : 'style="color: unset;"'}
      onclick="setActiveEditor(htmlEditor); project.activePanel = project.activePanel === 'html' ? null : 'html';"
    >
      ${icons.html}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="toggle css"
      name="toggle css"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${project.activePanel === 'css' ? 'text-blue-500' : ''}"
      ${project.activePanel === 'css' ? '' : 'style="color: unset;"'}
      onclick="setActiveEditor(cssEditor); project.activePanel = project.activePanel === 'css' ? null : 'css';"
    >
      ${icons.css}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="toggle javascript"
      name="toggle javascript"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${project.activePanel === 'javascript' ? 'text-blue-500' : ''}"
      ${project.activePanel === 'javascript' ? '' : 'style="color: unset;"'}
      onclick="setActiveEditor(jsEditor); project.activePanel = project.activePanel === 'javascript' ? null : 'javascript';"
    >
      ${icons.javascript}
    </button>
  </li>
  <li class="list-none m-0">
    <hr />
  </li>
</ul>
<ul class="p-0 m-0">
  <li class="list-none m-0">
    <button
      aria-label="toggle preview"
      name="toggle preview"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${project.preview ? 'text-blue-500' : ''}"
      onclick="project.preview = !project.preview"
    >
      ${icons.play}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="toggle console"
      name="toggle console"
      class="${buttonSize}  text-sm border-0 px-0 py-3 rounded-md bg-transparent ${project.console ? 'text-green-500' : ''}"
      onclick="project.console = !project.console;"
      style="${project.dark ? '' : `${project.console ? '' : 'color: unset;'}`}"
    >
      ${icons.console}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="full page screenshot"
      name="full page screenshot"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="screenshot()"
    >
      ${icons.camera}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="settings button"
      name="settings"
      class="${buttonSize} text-sm border-0 px-4 py-3 rounded-md bg-transparent -mt-1"
      style="color: unset;"
      onclick="data.settings = !data.settings"
    >
      ${icons.cog}
    </button>
  </li>
</ul>`;
}
function PreviewMenu() {
  const buttonClass = 'border-0 bg-transparent text-sm';
  const selectClass = 'mx-0 my-2 w-auto rounded-md capitalize text-[.6rem]';
  const selectStyle = 'padding: 0.5rem;';

  const sizeOptions = {
    Phones: {
      '320x480': 'iPhone 3GS',
      '375x667': 'iPhone 6/7/8',
      '414x736': 'iPhone 6/7/8 Plus',
      '375x812': 'iPhone X/XS/11 Pro',
      '414x896': 'iPhone XR/XS Max/11/11 Pro Max',
      '360x640': 'Samsung Galaxy S5',
      '360x740': 'Samsung Galaxy S8+',
      '1440x3200': 'Samsung Galaxy S21 Ultra',
      '1080x2340': 'Google Pixel 5',
      '1080x2400': 'OnePlus 8 Pro',
      '1440x3200': 'Xiaomi Mi 11 Ultra',
      '1644x3840': 'Sony Xperia 1 III'
    },
    Tablets: {
      '2048x2732': 'iPad Pro 12.9" (3rd/4th Gen)',
      '2388x1668': 'iPad Pro 11" (1st/2nd/3rd Gen)',
      '2736x1824': 'Microsoft Surface Pro 7',
      '2800x1752': 'Samsung Galaxy Tab S7+',
      '2560x1600': 'Huawei MatePad Pro',
      '2000x1200': 'Lenovo Tab P11 Pro',
      '1920x1200': 'Amazon Fire HD 10',
      '1536x2048': 'iPad Air (3rd Gen)',
      '1620x2160': 'iPad Air (4th Gen)',
      '1620x2160': 'iPad 10.2" (8th Gen)',
      '1668x2224': 'iPad Pro 11" (2021)'
    },
    Desktops: {
      '3840x2160': '4K UHD (3840x2160)',
      '2560x1440': 'WQHD (2560x1440)',
      '1920x1080': 'Full HD (1920x1080)',
      '1366x768': 'Laptop (1366x768)',
      '3440x1440': 'UltraWide QHD (3440x1440)',
      '5120x2880': '5K Retina (5120x2880)',
      '1280x800': 'MacBook (1280x800)',
      '2560x1600': 'MacBook Pro (2560x1600)',
      '2880x1800': 'MacBook Pro Retina (2880x1800)'
    }
  };

  const previewSize = `<label for="selectedSize" aria-label="resize canvas" class="mx-2">
    <select id="selectedSize" onchange="resizeCanvas(this.value)" class="${selectClass}" style="${selectStyle}">
      <option value="none">Select Size</option>
      ${Object.keys(sizeOptions).map(group => `
        <optgroup label="${group}">
          ${Object.keys(sizeOptions[group]).map(option => `
            <option value="${option}">${sizeOptions[group][option]}</option>
          `).join('')}
        </optgroup>
      `).join('')}
    </select>
  </label>`;

  function canTidyShow() {
    if (!project.activePanel) return 'hidden'
    if (project.activePanel) {
      if (project.activePanel === 'html') {
        if (project.html_pre_processor !== 'html') {
          return 'hidden'
        }
      }
      if (project.activePanel === 'css') {
        if (project.css_pre_processor !== 'css') {
          return 'hidden'
        }
      }
      if (project.activePanel === 'javascript') {
        if (project.javascript_pre_processor !== 'javascript') {
          return 'hidden'
        }
      }
    }
  }

  return `<div class="flex justify-between items-center overflow-auto">
  ${previewSize}

  <ul class="m-0 p-0 flex whitespace-nowrap overflow-x-auto overflow-y-hidden">
    <li class="list-none">
      <button 
        aria-label="rotate canvas"
        name="rotate canvas" 
        class="${buttonClass} ${data.selectedSize === 'none' ? 'hidden' : ''}"
        style="color: unset;"
        onclick="rotateCanvas()">
        ${icons.rotate}
      </button>
    </li>
    <li class="list-none ${project.activePanel ? '' : 'hidden'}">
      <button
        aria-label="change view"
        name="change view"
        class="${buttonClass} hidden sm:inline-block"
        style="color: unset; ${project.columns ? '' : 'transform: rotate(90deg);'}"
        onclick="project.columns = !project.columns;"
      >
        ${icons.columns}
      </button>
    </li>
    <li class="list-none ${project.activePanel ? '' : 'hidden'}">
      <button
        aria-label="toggle columns left or right"
        name="toggle columns left or right"
        class="${buttonClass} hidden ${project.activePanel ? `${project.columns ? '' : 'sm:inline-block'}` : ''}"
        style="color: unset;"
        onclick="project.columnsRight = !project.columnsRight;"
      >
        ${project.columnsRight ? icons.leftChev : icons.rightChev}
      </button>
    </li>
    <li class="list-none">
      <button 
        aria-label="tidy code"
        name="tidy code"
        class="${buttonClass} ${canTidyShow()}"
        style="color: unset;"
        onclick="tidy()">
        ${icons.tidy}
      </button>
    </li>
    <li class="list-none">
      <button
        aria-label="run preview"
        name="run preview"
        class="${buttonClass} ${project.autorun ? 'hidden' : ''}"
        style="color: unset;"
        onclick="renderPreview(true)"
      >
        ${icons.play}
      </button>
    </li>
  </ul>
</div>`;
}
function Menu() {
  let menuDialog = `<ul class="py-4 px-0">
              <li class="list-none">
                <div class="items-center text-center">
                  <div>
                    <a 
                      aria-label="project homepage"
                      name="project homepage"
                      target="_blank" 
                      href="${app.url}">
                      <img 
                        alt="logo"
                        class="my-4 w-24 m-auto"
                        src="../imgs/logo.svg"
                        loading="lazy" />
                    </a>
                    <div class="text-2xl">
                      About ${app.name}
                    </div>
                    <div class="my-2 text-xs">
                      Version ${app.version}
                    </div>
                    <a 
                      target="_blank" 
                      class="text-sm underline mb-2 text-blue-500" 
                      href="${app.license}">
                        Open Source License
                    </a>
                  </div>
                </div>
              </li>
              <li class="p-0 list-none">
                <hr />
              </li>
              <li class="p-0 list-none -mt-2">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; data.demos = true;">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span>new project</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; importProject()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span>import project</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; downloadJSON()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                  </svg>
                  <span>download json</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; downloadProject()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>download zip</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; share()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                  </svg>
                  <span>share to codepen</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  aria-label="Empty storage saved from kodeWeave"
                  name="Empty storage saved from kodeWeave"
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="emptyStorage()">
                  <svg class="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M566.6 54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192-34.7-34.7c-4.2-4.2-10-6.6-16-6.6c-12.5 0-22.6 10.1-22.6 22.6l0 29.1L364.3 320l29.1 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16l-34.7-34.7 192-192zM341.1 353.4L222.6 234.9c-42.7-3.7-85.2 11.7-115.8 42.3l-8 8C76.5 307.5 64 337.7 64 369.2c0 6.8 7.1 11.2 13.2 8.2l51.1-25.5c5-2.5 9.5 4.1 5.4 7.9L7.3 473.4C2.7 477.6 0 483.6 0 489.9C0 502.1 9.9 512 22.1 512l173.3 0c38.8 0 75.9-15.4 103.4-42.8c30.6-30.6 45.9-73.1 42.3-115.8z"/>
                  </svg>
                  <span>empty storage</span>
                </button>
              </li>
            </ul>`;
  menuDialog = `<dialog ${data.menuDialog ? 'open' : ''}>
        <article class="rounded-md">
          <header class="flex justify-between items-center">
            <h1 class="text-lg font-thin m-0 capitalize">
              file menu
            </h1>
            <button 
              class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border-0" 
              style="color: unset;" 
              aria-label="Close"
              onclick="data.menuDialog = null">
              ${icons.times}
            </button>
          </header>
          <main class="font-thin">
            ${menuDialog}
          </main>
          <footer>
            <button 
              class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" 
              style="color: unset;" 
              aria-label="Close" 
              onclick="data.menuDialog = null">
              close
            </button>
          </footer>
        </article>
      </dialog>`;
    return menuDialog;
}
function Demos() {
  const buttonClass = "grid grid-rows-1 items-center bg-transparent border-0 focus-within:shadow-none";
  const buttonContentClass = "flex flex-col justify-between h-full";
  const imageContentClass = "grid h-full items-center";
  const textContentClass = "capitalize text-center mt-4";

  const frameworks = [
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
  ]

  let buttonHTML = "";
  for (const name of frameworks) {
    buttonHTML += `<button
          aria-label="new ${name} project"
          name="new ${name} project"
          class="${buttonClass}"
          style="color: unset;"
          onclick="newProject('${name}')">
          <div class="${buttonContentClass}">
            <div class="${imageContentClass}">
              <img loading="lazy" width="256" height="256" src="imgs/frameworks/${name}.svg" alt="${name}" />
            </div>
            <div class="${textContentClass}">
              ${name}
            </div>
          </div>
        </button>`;
  }

  let demosDialog = `<dialog ${data.demos ? 'open' : ''}>
  <article class="rounded-md">
    <header class="flex justify-between items-center">
      <h1 class="text-lg font-thin m-0">
        Are you sure you want to start a new project?
      </h1>
      <button 
        class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border-0" 
        style="color: unset;" 
        aria-label="Close"
        onclick="data.demos = null;">
        ${icons.times}
      </button>
    </header>
    <main class="font-thin">
      <div class="p-4 text-center">All current data will be lost.</div>
      <div class="p-4 relative h-80 overflow-auto">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          ${buttonHTML}
        </div>
      </div>
    </main>
    <footer>
      <button 
        class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" 
        style="color: unset;" 
        aria-label="Close" 
        onclick="data.demos = null;">
        close
      </button>
    </footer>
  </article>
</dialog>`;
  return demosDialog;
}
function Settings() {
  let settingsHTML = `<ul class="px-0">
    <li class="list-none">
      <div class="mb-2">
        <input 
          id="pjqgd1wka"
          type="file" 
          name="project logo" 
          class="hidden"
          onchange="handleLogoChange(event)"
        />
        <label 
          for="pjqgd1wka"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>Project logo:</span>

          <img 
            id="projectLogo"
            class="w-8"
            alt="Project Logo"
            src="${project.logo}"
            loading="lazy">
        </label>
      </div>
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <label 
          for="o14tigo4m"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>Dark:</span>
        </label>

        <input 
          id="o14tigo4m"
          class="m-0"
          type="checkbox" 
          role="switch"
          name="toggle css reset"
          onchange="project.dark = this.checked;"
          ${project.dark ? 'checked' : ''}
        />
      </nav>
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <label 
          for="ep0b8bd4c"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>Module:</span>
        </label>

        <input 
          id="ep0b8bd4c"
          class="m-0"
          type="checkbox" 
          role="switch"
          name="toggle module"
          onchange="project.module = this.checked;"
          ${project.module ? 'checked' : ''}
        />
      </nav>
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <label 
          for="if2s51d22"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>Auto run:</span>
        </label>

        <input 
          id="if2s51d22"
          class="m-0"
          type="checkbox" 
          role="switch"
          name="toggle auto run"
          onchange="project.autorun = this.checked;"
          ${project.autorun ? 'checked' : ''}
        />
      </nav>
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <label 
          for="osbpm2k0q"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>PWA:</span>
        </label>

        <input 
          id="osbpm2k0q"
          class="m-0"
          type="checkbox" 
          role="switch"
          name="export project as a pwa"
          onchange="project.pwa = this.checked"
          ${project.pwa ? 'checked' : ''}
        />
      </nav>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <nav class="flex justifu-between -mt-3 items-center">
        <label 
          for="wl7i1adq7"
          class="m-0 flex justify-between items-center cursor-pointer">
          <span>Libraries:</span>
        </label>

        <button
          aria-label="search libraries"
          name="search libraries"
          class="bg-transparent border-0 focus-within:shadow-none"
          style="color: unset;"
          onclick="data.libraries = true; searchInput.focus();">
          ${icons.search}
        </button>
      </nav>

      <div id="librariesBox">
        ${project.libraries.map((library, index) => `
        <nav class="flex justify-between py-2" data-index="${index}">
          <input 
            type="text" 
            placeholder="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js" 
            data="library" 
            class="w-full pl-3 pr-0 rounded-md rounded-r-none focus:shadow-none"
            style="margin-bottom: 0;"
            value="${library}" 
            oninput="project.libraries[${index}] = this.value; renderPreview(true);" />
          <button 
            aria-label="delete library"
            name="delete library"
            class="px-3 py-[15px] h-full border-0 rounded-md rounded-l-none"
            onclick="project.libraries.splice(${index}, 1); renderPreview(true);">
            ${icons.trash}
          </button>
        </nav>
      `).join('')}
      </div>
      <button 
        aria-label="add another library or framework" 
        name="add another library or framework" 
        onclick="project.libraries.push('')" 
        class="capitalize py-2 w-full items-center rounded-md">
        <span class="text-[.75rem]">
          Add another
        </span>
      </button>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <!--
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <div class="mb-2">
          HTML:
        </div>

        <select 
          aria-label="html preprocessor"
          name="html preprocessor"
          onchange="setPreprocessor('html', this.value);" 
          class="w-auto my-0 text-[.75rem]">
          <option value="html" ${project.html_pre_processor === 'html' ? 'selected' : ''}>HTML</option>
          <option value="markdown" ${project.html_pre_processor === 'markdown' ? 'selected' : ''}>Markdown</option>
          <option value="pug" ${project.html_pre_processor === 'pug' ? 'selected' : ''}>Pug</option>
        </select>
      </nav>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <div class="mb-2">
          CSS:
        </div>

        <select 
          aria-label="css preprocessor"
          name="css preprocessor"
          onchange="setPreprocessor('css', this.value);" 
          class="w-auto my-0 text-[.75rem]">
          <option value="css" ${project.css_pre_processor === 'css' ? 'selected' : ''}>CSS</option>
          <option value="sass" ${project.css_pre_processor === 'sass' ? 'selected' : ''}>Sass</option>
          <option value="less" ${project.css_pre_processor === 'less' ? 'selected' : ''}>LESS</option>
          <option value="stylus" ${project.css_pre_processor === 'stylus' ? 'selected' : ''}>Stylus</option>
        </select>
      </nav>
    </li>
    -->
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <div class="mb-2">
          JS:
        </div>

        <select 
          aria-label="javascript preprocessor"
          name="javascript preprocessor"
          onchange="setPreprocessor('javascript', this.value);" 
          class="w-auto my-0 text-[.75rem]">
          <option value="javascript" ${project.javascript_pre_processor === 'javascript' ? 'selected' : ''}>Javascript</option>
          <option value="babel" ${project.javascript_pre_processor === 'babel' ? 'selected' : ''}>Babel (JSX / ES6)</option>
          <option value="typescript" ${project.javascript_pre_processor === 'typescript' ? 'selected' : ''}>Typescript</option>
        </select>
      </nav>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project name:
      </div>
      <input 
        type="text" 
        name="project name"
        placeholder="Project name" 
        class="p-2 rounded-md w-full" 
        value="${project.name}"
        oninput="project.name = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project version:
      </div>
      <section class="flex justify-between gap-4">
        <input 
          type="number" 
          min="0"
          step="1"
          name="project-major-version"
          placeholder="Major"
          class="p-2 rounded-md w-full" 
          value="${project.version.split('.')[0]}"
          oninput="updateVersionPart('major', this.value);"
        />
        <input 
          type="number" 
          min="0"
          step="1"
          name="project-minor-version"
          placeholder="Minor" 
          class="p-2 rounded-md w-full" 
          value="${project.version.split('.')[1]}"
          oninput="updateVersionPart('minor', this.value);"
        />
        <input 
          type="number" 
          min="0"
          step="1"
          name="project-patch-version"
          placeholder="Patch" 
          class="p-2 rounded-md w-full" 
          value="${project.version.split('.')[2]}"
          oninput="updateVersionPart('patch', this.value);"
        />
      </section>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project title:
      </div>
      <input 
        type="text" 
        name="project title"
        placeholder="Project title"
        class="p-2 rounded-md w-full" 
        value="${project.title}"
        oninput="project.title = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project description:
      </div>
      <textarea 
        name="project description"
        placeholder="Project description" 
        class="p-2 rounded-md w-full resize-vertical h-56"
        oninput="project.description = this.value;"
      >${project.description}</textarea>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project author:
      </div>
      <input 
        type="text" 
        name="project author"
        placeholder="Project author" 
        class="p-2 rounded-md w-full" 
        value="${project.author}"
        oninput="project.author = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project url:
      </div>
      <input 
        type="text" 
        name="project url"
        placeholder="Project url" 
        class="p-2 rounded-md w-full" 
        value="${project.url}"
        oninput="project.url = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="my-2">
        HTML before closing head tag:
      </div>
      <textarea 
        placeholder="HTML before closing </head> tag" 
        class="p-2 rounded-md w-full resize-vertical h-56"
        oninput="project.meta = this.value;"
      >${project.meta}</textarea>
    </li>
  </ul>`;
  settingsHTML = `<dialog ${data.settings ? 'open' : ''}>
    <article class="rounded-md">
      <header class="flex justify-between items-center">
        <h1 class="text-lg font-thin m-0 capitalize">
          settings
        </h1>
        <button 
          class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border-0" 
          style="color: unset;" 
          aria-label="Close"
          onclick="data.settings = null">
          ${icons.times}
        </button>
      </header>
      <main class="font-thin">
        ${settingsHTML}
      </main>
      <footer>
        <button 
          class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" 
          style="color: unset;" 
          aria-label="Close" 
          onclick="data.settings = null">
          close
        </button>
      </footer>
    </article>
  </dialog>`;
  return settingsHTML;
}
function Libraries() {
  let librariesDialog = `<dialog ${data.libraries ? 'open' : ''}>
    <article class="rounded-md">
      <header class="flex justify-between items-center">
        <h1 class="text-lg font-thin m-0">
          Search for resources (JQuery, Bootstrap, Foundation...)
        </h1>
        <button 
          class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border-0" 
          style="color: unset;" 
          aria-label="Close"
          onclick="data.libraries = null; data.searchLibKey = null; searchInput.value = null;">
          ${icons.times}
        </button>
      </header>
      <main class="font-thin">
        <div class="p-4">
          <input 
            id="searchInput" 
            type="search" 
            placeholder="Search for resources (JQuery, Bootstrap, Foundation...)" 
            class="w-full p-3 rounded-full bg-[#1c212c]" 
            oninput="this.value ? data.searchLibKey = this.value : data.searchLibKey = null; data.searchLibKey ? fetchSuggestions(data.searchLibKey) : ''" />
            
          <div class="relative px-4 capitalize h-auto max-h-64 overflow-auto">
            ${data.librarySuggestions && data.searchLibKey ? data.librarySuggestions : ''}
          </div>
        </div>
      </main>
      <footer>
        <button 
          class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" 
          style="color: unset;" 
          aria-label="Close" 
          onclick="data.libraries = null; data.searchLibKey = null; searchInput.value = null;">
          close
        </button>
      </footer>
    </article>
  </dialog>`;

  return librariesDialog;
}
const App = {
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
  
    const html = `
      <div>
        <div class="absolute inset-y-0 left-0 flex flex-col text-center justify-between px-2 py-4 overflow-auto no-scrollbar">
          ${LeftMenubar()}
        </div>
        
        <!-- flexbox for panels and preview -->
        <div class="flex flex-col flex-col-reverse sm:flex-row absolute inset-y-0 right-0 left-16 bottom-0 overflow-hidden">
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
                      class="bg-white ${data.selectedSize !== 'none' ? `border border-solid ${project.dark ? "border-gray-800" : "border-gray-200"} shadow-2xl shadow-blue-500` : ''}"
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
                        aria-label="html editor"
                        name="html editor"
                        id="htmlEditor"></div>
                    </div>
                    <div class="h-full ${project.activePanel === 'css' ? '' : 'hidden'}">
                      <div 
                        data-ignore
                        class="h-full"
                        aria-label="css editor"
                        name="css editor"
                        id="cssEditor"></div>
                    </div>
                    <div class="h-full ${project.activePanel === 'javascript' ? '' : 'hidden'}">
                      <div 
                        data-ignore
                        class="h-full"
                        aria-label="javascript editor"
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
          </div>
        </div>

        ${Menu()}
        ${Settings()}
        ${Libraries()}
        ${Demos()}
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
const Modal = {
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
    // if (!options) return false;
    const hClass = "text-lg font-thin m-0";
    const buttonClass = "text-xs w-auto px-3 py-2 m-0 capitalize rounded-md";
    const svgClass = "w-3";
    const times = `<svg class="${svgClass}" viewBox="0 0 384 512">
        <path 
          fill="currentColor" 
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
      </svg>`;

    const html = `<article class="${large ? 'flex flex-col h-3/4' : ''} rounded-md">
      <header class="${large ? 'flex-none' : ''} flex justify-between items-center">
        <h1 class="${hClass}">${title}</h1>
        <button class="${buttonClass} bg-transparent border-0" style="color: unset;" aria-label="Close">
          ${times}
        </button>
      </header>
      <main class="font-thin ${large ? 'flex-grow' : ''}">
        ${content ? content : ''}
      </main>
      <footer ${large ? 'class="flex-none"' : ''}>
        <button class="${buttonClass} bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" style="color: unset;" aria-label="Close" onclick="this.closest('dialog').close()">${CloseLabel ? CloseLabel : 'close'}</button>
        ${onConfirm ? `<button class="${buttonClass}" aria-label="Confirm">${ConfirmLabel ? ConfirmLabel : 'confirm'}</button>` : ''}
      </footer>
    </article>`;

    const modal = document.createElement('dialog');
    modal.open = true;
    modal.innerHTML = html;

    document.body.appendChild(modal);
    if (onLoad && typeof onLoad === 'function') {
      onLoad();
    }

    const timesBtn = modal.querySelector('header button');
    const closeBtn = modal.querySelector('footer button:first-child');
    const confirmBtn = modal.querySelector('footer button:last-child');

    // Confirm handler function
    timesBtn.onclick = function() {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
      document.body.removeChild(modal);
    }
    closeBtn.onclick = function() {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
      document.body.removeChild(modal);
    }
    confirmBtn.onclick = function() {
      if (onConfirm && typeof onConfirm === 'function') {
        onConfirm();
      }
      document.body.removeChild(modal);
    }
  }
}
function editorNav() {
  const buttonClass = "border-0 bg-transparent py-1";

  return `<div class="flex justify-between">
    <button
      aria-label="indent"
      name="indent"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('indent', getActiveEditor())">
      ${icons.indent}
    </button>
    <button
      aria-label="outdent"
      name="outdent"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('outdent', getActiveEditor())">
      ${icons.outdent}
    </button>
    <button
      aria-label="undo"
      name="undo"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('undo', getActiveEditor())">
      ${icons.undo}
    </button>
    <button
      aria-label="redo"
      name="redo"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('redo', getActiveEditor())">
      ${icons.redo}
    </button>
    <button
      aria-label="search"
      name="search"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('search', getActiveEditor())">
      ${icons.search}
    </button>
    <button
      aria-label="goto line"
      name="goto line"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('goto', getActiveEditor())">
      ${icons.goto}
    </button>
  </div>

  <div class="flex justify-between">
    <button
      aria-label="comment"
      name="comment"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('toggleComment', getActiveEditor())">
      ${icons.comment}
    </button>
    <button
      aria-label="fold"
      name="fold"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('foldAll', getActiveEditor())">
      ${icons.fold}
    </button>
    <button
      aria-label="unfold"
      name="unfold"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('unfoldAll', getActiveEditor())">
      ${icons.unfold}
    </button>
    <button
      aria-label="cut"
      name="cut"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('cut', getActiveEditor())">
      ${icons.cut}
    </button>
    <button
      aria-label="copy"
      name="copy"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('copy', getActiveEditor())">
      ${icons.copy}
    </button>
    <button
      aria-label="paste"
      name="paste"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('paste', getActiveEditor())">
      ${icons.paste}
    </button>
    <button
      aria-label="select all"
      name="select all"
      class="${buttonClass}"
      style="color: unset;"
      onclick="editorCommand('selectAll', getActiveEditor())">
      ${icons.cursor}
    </button>
  </div>`;
}
function emptyStorage() {
  // Clear local storage
  localStorage.removeItem('kodeWeave');

  // Clear session storage
  sessionStorage.clear();

  // Clear cookies
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.trim().split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
  });

  // Clear service worker caches
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name)
    });
  }

  // Unregister all service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) registration.unregister()
    });
  }

  console.log('All saved data, cookies, and service worker caches have been cleared.');
  location.reload();
}
function updateVersionPart(part, value) {
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

// editor functions
const addLibrary = url => {
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
function fetchSuggestions(key) {
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
function removeScript(src) {
  const script = document.querySelector(`script[src="${src}"]`);
  if (script) script.remove();
}
function removeScripts(scripts) {
  scripts.forEach(src => {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) script.remove();
  });
}
async function loadScript(scriptUrl) {
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
async function loadScripts(srcArray) {
  return Promise.all(srcArray.map(loadScript));
}
async function setPreprocessor(editor, value) {
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
async function initializePreprocessors() {
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
async function loadBeautifyLibraries() {
  const beautifyLibraries = [
    "libraries/js-beautify/beautify.min.js",
    "libraries/js-beautify/beautify-css.min.js",
    "libraries/js-beautify/beautify-html.min.js"
  ];
  await loadScripts(beautifyLibraries);
}
async function removeBeautifyLibraries() {
  const beautifyLibraries = [
    "libraries/js-beautify/beautify.min.js",
    "libraries/js-beautify/beautify-css.min.js",
    "libraries/js-beautify/beautify-html.min.js"
  ];
  removeScripts(beautifyLibraries);
}
async function tidy() {
  await loadBeautifyLibraries();

  let formattedCode;
  switch (project.activePanel) {
    case 'html':
      formattedCode = html_beautify(project.html, {
        indent_size: 2,
        max_preserve_newlines: 1
      });
      dispatchChanges(editorManager.htmlEditor, formattedCode);
      break;
    case 'css':
      formattedCode = css_beautify(project.css, {
        indent_size: 2,
        max_preserve_newlines: 1
      });
      project.css = formattedCode;
      dispatchChanges(editorManager.cssEditor, formattedCode);
      break;
    case 'javascript':
      formattedCode = js_beautify(project.javascript, {
        indent_size: 2,
        max_preserve_newlines: 1
      });
      project.javascript = formattedCode;
      dispatchChanges(editorManager.jsEditor, formattedCode);
      break;
    default:
      formattedCode = 'Unknown editor panel.';
  }

  await removeBeautifyLibraries();
}

// iframe functions
function generateId() {
  let id = '';
  while (!/^[a-zA-Z]/.test(id)) {
    id = Math.random().toString(36).substr(2, 9);
  }
  return id;
}
function resizeCanvas(size) {
  data.selectedSize = size;
  getIFrameClientSize();
}
function rotateCanvas() {
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
function getIFrameClientSize() {
  const iframe = document.getElementById('iframe');
  data.iframeSize = `${iframe.clientWidth}px x ${iframe.clientHeight}px`;
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
async function compileCode(detect) {
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
async function handleLogoChange(event) {
  const file = event.target.files[0];
  if (!file) return; // If no file selected, return

  try {
    // Convert file to base64 string
    const base64String = await fileToBase64(file);
    // Update project.logo with base64String
    project.logo = base64String;
  } catch (error) {
    console.error('Error converting image to base64:', error);
  }
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function newProject(name) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const capitalizedTitle = capitalizeFirstLetter(name);
  setPreprocessor('html', 'html');
  setPreprocessor('css', 'css');
  if (name !== "typescript") setPreprocessor('javascript', 'javascript');
  if (name === "typescript" || name === "angular") setPreprocessor('javascript', 'typescript');
  project.name = `${capitalizedTitle} name`;
  project.version = '0.0.1';
  project.title = `A Cool ${capitalizedTitle} App`;
  project.description = `A modern ${capitalizedTitle} application!`;
  project.author = "kodeWeave";
  project.url = "https://michaelsboost.com/";
  project.module = true;
  project.preview = true;
  if (name === 'angular') project.module = false;
  project.pwa = false;

  if (name === 'javascript') {
    project.meta = "";
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
  <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">0</span></p>
  <button id="incrementButton" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
    +
  </button>
</div>`;
    project.css = ``;
    project.javascript = `let counter = 0;
const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('incrementButton');

incrementButton.addEventListener('click', function() {
  counter++;
  counterElement.textContent = counter;
});`;
  }
  if (name === 'typescript') {
    project.meta = "";
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
  <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">0</span></p>
  <button id="incrementButton" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
    +
  </button>
</div>`;
    project.css = ``;
    project.javascript = `let counter: number = 0;
const counterElement: HTMLElement | null = document.getElementById('counter');
const incrementButton: HTMLElement | null = document.getElementById('incrementButton');

if (counterElement && incrementButton) {
  incrementButton.addEventListener('click', function() {
    counter++;
    counterElement.textContent = counter.toString();
  });
}`;
  }
  if (name === 'react') {
    project.meta = "";
    project.libraries = [
      "https://unpkg.com/react@latest/umd/react.development.js",
      "https://unpkg.com/react-dom@latest/umd/react-dom.development.js",
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div id="root"></div>`;
    project.css = ``;
    project.javascript = `/** @jsxRuntime classic */
/** @jsx React.createElement */
const { useState } = React;

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center absolute inset-0">
      <h1 className="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
      <p className="text-xl mb-4">Counter: <span id="counter" className="font-mono">{counter}</span></p>
      <button
        id="incrementButton"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        onClick={() => setCounter(counter + 1)}
      >
        +
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`;
  }
  if (name === 'vue') {
    project.meta = "";
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.37/vue.global.prod.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div id="root"></div>`;
    project.css = ``;
    project.javascript = `const App = {
  data() {
    return {
      counter: 0,
      message: '👋 Hello, ${capitalizedTitle}! 🌎'
    };
  },
  methods: {
    incrementCounter() {
      this.counter++;
    }
  },
  template: \`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">{{ message }}</h1>
      <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">{{ counter }}</span></p>
      <button
        id="incrementButton"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        @click="incrementCounter"
      >
        +
      </button>
    </div>
  \`
};

const app = Vue.createApp(App);
app.mount('#root');`;
  }
  if (name === 'preact') {
    project.meta = `<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js" defer></script>`;
    project.libraries = [
      "https://unpkg.com/preact@latest/dist/preact.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div id="root"></div>`;
    project.css = ``;
    project.javascript = `/** @jsx h */
import { html, render, useState, useEffect } from 'https://unpkg.com/htm@3.1.1/preact/standalone.module.js';

function App() {
  const [counter, setCounter] = useState(0);

  return html\`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
      <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">\${counter}</span></p>
      <button
        id="incrementButton"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        onClick=\${() => setCounter(counter + 1)}
      >
        +
      </button>
    </div>
  \`;
}

render(html\`<\${App} />\`, document.getElementById('root'));`;
  }
  if (name === 'angularold') {
    project.meta = ``;
    project.libraries = [
      "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div ng-app="myApp" ng-controller="MainController" class="flex flex-col items-center justify-center absolute inset-0">
    <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
    <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">{{counter}}</span></p>
    <button
      id="incrementButton"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      ng-click="incrementCounter()"
    >
      +
    </button>
  </div>`;
  project.css = ``;
  project.javascript = `angular.module('myApp', [])
  .controller('MainController', function($scope) {
    $scope.counter = 0;
    $scope.incrementCounter = function() {
      $scope.counter++;
    };
  });`;
  }
  if (name === 'angular') {
    project.meta = ``;
    project.libraries = [
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
    ];
    project.html = `<app-root>Loading...</app-root>`;
    project.css = ``;
    project.javascript = `const { Component, NgModule, enableProdMode } = ng.core;
const { BrowserModule } = ng.platformBrowser;
const { platformBrowserDynamic } = ng.platformBrowserDynamic;

enableProdMode();

@Component({
  selector: 'app-root',
  template: \`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">👋 Hello, Angular 11! 🌎</h1>
      <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">{{ counter }}</span></p>
      <button
        id="incrementButton"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        (click)="incrementCounter()"
      >
        +
      </button>
    </div>
  \`,
})
class AppComponent {
  counter = 0;
  
  incrementCounter() {
    this.counter++;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);`;
  }
  if (name === 'alpine') {
    project.meta = `<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js" defer></script>`;
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div x-data="{ counter: 0 }" class="flex flex-col items-center justify-center absolute inset-0">
  <div class="flex flex-col items-center justify-center absolute inset-0">
    <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
    <p class="text-xl mb-4">Counter: <span class="font-mono" x-text="counter"></span></p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      x-on:click="counter++"
    >
      +
    </button>
  </div>
</div>`;
    project.css = ``;
    project.javascript = ``;
  }
  if (name === 'solid') {
    project.meta = ``;
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div id="root"></div>`;
    project.css = ``;
    project.javascript = `import { createSignal } from "https://cdn.skypack.dev/solid-js@1.2.6";
import { render } from "https://cdn.skypack.dev/solid-js@1.2.6/web";
import html from "https://cdn.skypack.dev/solid-js@1.2.6/html";

function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  return html\`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
      <p class="text-xl mb-4">Counter: <span class="font-mono">\${count}</span></p>
      <button type="button" onClick=\${increment}>
        +
      </button>
    </div>
  \`;
}

render(Counter, document.getElementById("root"));`;
  }
  if (name === 'stimulus') {
    project.meta = "";
    project.libraries = [
      "https://cdn.jsdelivr.net/npm/@hotwired/stimulus@3.1.0/dist/stimulus.umd.js",
      "https://cdn.jsdelivr.net/npm/@hotwired/stimulus-loading@1.0.0/dist/stimulus-loading.umd.js",
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div data-controller="counter" class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
  <p class="text-xl mb-4">Counter: <span data-counter-target="output" class="font-mono">0</span></p>
  <button
    data-action="click->counter#increment"
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
  >
    +
  </button>
</div>`;
  project.css = ``;
  project.javascript = `const application = Stimulus.Application.start();

application.register('counter', class extends Stimulus.Controller {
  static targets = ['output'];

  initialize() {
    this.counter = 0;
  }

  increment() {
    this.counter += 1;
    this.outputTarget.textContent = this.counter;
  }
});`;
  }
  if (name === 'mithril') {
    project.meta = "";
    project.libraries = [
      "https://cdn.jsdelivr.net/npm/mithril@2.0.4/mithril.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<div id="root"></div>`;
    project.css = ``;
    project.javascript = `import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(m)

const app = () => {
 let count = 0
 
 return {
  view: () => html\`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">👋 Hello, Mithril! 🌎</h1>
      <p class="text-xl mb-4">Counter: <span class="font-mono">\${count}</span></p>
      <button onclick=\${() => count++}>+</button>
    </div>\`
  }
}

m.mount(document.getElementById('root'), app)`;
  }
  if (name === 'hyperapp') {
    project.meta = `<script src="https://unpkg.com/hyperapp@0.16.0"></script>`;
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<h1 id="root"></h1>`;
    project.css = ``;
    project.javascript = `import { app } from 'https://unpkg.com/hyperapp';
import html from 'https://unpkg.com/hyperlit';

app({
  init: 0,
  view: count => html\`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">👋 Hello, Hyperapp! 🌎</h1>
      <p class="text-xl mb-4">Counter: <span class="font-mono">\${count}</span></p>
      <button onclick=\${count => count + 1}>+</button>
    </div>\`,
  node: document.getElementById('root')
})`;
  }
  if (name === 'aurelia') {
    project.meta = '<script src="https://cdn.jsdelivr.net/npm/aurelia-script@1.4.0"></script>';
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
    ];
    project.html = `<template id="root">
  <div class="flex flex-col items-center justify-center absolute inset-0">
    <h1 class="text-3xl font-thin mb-4">👋 Hello, ${capitalizedTitle}! 🌎</h1>
    <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">0</span></p>
    <button 
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      click.delegate="incrementCounter()">
      +
    </button>
  </div>
</template>`;
    project.css = ``;
    project.javascript = `class App {
  static $view() {
    return document.querySelector('#root');
  }
  constructor() {
    this.message = '${capitalizedTitle}';
    this.counter = 0;
  }
  incrementCounter() {
    this.counter++;
    document.getElementById('counter').textContent = this.counter;
  }
}

au.start({ root: App });`;
  }
  if (name === 'lit') {
    project.meta = "";
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css"
    ];
    project.html = `<my-element></my-element>`;
    project.css = ``;
    project.javascript = `import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
  
class MyElement extends LitElement {
  static properties = {
    counter: { type: Number }
  };

  constructor() {
    super();
    this.counter = 0;
  }

  incrementCounter() {
    this.counter++;
  }

  render() {
    return html\`
      <main>
        <h1>👋 Hello, ${capitalizedTitle}! 🌎</h1>
        <p>Counter: \${this.counter}</p>
        <button @click="\${this.incrementCounter}">
          +
        </button>
      </main>
    \`;
  }
}
customElements.define('my-element', MyElement);`;
  }
  if (name === 'knockout') {
    project.meta = "";
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"
    ];
    project.html = `<div class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">👋 Hello, Knockout.js! 🌎</h1>
  <p class="text-xl mb-4">Counter: <span class="font-mono" data-bind="text: counter">0</span></p>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition" 
          data-bind="click: increment">
    +
  </button>
</div>`;
    project.css = ``;
    project.javascript = `function AppViewModel() {
  this.counter = ko.observable(0);

  this.increment = () => {
    this.counter(this.counter() + 1);
  };
}

ko.applyBindings(new AppViewModel());`;
  }
  if (name === 'moon') {
    project.meta = `<script src="https://unpkg.com/moonjs"></script>`;
    project.libraries = [
      "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
      "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js",
    ];
    project.html = `<div id="root" class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">👋 Hello, Moon.js! 🌎</h1>
  <p class="text-xl mb-4">Counter: <span class="font-mono">{{ count }}</span></p>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition" m-on:click="increment">
    +
  </button>
</div>`;
    project.css = ``;
    project.javascript = `var app = new Moon({
  el: '#root',
  data: {
    count: 0
  },
  methods: {
    increment() {
      this.set('count', this.get('count') + 1);
    }
  }
});`;
  }

  dispatchChanges(editorManager.htmlEditor, project.html);
  dispatchChanges(editorManager.cssEditor, project.css);
  dispatchChanges(editorManager.jsEditor, project.javascript);
  if (name === 'react') setPreprocessor('javascript', 'babel');
  data.demos = false;
  renderPreview(true);
}
function importJSON(obj) {
  if (obj === null) return;
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
function importProject() {
  Modal.render({
    title: "Are you sure you want to load a new project?",
    content: `<div class="p-4 text-center">All current data will be lost.</div>`,
    onClose: function () {
      data.menuDialog = true;
    },
    onConfirm: function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';

      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        
        if (!file) {
          console.error('No file selected.');
          return;
        }
    
        const reader = new FileReader();
    
        reader.onload = event => {
          try {
            importJSON(JSON.parse(event.target.result));
            setTimeout(function() {
              renderPreview(true);
            }, 100);
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
    
        reader.readAsText(file);
        input.remove();
      });
    
      input.click();
    }
  });
}
function getFileNameAndType(url) {
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
function fetchResources(obj) {
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
async function getBase64Media(mediaUrl) {
  const response = await fetch(mediaUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
async function downloadJSON() {
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
async function getFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.warn("Request error:", error);
    throw error; // Re-throw to handle in caller
  }
};
async function downloadProject() {
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
      if (project.css.trim() !== '') {
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
    
    // PostCSS Configuration
    if (project.css.trim() !== '') {
      let postcssStr = `module.exports = {
  plugins: [
    require('autoprefixer'), // adds vendor prefixes
    require('cssnano') // minifies the CSS
  ]
};`;
      zip.file("postcss.config.js", postcssStr);
    }
    
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
        for (const size of sizes) {
          const canvas = document.createElement('canvas');
          canvas.width = parseInt(size.split('x')[0]);
          canvas.height = parseInt(size.split('x')[1]);
          const ctx = canvas.getContext('2d');

          // Draw logo on canvas at the desired size
          const img = new Image();
          img.src = base64Logo;
          img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const base64Image = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
            zip.folder('imgs').file(`logo-${size}.png`, base64Image, { base64: true });
          };

          // Clean up canvas element
          canvas.remove();
        }
    
        zip.file(`manifest.json`, JSON.stringify({
          "theme_color": "#13171f",
          "background_color": "#13171f",
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
    }

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
      css4html = `<link rel="stylesheet" href="dist/style.css">
    `;
      cssBuild = `"build:css": "postcss src/style.css -o dist/bundle.css",`;
      zip.file("src/style.css", project.css + cssImport);
      zip.file('dist/style.css', minifyCSS(tailwindStyles + project.css));
    }

    // Add style.css
    // if (project.css_pre_processor === 'css') zip.file("src/style.css", project.css);
    // if (project.css_pre_processor === 'stylus') zip.file('src/style.styl', project.css);
    // if (project.css_pre_processor === 'stylus') zip.file('dist/style.css', minifiedCSS);
    // if (project.css_pre_processor === 'less') zip.file('src/style.less', project.css);
    // if (project.css_pre_processor === 'less') zip.file('dist/style.css', iframe.contentDocument.getElementById('aeoibrfa1').textContent);
    // if (project.css_pre_processor === 'sass') zip.file('src/style.scss', project.css);
    // if (project.css_pre_processor === 'sass') zip.file('dist/style.css', minifiedCSS);

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
      preset: 'default',
    }),
  ],
};`);
    }

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

    // if pwa is enabled
    let swinit = '';
    if (project.pwa) {
      swinit = `
    <script src="https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"></script>
    <script>
      // service worker for progressive web app
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./sw.js')
        })
      }
    </script>`;
      const swjs = `// Service worker code
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;

const cacheName = '${project.name.split(' ').join('')}-cache';

workbox.routing.registerRoute(
({ request }) => request.destination === 'script' ||
           request.destination === 'style' ||
           request.destination === 'document' ||
           request.destination === 'image' ||
           request.destination === 'font' ||
           request.destination === 'audio' ||
           request.destination === 'video',
new CacheFirst({
cacheName: cacheName,
plugins: [
// Any additional plugins can be added here
],
})
);`
  zip.file("sw.js", swjs);
    }

    // Iterate over each library
    let scriptTags = '';
    let cssTags = '';
    project.libraries.forEach(library => {
      if (library.endsWith('.js')) {
        scriptTags += `<script src="${library}"></script>\n    `;
      } else {
        // Assuming it's a Google font
        cssTags += `<link href="${library}" rel="stylesheet">\n    `;
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
    let placeScript = `<script src="dist/script.js" ${project.module ? 'type="module"' : ''}></script>`;
    if (project.javascript_pre_processor === 'babel') {
      const library = "libraries/preprocessors/babel.min.js";
      const data = await getFile(library);
      const parts = library.split("/");
      const name = parts[parts.length - 1];

      zip.folder('libraries').file(name, data);

      placeScript = `<script src="libraries/babel.min.js"></script>
    <script type="text/babel" src="src/script.jsx" ${project.module ? 'data-type="module"' : ''}></script>`;
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
<html lang="en" data-theme="${project.dark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, interactive-widget=resizes-content">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${project.title}">
    <meta name="theme-color" content="hsl(205deg 18.75% 87.45%)">
    <meta name="apple-mobile-web-app-title" content="${project.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="./index.html">
    <meta name="msapplication-navbutton-color" content="hsl(205deg 18.75% 87.45%)">
    <meta property="og:url" content="${project.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" type="image/x-icon" href="imgs/logo.svg">
    <link rel="icon" type="image/svg+xml" href="imgs/logo.svg" />
    <link rel="apple-touch-icon" href="imgs/logo.svg">
    ${cssTags ? cssTags : ''}${project.meta ? `${project.meta}\n  ` : ''}
  </head>
  <body>

${html}

    ${scriptTags ? scriptTags : ''}
    ${project.javascript ? placeScript : ''}${(project.pwa ? swinit : '')}
  </body>
</html>`;
    const indexHtmlContentCompiled = `<!DOCTYPE html>
<html lang="en" data-theme="${project.dark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, interactive-widget=resizes-content">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${project.title}">
    <meta name="theme-color" content="hsl(205deg 18.75% 87.45%)">
    <meta name="apple-mobile-web-app-title" content="${project.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="./index.html">
    <meta name="msapplication-navbutton-color" content="hsl(205deg 18.75% 87.45%)">
    <meta property="og:url" content="${project.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" type="image/x-icon" href="imgs/logo.svg">
    <link rel="icon" type="image/svg+xml" href="imgs/logo.svg" />
    <link rel="apple-touch-icon" href="imgs/logo.svg">
    ${css4html}${project.meta ? `${project.meta}\n  ` : ''}${scriptTags ? scriptTags : ''}
  </head>
  <body>
    
${html}

    ${project.javascript ? `<script src="dist/script.js" ${project.module ? 'type="module"' : ''}></script>` : ''}${(project.pwa ? swinit : '')}
  </body>
</html>`;
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
      const imgFolder = zip.folder('imgs');
      try {
        for (const { url, fileName } of imageResources) {
          const base64Image = await getBase64Media(url);
          imgFolder.file(fileName, base64Image, { base64: true });
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
async function share() {
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
        js: project.javascript,
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

async function screenshot() {
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
async function renderPreview(forceRun = false) {
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
  const consoleCSS = `
    [data-zwj=zwjkonsole] {
      display: ${project.console ? 'flex' : 'none'};
    }`
  const iframeSrc = `<html data-theme="${project.dark ? 'dark' : 'light'}">
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
    <script type="module" src="libraries/domconsole/dom-console-mod.min.js" defer></script>
  </head>
  <body>
    ${await compileCode('html')}
    ${scriptTags ? scriptTags : ''}
    ${project.css_pre_processor === 'less' ? '<script src="libraries/preprocessors/less.js"></script>' : ''}
  </body>
</html>`;

  if (forceRun) {
    iframe.setAttribute('srcdoc', iframeSrc);
    iframe.onload = () => {
      const doc = iframe.contentWindow.document;
      const script = doc.createElement('script');
      script.type = project.module ? 'module' : 'text/javascript';
      script.textContent = javascriptCode;
      doc.body.appendChild(script);
    }
  }
}

// Make functions available in global space
window.Modal = Modal;
window.emptyStorage = emptyStorage;
window.updateVersionPart = updateVersionPart;
window.addLibrary = addLibrary;
window.fetchSuggestions = fetchSuggestions;
window.setPreprocessor = setPreprocessor;
window.initializePreprocessors = initializePreprocessors;
window.loadBeautifyLibraries = loadBeautifyLibraries
window.removeBeautifyLibraries = removeBeautifyLibraries;
window.tidy = tidy;
window.generateId = generateId;
window.resizeCanvas = resizeCanvas;
window.rotateCanvas = rotateCanvas;
window.getIFrameClientSize = getIFrameClientSize;
window.handleLogoChange = handleLogoChange;
window.newProject = newProject;
window.importProject = importProject;
window.downloadJSON = downloadJSON;
window.getFile = getFile;
window.downloadProject = downloadProject;
window.share = share;
window.screenshot = screenshot;
window.renderPreview = renderPreview;

// Diffing algorithm to update ui when changes occur
function diffNodes(oldNode, newNode) {
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
    App.render('#app');
    if (window.initEditors) initEditors();
    getIFrameClientSize();

    if (localStorage.getItem('kodeWeave')) {
      importJSON(JSON.parse(localStorage.getItem('kodeWeave')));
      setTimeout(function() {
        renderPreview(true);
      }, 100);
    }
  }
  window.onresize = () => getIFrameClientSize();
});