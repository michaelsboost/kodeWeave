(()=>{var K=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(s,r)=>(typeof require<"u"?require:s)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});function U(t,s,r=[]){function i(o,n){return typeof o!="object"||o===null?o:new Proxy(o,{set(a,c,l){let C=[...n,c],y=a[c],x=Reflect.set(a,c,i(l,C));return y!==l&&s(C,y,l),x},get(a,c){let l=a[c];return typeof l=="object"&&l!==null?i(l,[...n,c]):l}})}return i(t,r)}var E={name:"kodeWeave",author:{name:"Michael Schwartz",href:"https://michaelsboost.com/",src:"imgs/author.jpg"},version:"1.2",url:"https://michaelsboost.com/kodeWeave/",license:"https://github.com/michaelsboost/kodeWeave/blob/main/LICENSE"},q={name:"App name",version:.01,title:"An attractive title",description:"The most attractive description ever!",author:"kodeWeave",url:"https://michaelsboost.com/",meta:"",libraries:["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],html_pre_processor:"html",css_pre_processor:"css",javascript_pre_processor:"javascript",html:"",css:"",javascript:"",logo:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHZpZXdCb3g9IjAgMCA1MTEuOTk5OTkgNTExLjk5OTk5IgogICBoZWlnaHQ9IjUxMiIKICAgd2lkdGg9IjUxMiIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNDE5MCI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNDE5NiI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczQxOTQiPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0Mjc2Ij4KICAgICAgPHN0b3AKICAgICAgICAgaWQ9InN0b3A0Mjc4IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZDVkOTI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wNDI4MCIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICB5Mj0iMjU3LjMxMjUiCiAgICAgICB4Mj0iMC4xMzQwNDE2NSIKICAgICAgIHkxPSIyNTcuMzEyNSIKICAgICAgIHgxPSI1MTEuNzE4NzUiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0MjgyIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50NDI3NiIgLz4KICA8L2RlZnM+CiAgPGcKICAgICBpZD0iZzQyODQiPgogICAgPGNpcmNsZQogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ0MjgyKTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTo3MiwgNzI7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgaWQ9InBhdGg0MjcwIgogICAgICAgY3g9IjI1NiIKICAgICAgIGN5PSIyNTYiCiAgICAgICByPSIyNTYiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6NzIsIDcyO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMjUxLjA2MDY4LDU4LjY3ODI3MiBjIC00LjU2MDMyLDAuMDcwMzUgLTIwLjc2MDYxLDIuMDQxOTQ1IC0yOS4yOTc5MiwzLjY1NTk4NCAtMjguMzQzOTEsNS4zNTg2MiAtNjYuODgwODEsMjIuNjE5ODE0IC03My4wMzY5OSwzMi43MTkwNjEgLTEuODk3NTUsMy4xMTI5MzUgLTEuOTQ2MTYsNy4xNDcwMTMgLTEuOTQ2MTYsMTYwLjgxNzAyMyAwLDE1Mi4yNTg4IDAuMDY3MSwxNTcuNzI0NjQgMS44OTk5OCwxNjAuNzMxMjEgNS4yMDU5OSw4LjUzOTg5IDM2LjcyMDAzLDIzLjcwOTM0IDYzLjQ1MTMzLDMwLjU0MTM0IDkuNzY1NzIsMi40OTU5MyAzNC4zMzUwOSw2LjM0NDggMzguNTA3NTQsNi4wMzE2OSAyLjAwMzg4LC0wLjE1MDM2IDIuMDMyMDMsLTAuOTc0NjkgMi4yODkyMSwtNzMuMDkzMjQgMC4xNDU1OCwtNDAuODM3NTkgMC42NTY0MywtNzMuMzM0MTQgMS4xNjEwOSwtNzMuODM4OTYgMS4zNzc1MSwtMS4zNzc5NSA3LjM0NzM5LDEuODg0NzMgMTAuMzU3NTIsNS42NjIxNSAxLjQ2MjAyLDEuODM0NjggMTMuNzk3NTUsMjAuNjU1MjggMjcuNDE3NzQsNDEuODE5NDMgNTEuNDQ0NTIsNzkuOTM4NDcgNTAuNDY1MTEsNzguNDc3OTggNTMuMzA0OTQsNzkuMTkwOTQgMy4zMjQ3OCwwLjgzNDc0IDEyLjU2NzA4LC0zLjc4OTQ3IDI3LjU3NjA2LC0xMy43ODU4MyAxNC4yNDMzOCwtOS40ODY0NiAyMy44ODU1LC0xNy43ODMxIDM0LjgxOTcyLC0yOS45NjcxNyAxMS4yOTUwMiwtMTIuNTg2MTUgMTQuODMwMzksLTE3LjQxNzg1IDE0LjgzMDM5LC0yMC4yNTMwOCAwLC0xLjIyMDA5IC0xNC45NzA2LC0yNC41NDAzMyAtMzMuNDAxMzMsLTUyLjAyODQ2IC0xOC4zNzA1NywtMjcuMzk4MzcgLTM0LjEwMTA3LC01MS4xNjg3NiAtMzQuOTU4MjgsLTUyLjgyNjk2IC0wLjg1NzIzLC0xLjY1ODIgLTEuNTU2OTMsLTQuMDczMzUgLTEuNTU2OTMsLTUuMzY1MTkgMCwtMS4zMjEyMyAxMi40ODk1OSwtMjIuMjk0ODcgMjguNTQ1ODQsLTQ3Ljk0MzUyIDQ0LjQ4MzE1LC03MS4wNTg1NiA0MS45MzgzMywtNjYuMjkxNzggMzguODMwODEsLTcyLjg0MjQ3IC0yLjU1NzU1LC01LjM5MTM2IC0xNS4zNjI2MiwtMTkuNjU4MDkgLTI2LjEzMTI5LC0yOS4xMTU4NyAtMTEuNDU0NTksLTEwLjA2MDE5MSAtMzUuMDY0MTMsLTI1Ljk1MDI3NiAtMzkuOTA2MTIsLTI2Ljg1ODkzNCAtMi45NDE1NCwtMC41NTIwMSAtMy45NzUxOSwtMC4yNDY3ODggLTUuOTE3NjYsMS43NDIyMDEgLTEuMjk1NjQsMS4zMjY2NDggLTIwLjM1MDEyLDMyLjM0ODMwMyAtNDIuMzQwNDgsNjguOTM1NzIzIC0yMS45OTAzNiwzNi41ODc0IC00MS4wNjUzOSw2Ny45OTE2NyAtNDIuMzg2NjUsNjkuNzg3MDIgLTIuNjE5NTQsMy41NTkzNyAtNi43MzI4MSw2LjA5MzA2IC04LjczNDYzLDUuMzc4MzggLTAuOTk5NDcsLTAuMzU2ODMgLTEuMjY2NjUsLTE4LjE3MDM1IC0xLjI2NjY1LC04NC40NDM5NCAwLC00OS41MTMxOTYgLTAuMzc4NjQsLTg0LjIxOTIyNiAtMC45MjM2LC04NC41NTYxMzggLTAuMTE5ODQsLTAuMDc0MSAtMC41MzYwMSwtMC4xMDI0NDYgLTEuMTg3NDgsLTAuMDkyMzggeiIKICAgICAgIGlkPSJwYXRoNDI2MCIgLz4KICA8L2c+Cjwvc3ZnPgo=",console:!1,dark:!0,diffing:!1,module:!0,autorun:!0,pwa:!1,activePanel:"html",columns:!0,columnsRight:!0},ee={colors:{text:"text-[#fff]",border:"border-gray-800"},searchLibKey:null,librarySuggestions:null,iframeSize:null,activePanel:"html",selectedSize:"none",compiledJSX:null,menuDialog:null,settings:null,libraries:null,safeRender:null,demos:null},p=function(){let t="h-4 w-4",s="h-3 w-3",r="h-4 w-4",i="h-3 w-3",o="h-3 -mt-1";return{logo:`<svg
      class="${t}" 
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
    </svg>`,twitterfill:`<svg class="${t}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
    </svg>`,twitter:`<svg class="${t}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
    </svg>`,heart:`<svg class="w-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>`,html:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512">
      <path 
        d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/>
      </svg>`,css:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
      <path 
        d="M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z"/>
      </svg>`,javascript:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
      <path 
        d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/>
      </svg>`,columns:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
    </svg>`,leftChev:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>`,rightChev:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>`,console:`<svg class="${t}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="m 12,18.340203 h 8.757019" />
      <path d="M 3.3316546,18.340203 10.159567,11.778315 3.2429806,5.6597968" />
    </svg>`,play:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>`,camera:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>`,cog:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>`,tidy:`<svg class="${o}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M566.6 54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192-34.7-34.7c-4.2-4.2-10-6.6-16-6.6c-12.5 0-22.6 10.1-22.6 22.6l0 29.1L364.3 320l29.1 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16l-34.7-34.7 192-192zM341.1 353.4L222.6 234.9c-42.7-3.7-85.2 11.7-115.8 42.3l-8 8C76.5 307.5 64 337.7 64 369.2c0 6.8 7.1 11.2 13.2 8.2l51.1-25.5c5-2.5 9.5 4.1 5.4 7.9L7.3 473.4C2.7 477.6 0 483.6 0 489.9C0 502.1 9.9 512 22.1 512l173.3 0c38.8 0 75.9-15.4 103.4-42.8c30.6-30.6 45.9-73.1 42.3-115.8z"/>
    </svg>`,rotate:`<svg class="${o}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
    </svg>`,times:`<svg class="${r}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>`,file:`<svg class="h-3 -mt-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
    </svg>`,import:`<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z" />
    </svg>`,download:`<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
    </svg>`,codepen:`<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z" />
    </svg>`,trash:`<svg class="${i}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>`,undo:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
    </svg>`,redo:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
    </svg>`,cut:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
    </svg>`,copy:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>`,paste:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
    </svg>`,indent:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>`,outdent:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
    </svg>`,search:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>`,goto:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>`,comment:`<svg class="${s}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>`,fold:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>`,unfold:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>`,cursor:`<svg class="${t}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
    </svg>`}}(),e=U(q,(t,s,r)=>{if(s!==r&&(localStorage.setItem("kodeWeave",JSON.stringify(e)),A.render("#app"),t.toString()==="activePanel"&&(e.activePanel==="html"&&setActiveEditor(editorManager.htmlEditor),e.activePanel==="css"&&setActiveEditor(editorManager.cssEditor),e.activePanel==="javascript"&&setActiveEditor(editorManager.javascriptEditor)),!A.initialRender)){let i=["title","description","author","meta","libraries","html","css","dark"],o=["html_pre_processor","css_pre_processor","javascript_pre_processor","javascript","console"],n=t.toString();if(i.includes(n)&&(e.autorun&&(e.diffing?w():n!=="css"&&w(!0)),n==="html"&&editorManager.htmlEditor.state.doc.toString()!==e.html&&dispatchChanges(editorManager.htmlEditor,e.html),n==="css")){let c=document.getElementById("iframe").contentWindow.document;c.getElementById("cuxjju3ew").textContent=e.css,editorManager.cssEditor.state.doc.toString()!==e.css&&dispatchChanges(editorManager.cssEditor,e.css)}if(o.includes(n)){if(n==="console"){let a=`
        .wrapper_yOR7u {
          ${e.console?"":"display: none!important;"}
          left: 0!important; width: 100%!important; 
          border-radius: 15px 15px 0 0!important; 
          z-index: 99999999;
        } 
        .btn_yOR7u {
          cursor: pointer; 
          background: inherit; 
          padding: 0 0.5rem; 
          margin: inherit; 
          margin-right: 0px; 
          border: inherit; 
          color: #fff!important; 
        } 
        .nav_yOR7u {
          padding-bottom: 14px!important;
        } 
        .line_yOR7u {
          background: inherit!important;
        }
          
        ${e.css}`,l=document.getElementById("iframe").contentWindow.document;l.getElementById("cuxjju3ew").textContent=a}if(n==="javascript"&&(w(!0),editorManager.jsEditor.state.doc.toString()!==e.javascript))return dispatchChanges(editorManager.jsEditor,e.javascript),!1;(n==="html_pre_processor"||n==="css_pre_processor"||n==="javascript_pre_processor")&&w(!0)}n==="dark"&&document.documentElement.setAttribute("data-theme",e.dark?"dark":"light")}}),d=U(ee,(t,s,r)=>{s!==r&&A.render("#app")});window.project=e;window.data=d;function te(){let t="w-full";return`<ul class="p-0 m-0">
  <li class="list-none m-0">
    <button
      aria-label="toggle menu"
      name="toggle menu"
      class="${t} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="data.menuDialog = true"
    >
      ${p.logo}
    </button>
  </li>
  <li class="list-none m-0">
    <a
      aria-label="toggle html"
      name="toggle html"
      class="${t} text-sm border-0 px-4 py-3 rounded-md bg-transparent"
      style="color: unset;"
      role="button"
      href="https://twitter.com/kodeweave_app"
    >
      ${p.twitter}
    </a>
  </li>
  <li class="list-none m-0">
    <a
      href="https://michaelsboost.com/donate/"
      aria-label="Donation helps developer maintence"
      target="_blank"
      role="button"
      class="${t} text-sm border-0 px-4 py-3 rounded-md bg-transparent text-red-400"
    >
      ${p.heart}
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
      class="${t} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${e.activePanel==="html"?"text-blue-500":""}"
      ${e.activePanel==="html"?"":'style="color: unset;"'}
      onclick="setActiveEditor(htmlEditor); project.activePanel = project.activePanel === 'html' ? null : 'html'; defineScale();"
    >
      ${p.html}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="toggle css"
      name="toggle css"
      class="${t} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${e.activePanel==="css"?"text-blue-500":""}"
      ${e.activePanel==="css"?"":'style="color: unset;"'}
      onclick="setActiveEditor(cssEditor); project.activePanel = project.activePanel === 'css' ? null : 'css'; defineScale();"
    >
      ${p.css}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="toggle javascript"
      name="toggle javascript"
      class="${t} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${e.activePanel==="javascript"?"text-blue-500":""}"
      ${e.activePanel==="javascript"?"":'style="color: unset;"'}
      onclick="setActiveEditor(jsEditor); project.activePanel = project.activePanel === 'javascript' ? null : 'javascript'; defineScale();"
    >
      ${p.javascript}
    </button>
  </li>
  <li class="list-none m-0">
    <hr />
  </li>
</ul>
<ul class="p-0 m-0">
  <li class="list-none m-0">
    <button
      aria-label="toggle console"
      name="toggle console"
      class="${t}  text-sm border-0 px-0 py-3 rounded-md bg-transparent ${e.console?"text-green-500":""}"
      onclick="project.console = !project.console;"
    >
      ${p.console}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="full page screenshot"
      name="full page screenshot"
      class="${t} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="screenshot()"
    >
      ${p.camera}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="settings button"
      name="settings"
      class="${t} text-sm border-0 px-4 py-3 rounded-md bg-transparent -mt-1"
      style="color: unset;"
      onclick="data.settings = !data.settings"
    >
      ${p.cog}
    </button>
  </li>
</ul>`}function se(){let t="border-0 bg-transparent text-sm",s="mx-0 my-2 w-auto rounded-md capitalize text-[.6rem]",r="padding: 0.5rem;",i={Phones:{"320x480":"iPhone 3GS","375x667":"iPhone 6/7/8","414x736":"iPhone 6/7/8 Plus","375x812":"iPhone X/XS/11 Pro","414x896":"iPhone XR/XS Max/11/11 Pro Max","360x640":"Samsung Galaxy S5","360x740":"Samsung Galaxy S8+","1440x3200":"Samsung Galaxy S21 Ultra","1080x2340":"Google Pixel 5","1080x2400":"OnePlus 8 Pro","1440x3200":"Xiaomi Mi 11 Ultra","1644x3840":"Sony Xperia 1 III"},Tablets:{"2048x2732":'iPad Pro 12.9" (3rd/4th Gen)',"2388x1668":'iPad Pro 11" (1st/2nd/3rd Gen)',"2736x1824":"Microsoft Surface Pro 7","2800x1752":"Samsung Galaxy Tab S7+","2560x1600":"Huawei MatePad Pro","2000x1200":"Lenovo Tab P11 Pro","1920x1200":"Amazon Fire HD 10","1536x2048":"iPad Air (3rd Gen)","1620x2160":"iPad Air (4th Gen)","1620x2160":'iPad 10.2" (8th Gen)',"1668x2224":'iPad Pro 11" (2021)'},Desktops:{"3840x2160":"4K UHD (3840x2160)","2560x1440":"WQHD (2560x1440)","1920x1080":"Full HD (1920x1080)","1366x768":"Laptop (1366x768)","3440x1440":"UltraWide QHD (3440x1440)","5120x2880":"5K Retina (5120x2880)","1280x800":"MacBook (1280x800)","2560x1600":"MacBook Pro (2560x1600)","2880x1800":"MacBook Pro Retina (2880x1800)"}},o=`<label for="selectedSize" aria-label="resize canvas" class="mx-2">
    <select id="selectedSize" onchange="resizeCanvas(this.value)" class="${s}" style="${r}">
      <option value="none">Select Size</option>
      ${Object.keys(i).map(a=>`
        <optgroup label="${a}">
          ${Object.keys(i[a]).map(c=>`
            <option value="${c}">${i[a][c]}</option>
          `).join("")}
        </optgroup>
      `).join("")}
    </select>
  </label>`;function n(){if(!e.activePanel||e.activePanel&&(e.activePanel==="html"&&e.html_pre_processor!=="html"||e.activePanel==="css"&&e.css_pre_processor!=="css"||e.activePanel==="javascript"&&e.javascript_pre_processor!=="javascript"))return"hidden"}return`<div class="flex justify-between items-center overflow-auto">
  ${o}

  <span>
    <button 
      aria-label="rotate canvas"
      name="rotate canvas" 
      class="${t} ${d.selectedSize==="none"?"hidden":""}"
      style="color: unset;"
      onclick="rotateCanvas()">
      ${p.rotate}
    </button>

    <span class="${e.activePanel?"":"hidden"}">
      <button
        aria-label="change view"
        name="change view"
        class="${t} hidden sm:inline-block"
        style="color: unset; ${e.columns?"":"transform: rotate(90deg);"}"
        onclick="project.columns = !project.columns;"
      >
        ${p.columns}
      </button>
      <button
        aria-label="toggle columns left or right"
        name="toggle columns left or right"
        class="${t} hidden ${e.activePanel?`${e.columns?"":"sm:inline-block"}`:""}"
        style="color: unset;"
        onclick="project.columnsRight = !project.columnsRight;"
      >
        ${e.columnsRight?p.leftChev:p.rightChev}
      </button>
    </span>

    <button 
      aria-label="tidy code"
      name="tidy code"
      class="${t} ${n()}"
      style="color: unset;"
      onclick="tidy()">
      ${p.tidy}
    </button>

    <button
      aria-label="run preview"
      name="run preview"
      class="${t} ${e.autorun?"hidden":""}"
      style="color: unset;"
      onclick="renderPreview(true)"
    >
      ${p.play}
    </button>
  </span>
</div>`}var A={initialRender:!0,render(t){let s=d.selectedSize,r,i,o=document.getElementById("previewElm");document.getElementById("previewElm")&&(r=o.clientWidth,i=o.clientHeight);let[n,a]=s.split("x").map(Number),c=`<ul class="py-4 px-0">
                <li class="list-none">
                  <div class="items-center text-center">
                    <div>
                      <a 
                        aria-label="project homepage"
                        name="project homepage"
                        target="_blank" 
                        href="${E.url}">
                        <img 
                          alt="logo"
                          class="my-4 w-24 m-auto"
                          src="../imgs/logo.svg"
                          loading="lazy" />
                      </a>
                      <div class="text-2xl">
                        About ${E.name}
                      </div>
                      <div class="my-2 text-xs">
                        Version ${E.version}
                      </div>
                      <a 
                        target="_blank" 
                        class="text-sm underline mb-2 text-blue-500" 
                        href="${E.license}">
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
              </ul>`;c=`<dialog ${d.menuDialog?"open":""}>
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
                ${p.times}
              </button>
            </header>
            <main class="font-thin">
              ${c}
            </main>
            <footer>
              <button 
                class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${e.dark?"border-gray-600":"border-gray-200"}" 
                style="color: unset;" 
                aria-label="Close" 
                onclick="data.menuDialog = null">
                close
              </button>
            </footer>
          </article>
        </dialog>`;let l=`<ul class="px-0">
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
          src="${e.logo}"
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
        ${e.dark?"checked":""}
      />
    </nav>
  </li>
  <li class="list-none">
    <nav class="flex justify-between mt-5 items-center">
      <label 
        for="k6tw02ec9"
        class="mb-2 flex justify-between items-center cursor-pointer">
        <span>Diffing:</span>
      </label>

      <input 
        id="k6tw02ec9"
        class="m-0"
        type="checkbox" 
        role="switch"
        name="toggle module"
        onchange="project.diffing = this.checked;"
        ${e.diffing?"checked":""}
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
        ${e.module?"checked":""}
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
        ${e.autorun?"checked":""}
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
        ${e.pwa?"checked":""}
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
        ${p.search}
      </button>
    </nav>

    <div id="librariesBox">
      ${e.libraries.map((h,S)=>`
      <nav class="flex justify-between py-2" data-index="${S}">
        <input 
          type="text" 
          placeholder="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js" 
          data="library" 
          class="w-full pl-3 pr-0 rounded-md rounded-r-none focus:shadow-none"
          style="margin-bottom: 0;"
          value="${h}" 
          oninput="project.libraries[${S}] = this.value; renderPreview(true);" />
        <button 
          aria-label="delete library"
          name="delete library"
          class="px-3 py-[15px] h-full border-0 rounded-md rounded-l-none"
          onclick="project.libraries.splice(${S}, 1); renderPreview(true);">
          ${p.trash}
        </button>
      </nav>
    `).join("")}
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
        <option value="html" ${e.html_pre_processor==="html"?"selected":""}>HTML</option>
        <option value="markdown" ${e.html_pre_processor==="markdown"?"selected":""}>Markdown</option>
        <option value="pug" ${e.html_pre_processor==="pug"?"selected":""}>Pug</option>
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
        <option value="css" ${e.css_pre_processor==="css"?"selected":""}>CSS</option>
        <option value="sass" ${e.css_pre_processor==="sass"?"selected":""}>Sass</option>
        <option value="less" ${e.css_pre_processor==="less"?"selected":""}>LESS</option>
        <option value="stylus" ${e.css_pre_processor==="stylus"?"selected":""}>Stylus</option>
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
        <option value="javascript" ${e.javascript_pre_processor==="javascript"?"selected":""}>Javascript</option>
        <option value="babel" ${e.javascript_pre_processor==="babel"?"selected":""}>Babel (JSX / ES6)</option>
        <option value="typescript" ${e.javascript_pre_processor==="typescript"?"selected":""}>Typescript</option>
        <option value="jsxtypescript" ${e.javascript_pre_processor==="jsxtypescript"?"selected":""}>JSX + Typescript</option>
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
      value="${e.name}"
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
    <input 
      type="number" 
      min="0"
      step="0.01"
      name="project version"
      placeholder="Project version" 
      class="p-2 rounded-md w-full" 
      value="${e.version}"
      oninput="project.version = this.value;"
    />
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
      value="${e.title}"
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
    >${e.description}</textarea>
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
      value="${e.author}"
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
      value="${e.url}"
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
    >${e.meta}</textarea>
  </li>
</ul>`;l=`<dialog ${d.settings?"open":""}>
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
                ${p.times}
              </button>
            </header>
            <main class="font-thin">
              ${l}
            </main>
            <footer>
              <button 
                class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${e.dark?"border-gray-600":"border-gray-200"}" 
                style="color: unset;" 
                aria-label="Close" 
                onclick="data.settings = null">
                close
              </button>
            </footer>
          </article>
        </dialog>`;let C=`<dialog ${d.libraries?"open":""}>
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
                ${p.times}
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
                  ${d.librarySuggestions&&d.searchLibKey?d.librarySuggestions:""}
                </div>
              </div>
            </main>
            <footer>
              <button 
                class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${e.dark?"border-gray-600":"border-gray-200"}" 
                style="color: unset;" 
                aria-label="Close" 
                onclick="data.libraries = null; data.searchLibKey = null; searchInput.value = null;">
                close
              </button>
            </footer>
          </article>
        </dialog>`,y="grid grid-rows-1 items-center bg-transparent border-0 focus-within:shadow-none",x="flex flex-col justify-between h-full",g="grid h-full items-center",f="capitalize text-center mt-4",I=["javascript","typescript","react","vue","preact","angular","alpine","solid","stimulus","mithril","hyperapp","aurelia","lit"],j="";for(let h of I)j+=`<button
            aria-label="new ${h} project"
            name="new ${h} project"
            class="${y}"
            style="color: unset;"
            onclick="newProject('${h}')">
            <div class="${x}">
              <div class="${g}">
                <img width="256" height="256" src="imgs/frameworks/${h}.svg" alt="${h}" />
              </div>
              <div class="${f}">
                ${h}
              </div>
            </div>
          </button>`;let D=`<dialog ${d.demos?"open":""}>
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
                ${p.times}
              </button>
            </header>
            <main class="font-thin">
              <div class="p-4 text-center">All current data will be lost.</div>
              <div class="p-4 relative h-80 overflow-auto">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  ${j}
                </div>
              </div>
            </main>
            <footer>
              <button 
                class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${e.dark?"border-gray-600":"border-gray-200"}" 
                style="color: unset;" 
                aria-label="Close" 
                onclick="data.demos = null;">
                close
              </button>
            </footer>
          </article>
        </dialog>`,u=`
      <div>
        <div class="absolute inset-y-0 left-0 flex flex-col text-center justify-between px-2 py-4 overflow-auto no-scrollbar">
          ${te()}
        </div>
        
        <!-- flexbox for panels and preview -->
        <div class="flex flex-col flex-col-reverse sm:flex-row absolute inset-y-0 right-0 left-16 bottom-0 overflow-hidden">
          <div class="relative w-full h-full border-0 border-x border-solid overflow-auto p-4 ${d.colors.border}">
            <nav class="absolute inset-0 flex flex-col ${e.columns?"flex-col":`sm:flex-row ${e.columnsRight?"sm:flex-row-reverse":""}`}">
              <div class="flex-grow w-full flex flex-col">
                <div class="flex-none border-0 border-b border-solid ${d.colors.border}">
                  ${se()}
                </div>
                <div class="flex-grow overflow-hidden">
                  <div id="previewElm" class="relative grid grid-cols-1 align-center items-center w-full h-full">
                    <iframe
                      id="iframe"
                      title="${e.title}"
                      class="bg-white ${d.selectedSize!=="none"?`border border-solid ${d.colors.border} shadow-2xl shadow-blue-500`:""}"
                      style="${d.selectedSize==="none"?"width: 100%; height: 100%":`
      width: ${n}px;
      height: ${a}px;
      transform: scale(${Math.min(r/n,i/a)});
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -${a/2}px;
      margin-left: -${n/2}px;`}"
                      allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *"
                      allowfullscreen="true"
                      allowpaymentrequest="true"
                      allowtransparency="true"
                      sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                      loading="lazy"
                    ></iframe>

                    <span 
                      id="iframeClientSize" 
                      class="hidden opacity-0 transition-opacity duration-300 absolute top-0 right-0 ${e.dark?"bg-gray-800":"bg-gray-200"} p-1 text-xs">
                        ${d.iframeSize}
                    </span>
                  </div>
                </div>
              </div>
              <div class="relative flex-grow w-full ${e.columns?"h-1/4":"2xl:w-1/2 h-1/4 sm:h-full sm:border-solid sm:border-0 lg:border-r "+d.colors.border} ${e.activePanel?"":"hidden"}">
                <div class="absolute inset-0 flex flex-col justify-between">
                  <div class="flex-grow overflow-auto ${e.columns?`border-0 border-t border-solid ${d.colors.border}`:""}">
                    <div class="h-full ${e.activePanel==="html"?"":"hidden"}">
                      <div 
                        data-ignore
                        class="h-full"
                        aria-label="html editor"
                        name="html editor"
                        id="htmlEditor"></div>
                    </div>
                    <div class="h-full ${e.activePanel==="css"?"":"hidden"}">
                      <div 
                        data-ignore
                        class="h-full"
                        aria-label="css editor"
                        name="css editor"
                        id="cssEditor"></div>
                    </div>
                    <div class="h-full ${e.activePanel==="javascript"?"":"hidden"}">
                      <div 
                        data-ignore
                        class="h-full"
                        aria-label="javascript editor"
                        name="javascript editor"
                        id="jsEditor"></div>
                    </div>
                  </div>
                  <div class="flex-none overflow-auto border-0 border-t border-solid ${d.colors.border}">
                    ${oe()}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        ${c}
        ${l}
        ${C}
        ${D}
      </div>`,m=document.querySelector(t);if(!m)return;let $=new DOMParser().parseFromString(u,"text/html");if($.body.innerHTML.trim()===u.trim())return;if(A.initialRender)return m.innerHTML=u,w(!0),A.initialRender=!1,!1;let O=m.firstElementChild,k=$.body.firstElementChild;W(O,k)}},G={render({large:t,title:s="Are you sure you want to proceed?",content:r,CloseLabel:i,ConfirmLabel:o,onLoad:n,onConfirm:a}){let c="text-lg font-thin m-0",l="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md",x=`<article class="${t?"flex flex-col h-3/4":""} rounded-md">
      <header class="${t?"flex-none":""} flex justify-between items-center">
        <h1 class="${c}">${s}</h1>
        <button class="${l} bg-transparent border-0" style="color: unset;" aria-label="Close">
          <svg class="w-3" viewBox="0 0 384 512">
        <path 
          fill="currentColor" 
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
      </svg>
        </button>
      </header>
      <main class="font-thin ${t?"flex-grow":""}">
        ${r||""}
      </main>
      <footer ${t?'class="flex-none"':""}>
        <button class="${l} bg-transparent border ${e.dark?"border-gray-600":"border-gray-200"}" style="color: unset;" aria-label="Close" onclick="this.closest('dialog').close()">${i||"close"}</button>
        ${a?`<button class="${l}" aria-label="Confirm">${o||"confirm"}</button>`:""}
      </footer>
    </article>`,g=document.createElement("dialog");g.open=!0,g.innerHTML=x,document.body.appendChild(g),n&&typeof n=="function"&&n();let f=g.querySelector("header button"),I=g.querySelector("footer button:first-child"),j=g.querySelector("footer button:last-child");f.onclick=()=>document.body.removeChild(g),I.onclick=()=>document.body.removeChild(g),j.onclick=function(){a&&typeof a=="function"&&a(),document.body.removeChild(g)}}};function oe(){let t="border-0 bg-transparent py-1";return`<div class="flex justify-between">
    <button
      aria-label="indent"
      name="indent"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('indent', getActiveEditor())">
      ${p.indent}
    </button>
    <button
      aria-label="outdent"
      name="outdent"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('outdent', getActiveEditor())">
      ${p.outdent}
    </button>
    <button
      aria-label="undo"
      name="undo"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('undo', getActiveEditor())">
      ${p.undo}
    </button>
    <button
      aria-label="redo"
      name="redo"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('redo', getActiveEditor())">
      ${p.redo}
    </button>
    <button
      aria-label="search"
      name="search"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('search', getActiveEditor())">
      ${p.search}
    </button>
    <button
      aria-label="goto line"
      name="goto line"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('goto', getActiveEditor())">
      ${p.goto}
    </button>
  </div>

  <div class="flex justify-between">
    <button
      aria-label="comment"
      name="comment"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('toggleComment', getActiveEditor())">
      ${p.comment}
    </button>
    <button
      aria-label="fold"
      name="fold"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('foldAll', getActiveEditor())">
      ${p.fold}
    </button>
    <button
      aria-label="unfold"
      name="unfold"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('unfoldAll', getActiveEditor())">
      ${p.unfold}
    </button>
    <button
      aria-label="cut"
      name="cut"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('cut', getActiveEditor())">
      ${p.cut}
    </button>
    <button
      aria-label="copy"
      name="copy"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('copy', getActiveEditor())">
      ${p.copy}
    </button>
    <button
      aria-label="paste"
      name="paste"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('paste', getActiveEditor())">
      ${p.paste}
    </button>
    <button
      aria-label="select all"
      name="select all"
      class="${t}"
      style="color: unset;"
      onclick="editorCommand('selectAll', getActiveEditor())">
      ${p.cursor}
    </button>
  </div>`}function re(){localStorage.removeItem("kodeWeave"),sessionStorage.clear(),document.cookie.split(";").forEach(function(t){document.cookie=t.trim().split("=")[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/"}),"caches"in window&&caches.keys().then(function(t){for(let s of t)caches.delete(s)}),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(function(t){for(let s of t)s.unregister()}),console.log("All saved data, cookies, and service worker caches have been cleared."),location.reload()}var ie=t=>{if(!t)return e.libraries.push(""),document.getElementById("librariesBox").innerHTML=Z(),!1;e.libraries.includes(t)?console.error(`Library already exists: ${t}`):e.libraries.push(t),document.getElementById("librariesBox")&&(document.getElementById("librariesBox").innerHTML=Z())};function Z(){return e.libraries.map((t,s)=>`
    <nav class="flex justify-between py-2" data-index="${s}">
      <input 
        type="text" 
        placeholder="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js" 
        data="library" 
        class="w-full pl-3 pr-0 rounded-md rounded-r-none focus:shadow-none"
        style="margin-bottom: 0;"
        value="${t}" 
        oninput="project.libraries[${s}] = this.value" />
      <button 
        aria-label="delete library"
        name="delete library"
        class="px-3 py-[15px] h-full border-0 rounded-md rounded-l-none"
        onclick="project.libraries.splice(${s}, 1);">
        ${p.trash}
      </button>
    </nav>
  `).join("")}function ne(t){fetch(`https://api.cdnjs.com/libraries?search=${t}&fields=filename,description,version`).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.json()}).then(s=>{if(s&&s.results&&s.results.length>0){let r=s.results.map(i=>i);d.librarySuggestions=r.map(i=>`
            <section 
              class="cursor-pointer"
              onclick="
                if (!project.libraries.includes('${i.latest}')) project.libraries.push('${i.latest}'); 
                data.libraries = null;
                data.searchLibKey = null;
                data.librarySuggestions = null;
                searchInput.value = null;
              ">
              <div class="flex justify-between mb-2 font-bold text-1xl">
                <span class="font-bold">${i.name}</span>
                <span class="font-bold">${i.version}</span>
              </div>
              <div class="text-sm font-thin">${i.description}<br><hr></div>
            </section>`).join("")}}).catch(s=>{console.error("Error fetching data:",s)})}function T(t){let s=document.querySelector(`script[src="${t}"]`);s&&s.remove()}function R(t){t.forEach(s=>{let r=document.querySelector(`script[src="${s}"]`);r&&r.remove()})}async function N(t){return new Promise((s,r)=>{if(document.querySelector(`script[src="${t}"]`)){s();return}let o=document.createElement("script");o.src=t,o.onload=s,o.onerror=()=>r(new Error(`Failed to load script: ${t}`)),document.body.appendChild(o)})}async function _(t){return Promise.all(t.map(N))}async function b(t,s){let r={html:{markdown:"libraries/preprocessors/marked.min.js",jade:"libraries/preprocessors/jade.js",pug:"libraries/preprocessors/pug.js"},css:{sass:"libraries/preprocessors/sass.sync.min.js",less:"libraries/preprocessors/less.min.js",stylus:"libraries/preprocessors/stylus.min.js"},javascript:{typescript:"libraries/preprocessors/typescript.min.js",babel:"libraries/preprocessors/babel.min.js",jsxtypescript:["libraries/preprocessors/typescript.min.js","libraries/preprocessors/babel.min.js"]}},i={html:e.html_pre_processor,css:e.css_pre_processor,javascript:e.javascript_pre_processor};try{let o=s!=="html"||s!=="css"||s!=="javascript",n=o?r[t][s]:null;if(i[t]&&o){let a=r[t][i[t]];Array.isArray(a)?R(a):T(a),Array.isArray(n)?await _(n):n&&await N(n)}t==="html"?(e.html_pre_processor=s,window.editorManager.setMode(e.html_pre_processor==="html"?"html":s,editorManager.htmlEditor)):t==="css"?(e.css_pre_processor=s,window.editorManager.setMode(e.css_pre_processor==="css"?"css":s,editorManager.cssEditor)):t==="javascript"&&(e.javascript_pre_processor=s,window.editorManager.setMode(e.javascript_pre_processor==="javascript"?"javascript":s,editorManager.jsEditor))}catch(o){console.error("Error setting preprocessor:",o)}}async function Y(){await Promise.all([b("html",e.html_pre_processor),b("css",e.css_pre_processor),b("javascript",e.javascript_pre_processor)]),dispatchChanges(editorManager.htmlEditor,e.html),dispatchChanges(editorManager.cssEditor,e.css),dispatchChanges(editorManager.jsEditor,e.javascript),w(!0)}async function V(){await _(["libraries/js-beautify/beautify.min.js","libraries/js-beautify/beautify-css.min.js","libraries/js-beautify/beautify-html.min.js"])}async function J(){R(["libraries/js-beautify/beautify.min.js","libraries/js-beautify/beautify-css.min.js","libraries/js-beautify/beautify-html.min.js"])}async function ae(){await V();let t;switch(e.activePanel){case"html":t=html_beautify(e.html,{indent_size:2,max_preserve_newlines:1}),dispatchChanges(editorManager.htmlEditor,t);break;case"css":t=css_beautify(e.css,{indent_size:2,max_preserve_newlines:1}),e.css=t,dispatchChanges(editorManager.cssEditor,t);break;case"javascript":t=beautify(e.javascript,{indent_size:2,max_preserve_newlines:1}),e.javascript=t,dispatchChanges(editorManager.jsEditor,t);break;default:t="Unknown editor panel."}await J()}function le(){let t="";for(;!/^[a-zA-Z]/.test(t);)t=Math.random().toString(36).substr(2,9);return t}function ce(t){d.selectedSize=t,z()}function pe(){let t=document.getElementById("previewElm").firstElementChild;if(t.style.width==="100%")return!1;let s=parseInt(t.style.width),r=parseInt(t.style.height);[s,r]=[r,s];let i=previewElm.clientWidth,o=previewElm.clientHeight,n=Math.min(i/s,o/r);t.style.width=`${s}px`,t.style.height=`${r}px`,t.style.transform=`scale(${n})`,t.style.marginTop=`-${r/2}px`,t.style.marginLeft=`-${s/2}px`,d.selectedSize=s+"x"+r}function F(){let t=document.getElementById("previewElm").firstElementChild;if(t.style.width==="100%")return!1;let s=parseInt(t.style.width),r=parseInt(t.style.height),i=previewElm.clientWidth,o=previewElm.clientHeight,n=Math.min(i/s,o/r);t.style.width=`${s}px`,t.style.height=`${r}px`,t.style.transform=`scale(${n})`,t.style.marginTop=`-${r/2}px`,t.style.marginLeft=`-${s/2}px`}var H;function z(){if(d.selectedSize==="none"){let t=document.getElementById("iframe");d.iframeSize=`${t.clientWidth}px x ${t.clientHeight}px`;let s=document.getElementById("iframeClientSize");s.classList.contains("hidden")&&(H&&clearTimeout(H),s.classList.remove("hidden","opacity-0"),s.classList.add("opacity-100"),H=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0"),setTimeout(()=>{s.classList.add("hidden")},300)},2e3))}else F()}async function M(t){try{if(t==="html")switch(e.html_pre_processor){case"markdown":return marked.parse(e.html);case"jade":return jade.render(e.html,{pretty:!0});case"pug":let s=document.getElementById("appScript");return s.hasAttribute("type")&&s.getAttribute("type")==="module"?(console.error("Cannot import pug as script is a module!"),!1):K("pug").compile(e.html)({name:this.name});default:return e.html}if(t==="css")switch(e.css_pre_processor){case"stylus":return stylus.render(e.css);case"less":return new Promise((s,r)=>{less.render(e.css,(i,o)=>i?r(i):s(o.css))});case"sass":return new Promise((s,r)=>{Sass.compile(e.css,i=>i.status===0?s(i.text):r(new Error(i.message)))});default:return e.css}if(t==="javascript")switch(e.javascript_pre_processor){case"babel":return typeof Babel>"u"&&await N("libraries/preprocessors/babel.min.js"),Babel.transform(e.javascript,{presets:["env","react"]}).code;case"typescript":return ts.transpileModule(e.javascript,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;case"jsxtypescript":let s=ts.transpileModule(e.javascript,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES5,jsx:ts.JsxEmit.React}}).outputText;return d.compiledJSX=Babel.transform(s,{presets:["env","react"]}).code,d.compiledJSX;default:return e.javascript}}catch(s){console.error("Error compiling code:",s)}}async function de(t){let s=t.target.files[0];if(s)try{let r=await ue(s);e.logo=r}catch(r){console.error("Error converting image to base64:",r)}}function ue(t){return new Promise((s,r)=>{let i=new FileReader;i.readAsDataURL(t),i.onload=()=>s(i.result),i.onerror=o=>r(o)})}function me(t){function s(i){return i.charAt(0).toUpperCase()+i.slice(1)}let r=s(t);b("html","html"),b("css","css"),t!=="typescript"&&b("javascript","javascript"),(t==="typescript"||t==="angular")&&b("javascript","typescript"),e.name=`${r} name`,e.version=.01,e.title=`A Cool ${r} App`,e.description=`A modern ${r} application!`,e.author="kodeWeave",e.url="https://michaelsboost.com/",e.diffing=!1,e.module=!0,t==="angular"&&(e.module=!1),e.pwa=!1,t==="javascript"&&(e.meta="",e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html=`<div class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
  <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">0</span></p>
  <button id="incrementButton" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
    +
  </button>
</div>`,e.css="",e.javascript=`let counter = 0;
const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('incrementButton');

incrementButton.addEventListener('click', function() {
  counter++;
  counterElement.textContent = counter;
});`),t==="typescript"&&(e.meta="",e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html=`<div class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
  <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">0</span></p>
  <button id="incrementButton" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
    +
  </button>
</div>`,e.css="",e.javascript=`let counter: number = 0;
const counterElement: HTMLElement | null = document.getElementById('counter');
const incrementButton: HTMLElement | null = document.getElementById('incrementButton');

if (counterElement && incrementButton) {
  incrementButton.addEventListener('click', function() {
    counter++;
    counterElement.textContent = counter.toString();
  });
}`),t==="react"&&(e.meta="",e.libraries=["https://unpkg.com/react@latest/umd/react.development.js","https://unpkg.com/react-dom@latest/umd/react-dom.development.js","https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html='<div id="root"></div>',e.css="",e.javascript=`/** @jsxRuntime classic */
/** @jsx React.createElement */
const { useState } = React;

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center absolute inset-0">
      <h1 className="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
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
root.render(<App />);`),t==="vue"&&(e.meta="",e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.37/vue.global.prod.min.js","https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html='<div id="root"></div>',e.css="",e.javascript=`const App = {
    data() {
      return {
        counter: 0,
        message: '\u{1F44B} Hello, ${r}! \u{1F30E}'
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
  app.mount('#root');`),t==="preact"&&(e.meta='<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js" defer><\/script>',e.libraries=["https://unpkg.com/preact@latest/dist/preact.min.js","https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html='<div id="root"></div>',e.css="",e.javascript=`/** @jsx h */
import { html, render, useState, useEffect } from 'https://unpkg.com/htm@3.1.1/preact/standalone.module.js';

function App() {
  const [counter, setCounter] = useState(0);

  return html\`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
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

render(html\`<\${App} />\`, document.getElementById('root'));`),t==="angularold"&&(e.meta="",e.libraries=["https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js","https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html=`<div ng-app="myApp" ng-controller="MainController" class="flex flex-col items-center justify-center absolute inset-0">
    <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
    <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">{{counter}}</span></p>
    <button
      id="incrementButton"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      ng-click="incrementCounter()"
    >
      +
    </button>
  </div>`,e.css="",e.javascript=`angular.module('myApp', [])
  .controller('MainController', function($scope) {
    $scope.counter = 0;
    $scope.incrementCounter = function() {
      $scope.counter++;
    };
  });`),t==="angular"&&(e.meta="",e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.3/rxjs.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.js","https://unpkg.com/@angular/core@11.0.5/bundles/core.umd.js","https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.10.3/zone.min.js","https://unpkg.com/@angular/common@11.0.5/bundles/common.umd.js","https://unpkg.com/@angular/compiler@11.0.5/bundles/compiler.umd.js","https://unpkg.com/@angular/platform-browser@11.0.5/bundles/platform-browser.umd.js","https://unpkg.com/@angular/platform-browser-dynamic@11.0.5/bundles/platform-browser-dynamic.umd.js","https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html="<app-root>Loading...</app-root>",e.css="",e.javascript=`const { Component, NgModule, enableProdMode } = ng.core;
const { BrowserModule } = ng.platformBrowser;
const { platformBrowserDynamic } = ng.platformBrowserDynamic;

enableProdMode();

@Component({
  selector: 'app-root',
  template: \`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
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

platformBrowserDynamic().bootstrapModule(AppModule);`),t==="alpine"&&(e.meta='<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js" defer><\/script>',e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html=`<div x-data="{ counter: 0 }" class="flex flex-col items-center justify-center absolute inset-0">
  <div class="flex flex-col items-center justify-center absolute inset-0">
    <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
    <p class="text-xl mb-4">Counter: <span class="font-mono" x-text="counter"></span></p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      x-on:click="counter++"
    >
      +
    </button>
  </div>
</div>`,e.css="",e.javascript="",e.diffing=!0),t==="solid"&&(e.meta="",e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html='<div id="root"></div>',e.css="",e.javascript=`import { createSignal } from "https://cdn.skypack.dev/solid-js@1.2.6";
import { render } from "https://cdn.skypack.dev/solid-js@1.2.6/web";
import html from "https://cdn.skypack.dev/solid-js@1.2.6/html";

function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  return html\`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
      <p class="text-xl mb-4">Counter: <span class="font-mono">\${count}</span></p>
      <button type="button" onClick=\${increment}>
        +
      </button>
    </div>
  \`;
}

render(Counter, document.getElementById("root"));`),t==="stimulus"&&(e.meta="",e.libraries=["https://cdn.jsdelivr.net/npm/@hotwired/stimulus@3.1.0/dist/stimulus.umd.js","https://cdn.jsdelivr.net/npm/@hotwired/stimulus-loading@1.0.0/dist/stimulus-loading.umd.js","https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html=`<div data-controller="counter" class="flex flex-col items-center justify-center absolute inset-0">
  <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
  <p class="text-xl mb-4">Counter: <span data-counter-target="output" class="font-mono">0</span></p>
  <button
    data-action="click->counter#increment"
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
  >
    +
  </button>
</div>`,e.css="",e.javascript=`const application = Stimulus.Application.start();

application.register('counter', class extends Stimulus.Controller {
  static targets = ['output'];

  initialize() {
    this.counter = 0;
  }

  increment() {
    this.counter += 1;
    this.outputTarget.textContent = this.counter;
  }
});`),t==="mithril"&&(e.meta="",e.libraries=["https://cdn.jsdelivr.net/npm/mithril@2.0.4/mithril.min.js","https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html='<div id="root"></div>',e.css="",e.javascript=`const App = {
    count: 0,
    increment() {
      this.count++;
    },
    view: () => (
      m("div", { class: "flex flex-col items-center justify-center absolute inset-0" },
        m("h1", { class: "text-3xl font-thin mb-4" }, "\u{1F44B} Hello, ${r}! \u{1F30E}"),
        m("p", { class: "text-xl mb-4" }, "Counter: ", m("span", { class: "font-mono" }, App.count)),
        m("div", { class: "flex gap-2" },
          m("button", {
            class: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition",
            onclick: App.increment.bind(App)
          }, "+")
        )
      )
    )
  };

  m.mount(document.getElementById('root'), App);`),t==="hyperapp"&&(e.meta='<script src="https://unpkg.com/hyperapp@0.16.0"><\/script>',e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html='<h1 id="root"></h1>',e.css="",e.javascript=`import { app } from 'https://unpkg.com/hyperapp';
import html from 'https://unpkg.com/hyperlit';

app({
  init: 0,
  view: count => html\`
    <div class="flex flex-col items-center justify-center absolute inset-0">
      <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, Hyperapp! \u{1F30E}</h1>
      <p class="text-xl mb-4">Counter: <span class="font-mono">\${count}</span></p>
      <button onclick=\${count => count + 1}>+</button>
    </div>\`,
  node: document.getElementById('root')
})`),t==="aurelia"&&(e.meta='<script src="https://cdn.jsdelivr.net/npm/aurelia-script@1.4.0"><\/script>',e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css","https://michaelsboost.com/TailwindCSSMod/tailwind-mod.min.js"],e.html=`<template id="root">
  <div class="flex flex-col items-center justify-center absolute inset-0">
    <h1 class="text-3xl font-thin mb-4">\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
    <p class="text-xl mb-4">Counter: <span id="counter" class="font-mono">0</span></p>
    <button 
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      click.delegate="incrementCounter()">
      +
    </button>
  </div>
</template>`,e.css="",e.javascript=`class App {
  static $view() {
    return document.querySelector('#root');
  }
  constructor() {
    this.message = '${r}';
    this.counter = 0;
  }
  incrementCounter() {
    this.counter++;
    document.getElementById('counter').textContent = this.counter;
  }
}

au.start({ root: App });`),t==="lit"&&(e.meta="",e.libraries=["https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css"],e.html="<my-element></my-element>",e.css="",e.javascript=`import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
  
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
        <h1>\u{1F44B} Hello, ${r}! \u{1F30E}</h1>
        <p>Counter: \${this.counter}</p>
        <button @click="\${this.incrementCounter}">
          +
        </button>
      </main>
    \`;
  }
}
customElements.define('my-element', MyElement);`),dispatchChanges(editorManager.htmlEditor,e.html),dispatchChanges(editorManager.cssEditor,e.css),dispatchChanges(editorManager.jsEditor,e.javascript),t==="react"&&b("javascript","babel"),d.demos=!1,w(!0)}function Q(t){t!==null&&(e.obj={},d.safeRender=null,b("html",t.html_pre_processor),b("css",t.css_pre_processor),b("javascript",t.javascript_pre_processor),e.name=t.name,e.version=t.version,e.title=t.title,e.description=t.description,e.author=t.author,e.url=t.url,e.logo=t.logo,e.console=t.console,e.dark=t.dark,e.diffing=t.diffing,e.module=t.module,e.autorun=t.autorun,e.pwa=t.pwa,e.activePanel=t.activePanel,e.columns=t.columns,e.columnsRight=t.columnsRight,e.meta=t.meta,e.libraries=t.libraries,e.html=t.html,e.css=t.css,e.javascript=t.javascript,d.safeRender=!0,dispatchChanges(editorManager.htmlEditor,e.html),dispatchChanges(editorManager.cssEditor,e.css),dispatchChanges(editorManager.jsEditor,e.javascript),w(!0))}function ge(){G.render({title:"Are you sure you want to load a new project?",content:'<div class="p-4 text-center">All current data will be lost.</div>',onConfirm:function(){let t=document.createElement("input");t.type="file",t.accept=".json",t.addEventListener("change",s=>{let r=s.target.files[0];if(!r){console.error("No file selected.");return}let i=new FileReader;i.onload=o=>{try{Q(JSON.parse(o.target.result))}catch(n){console.error("Error parsing JSON file:",n)}},i.readAsText(r),t.remove()}),t.click()}})}function B(t){let s=t.substring(t.lastIndexOf("/")+1),r=s.split(".").pop().toLowerCase(),o={jpeg:"image/jpeg",jpg:"image/jpeg",png:"image/png",gif:"image/gif",bmp:"image/bmp",webp:"image/webp",svg:"image/svg+xml",mp3:"audio/mpeg",wav:"audio/wav",ogg:"audio/ogg",mp4:"video/mp4",webm:"video/webm",ogv:"video/ogg"}[r]||"application/octet-stream";return{fileName:s,fileType:o}}function he(t){try{let r=new DOMParser().parseFromString(t.html,"text/html").body,i=[],o=[],n=[],a=[];return r.querySelectorAll("img").forEach(c=>{c.hasAttribute("src")&&(i.push(c.getAttribute("src")),c.src=`imgs/${B(c.getAttribute("src")).fileName}`)}),r.querySelectorAll("audio").forEach(c=>{c.querySelectorAll("source").forEach(l=>{l.hasAttribute("src")&&(o.push(l.getAttribute("src")),l.src=`audios/${B(l.getAttribute("src")).fileName}`)})}),r.querySelectorAll("svg").forEach(c=>{n.push(c.outerHTML)}),r.querySelectorAll("video").forEach(c=>{c.querySelectorAll("source").forEach(l=>{l.hasAttribute("src")&&(a.push(l.getAttribute("src")),l.src=`vids/${B(l.getAttribute("src")).fileName}`)})}),{imageUrls:i,audioUrls:o,vectors:n,videoUrls:a}}catch(s){return console.error("Error fetching resources:",s),null}}async function L(t){let r=await(await fetch(t)).blob();return new Promise((i,o)=>{let n=new FileReader;n.onloadend=()=>i(n.result.split(",")[1]),n.onerror=o,n.readAsDataURL(r)})}async function fe(){try{await N("libraries/jszip/FileSaver.min.js");let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"});saveAs(t,`${e.name.split(" ").join("").toLowerCase()}-kodeWeave.json`)}catch(t){console.error("Error:",t)}finally{T("libraries/jszip/FileSaver.min.js")}}async function be(){try{let n=function(){return e.css.trim()!==""?`
    "postcss": "^8.4.6",
    "autoprefixer": "^10.4.2",
    "cssnano": "^5.0.12"`:""},a=function(){return e.javascript_pre_processor==="babel"||e.javascript_pre_processor==="jsxtypescript"?`,
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "rollup-plugin-babel": "^4.4.0"`:e.javascript_pre_processor==="typescript"||e.javascript_pre_processor==="jsxtypescript"?`,
    "rollup-plugin-typescript2": "^0.31.1",
    "typescript": "^4.4.3"`:""};await _(["libraries/jszip/jszip.min.js","libraries/jszip/FileSaver.min.js"]);let{imageUrls:t,audioUrls:s,vectors:r,videoUrls:i}=he(e),o=new JSZip;o.file(`${e.name.split(" ").join("").toLowerCase()}-kodeWeave.json`,JSON.stringify(e,null,2));let c=`{
  "name": "${e.name.toLowerCase().split(" ").join("")}",
  "version": "${e.version}",
  "type": "module",
  "scripts": {
    ${e.css.trim()!==""?`"build:css": "postcss src/styles.css -o dist/styles.min.css",
    `:""}"build:js": "rollup -c && terser dist/script.js -o dist/script.min.js",
    "build": "${e.css.trim()!==""?"npm run build:css && ":""}npm run build:js",
    "serve": "http-server -c-1 -p 8081"
  },
  "devDependencies": {
    "rollup": "^2.79.1",
    "rollup-plugin-terser": "^7.0.2",
    "terser": "^5.10.0",
    "http-server": "^14.1.1"${n()}${a()}
  }
}`;o.file("package.json",c);let l=`import { terser } from 'rollup-plugin-terser';
`;(e.javascript_pre_processor==="babel"||e.javascript_pre_processor==="jsxtypescript")&&(l+=`import babel from 'rollup-plugin-babel';
`),(e.javascript_pre_processor==="typescript"||e.javascript_pre_processor==="jsxtypescript")&&(l+=`import typescript from 'rollup-plugin-typescript2';
`);let C=`${l}
export default {
  ${e.javascript_pre_processor==="typescript"||e.javascript_pre_processor==="jsxtypescript"?"input: 'src/script.ts', // entry point for your TypeScript":"input: 'src/script.js', // entry point to your Javascript"}
  output: {
    file: 'dist/script.js',
    format: ${e.module?"'es'":"'iife'"}, // Immediately Invoked Function Expression, suitable for <script> tags
    name: '${e.name.toLowerCase().split(" ").join("")}'
  },
  plugins: [
    ${e.javascript_pre_processor==="typescript"||e.javascript_pre_processor==="jsxtypescript"?"typescript(),":""}
    ${e.javascript_pre_processor==="babel"||e.javascript_pre_processor==="jsxtypescript"?'babel({ exclude: "node_modules/**" }),':""}
    terser() // minifies the JavaScript
  ]
};`;if(o.file("rollup.config.js",C),e.css.trim()!==""&&o.file("postcss.config.js",`module.exports = {
  plugins: [
    require('autoprefixer'), // adds vendor prefixes
    require('cssnano') // minifies the CSS
  ]
};`),e.javascript_pre_processor==="babel"||e.javascript_pre_processor==="jsxtypescript"){let u=`{
  "presets": [
    "@babel/preset-env",
    ${e.javascript_pre_processor==="jsxtypescript"?'"@babel/preset-typescript",':""}
    "@babel/preset-react"
  ]
}`;o.file("babel.config.json",u)}(e.javascript_pre_processor==="typescript"||e.javascript_pre_processor==="jsxtypescript")&&o.file("tsconfig.json",`{
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
}`);let y=`The MIT License (MIT)
Copyright (c) ${new Date().getFullYear()} ${e.author}

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
SOFTWARE.`;o.file("LICENSE.md",y);let x=`# ${e.name}

A Weave created on [kodeWeave](https://michaelsboost.com/kodeWeave/go)

${e.description}`;if(o.file("README.md",x),e.logo)try{let u="";e.logo.startsWith("data:")?u=e.logo:u=await L(e.logo);let m;if(e.logo.startsWith("data:image/png"))m="png";else if(e.logo.startsWith("data:image/jpeg"))m="jpeg";else if(e.logo.startsWith("data:image/svg+xml"))m="svg";else{console.error("Unsupported logo MIME type:",e.logo);return}let v=`logo.${m}`;o.folder("imgs").file(v,u.split(",")[1],{base64:!0});let $=["192x192","256x256","384x384","512x512"],O=$.map(k=>({src:`../imgs/logo-${k}.png`,sizes:k,type:"image/png",purpose:"any"}));for(let k of $){let h=document.createElement("canvas");h.width=parseInt(k.split("x")[0]),h.height=parseInt(k.split("x")[1]);let S=h.getContext("2d"),P=new Image;P.src=u,P.onload=function(){S.drawImage(P,0,0,h.width,h.height);let X=h.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/,"");o.folder("imgs").file(`logo-${k}.png`,X,{base64:!0})},h.remove()}o.file("dist/manifest.json",JSON.stringify({theme_color:"#13171f",background_color:"#13171f",display:"standalone",start_url:"./index.html",lang:"en-US",name:e.name,short_name:e.name,description:e.description,icons:O},null,2))}catch(u){console.error("Error adding logo to ZIP:",u);return}e.css_pre_processor==="css"&&o.file("src/style.css",e.css),e.css_pre_processor==="css"&&o.file("dist/style.css",e.css),e.css_pre_processor==="stylus"&&o.file("src/style.styl",e.css),e.css_pre_processor==="stylus"&&o.file("dist/style.css",await M("css")),e.css_pre_processor==="less"&&o.file("src/style.less",e.css),e.css_pre_processor==="less"&&o.file("dist/style.css",iframe.contentDocument.getElementById("aeoibrfa1").textContent),e.css_pre_processor==="sass"&&o.file("src/style.scss",e.css),e.css_pre_processor==="sass"&&o.file("dist/style.css",await M("css")),e.javascript_pre_processor==="javascript"&&o.file("src/script.js",e.javascript),e.javascript_pre_processor==="javascript"&&o.file("dist/script.js",e.javascript),e.javascript_pre_processor==="babel"&&o.file("src/script.js",e.javascript),e.javascript_pre_processor==="babel"&&o.file("dist/script.js",await M("javascript")),e.javascript_pre_processor==="typescript"&&o.file("src/script.ts",e.javascript),e.javascript_pre_processor==="typescript"&&o.file("dist/script.js",await M("javascript")),e.javascript_pre_processor==="jsxtypescript"&&o.file("src/script.ts",e.javascript),e.javascript_pre_processor==="jsxtypescript"&&o.file("dist/script.js",await M("javascript"));let g="";if(e.pwa){g=`
    <script src="https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"><\/script>
    <script>
      // service worker for progressive web app
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./dist/sw.js')
        })
      }
    <\/script>`;let u=`// Service worker code
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;

const cacheName = '${e.name.split(" ").join("")}-cache';

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
);`;o.file("dist/sw.js",u)}let f="",I="";e.libraries.forEach(u=>{u.endsWith(".js")?f+=`<script src="${u}"><\/script>
    `:u.endsWith(".css")?I+=`<link rel="stylesheet" href="${u}">
          `:I+=`<link href="${u}" rel="stylesheet">
          `});let j=`<!DOCTYPE html>
<html lang="en" data-theme="${e.dark?"dark":"light"}">
  <head>
    <title>${e.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, interactive-widget=resizes-content">
    <meta name="description" content="${e.description}">
    <meta name="author" content="${e.author}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${e.title}">
    <meta name="theme-color" content="hsl(205deg 18.75% 87.45%)">
    <meta name="apple-mobile-web-app-title" content="${e.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="./index.html">
    <meta name="msapplication-navbutton-color" content="hsl(205deg 18.75% 87.45%)">
    <meta property="og:url" content="${e.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${e.title}" />
    <meta property="og:description" content="${e.description}" />
    <link rel="manifest" href="dist/manifest.json">
    <link rel="shortcut icon" type="image/x-icon" href="imgs/logo.svg">
    <link rel="icon" type="image/svg+xml" href="imgs/logo.svg" />
    <link rel="apple-touch-icon" href="imgs/logo.svg">
    ${I}${e.css?'<link rel="stylesheet" href="dist/style.css">':""}
    ${e.meta?`${e.meta}
  `:""}
    ${f||""}
  </head>
  <body>

${await M("html")}

${e.javascript?'<script src="dist/script.js"><\/script>':""}
${e.pwa?g:""}
  </body>
</html>`;if(e.html_pre_processor==="html"&&o.file("src/index.html",e.html),e.html_pre_processor==="html"&&o.file("index.html",j),e.html_pre_processor==="markdown"&&o.file("src/index.md",e.html),e.html_pre_processor==="markdown"&&o.file("index.html",j),e.html_pre_processor==="pug"&&o.file("src/index.pug",e.html),e.html_pre_processor==="pug"&&o.file("index.html",j),e.html_pre_processor==="jade"&&o.file("src/index.jade",e.html),e.html_pre_processor==="jade"&&o.file("index.html",j),s.length>0){let u=o.folder("audios");try{for(let m of s){let v=await L(m);u.file(m.substring(m.lastIndexOf("/")+1),v,{base64:!0})}}catch(m){console.error("Error adding audio to ZIP:",m);return}}if(t.length>0){let u=o.folder("imgs");try{for(let m of t){let v=await L(m);u.file(m.substring(m.lastIndexOf("/")+1),v,{base64:!0})}}catch(m){console.error("Error adding images to ZIP:",m);return}}if(r.length>0){let u=o.folder("svgs");try{r.forEach((m,v)=>{u.file(`vector-${v+1}.svg`,m)})}catch(m){console.error("Error adding images to ZIP:",m);return}}if(i.length>0){let u=o.folder("vids");try{for(let m of i){let v=await L(m);u.file(m.substring(m.lastIndexOf("/")+1),v,{base64:!0})}}catch(m){console.error("Error adding videos to ZIP:",m);return}}let D=await o.generateAsync({type:"blob"});saveAs(D,`${e.name.toLowerCase().split(" ").join("")}.zip`),t.length=s.length=i.length=0}catch(t){console.error("Error:",t)}finally{R(["libraries/jszip/FileSaver.min.js","libraries/jszip/jszip.min.js"])}}async function ve(){try{let t=e.javascript_pre_processor==="jsxtypescript"?d.compiledJSX:e.javascript,s=null;e.javascript_pre_processor==="jsxtypescript"||e.javascript_pre_processor==="javascript"?s="none":s=e.javascript_pre_processor;let r={title:e.title,description:e.description,head:e.meta,html:e.html,html_pre_processor:e.html_pre_processor==="html"?"none":"",css:e.css,css_pre_processor:e.css_pre_processor==="css"?"none":"",css_external:e.libraries.filter(n=>n.endsWith(".css")).join(";"),css_starter:"neither",css_prefix:"neither",js_module:e.module,js:t,js_pre_processor:s,js_external:e.libraries.filter(n=>n.endsWith(".js")).join(";"),editors:"111",layout:"left"},o=`
      <form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" value='${JSON.stringify(r).replace(/"/g,"&quot;").replace(/'/g,"&apos;")}'>
        <input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button">
      </form>`;document.body.insertAdjacentHTML("beforeend",o),document.querySelector("form").submit(),document.querySelector("form").remove()}catch(t){console.error("Error sharing project:",t)}}async function we(){let t=document.getElementById("iframe"),s=t.contentDocument||t.contentWindow.document;try{await _(["libraries/html2canvas/html2canvas.min.js","libraries/jszip/FileSaver.min.js"]),html2canvas(s.documentElement).then(r=>{let i=r.getContext("2d"),o=s.getElementsByTagName("video");Array.from(o).forEach(n=>{let{currentTime:a,paused:c,volume:l}=n;n.volume=0,c||n.pause(),i.drawImage(n,n.offsetLeft,n.offsetTop,n.clientWidth,n.clientHeight),n.volume=l,n.currentTime=a,c||n.play()}),r.toBlob(n=>{saveAs(n,"screenshot.png")},"image/png")}).catch(r=>{console.error("Error taking screenshot:",r)})}catch(r){console.error("Error:",r)}finally{T("../libraries/html2canvas/html2canvas.min.js"),T("../libraries/jszip/FileSaver.min.js")}}async function w(t=!1){if(!t&&!e.autorun||!d.safeRender)return;let s="",r="";e.libraries.forEach(g=>{g.endsWith(".js")?s+=`<script src="${g}"><\/script>
    `:g.endsWith(".css")?r+=`<link rel="stylesheet" href="${g}">
          `:r+=`<link href="${g}" rel="stylesheet">
          `});let i=await M("javascript"),o=await M("css");function n(){return e.javascript_pre_processor==="babel"?`<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
    <script type="text/babel" ${e.module?'data-type="module"':""}>${i}<\/script>`:`<script type="${e.module?"module":"text/javascript"}">${i}<\/script>`}let a=`
  .wrapper_yOR7u {
    ${e.console?"":"display: none!important;"}
    left: 0!important; width: 100%!important; 
    border-radius: 15px 15px 0 0!important; 
    z-index: 99999999;
  } 
  .btn_yOR7u {
    cursor: pointer; 
    background: inherit; 
    padding: 0 0.5rem; 
    margin: inherit; 
    margin-right: 0px; 
    border: inherit; 
    color: #fff!important; 
  } 
  .nav_yOR7u {
    padding-bottom: 14px!important;
  } 
  .line_yOR7u {
    background: inherit!important;
  }`,c=`<html data-theme="${e.dark?"dark":"light"}">
    <head>
      <title>${e.title}</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="${e.description}">
      <meta name="author" content="${e.author}">
      ${e.meta?e.meta:""}
      ${r}
      <style id="cuxjju3ew" type="text/${e.css_pre_processor==="none"||e.css_pre_processor==="stylus"||e.css_pre_processor==="sass"?"css":e.css_pre_processor}">
        ${a+o}
      </style>
      <script type="module" src="libraries/domconsole/dom-console.js" defer><\/script>
    </head>
    <body>
      ${await M("html")}
      ${s||""}
      ${e.css_pre_processor==="less"?'<script src="libraries/preprocessors/less.js"><\/script>':""}
    </body>
  </html>`,l=document.getElementById("iframe");if(!l)return;let y=new DOMParser().parseFromString(c,"text/html"),x=l.contentDocument||l.contentWindow.document;if(A.initialRender)return b("html",e.html_pre_processor),b("css",e.css_pre_processor),b("js",e.javascript_pre_processor),l.setAttribute("srcdoc",c),l.onload=()=>{let g=l.contentDocument||l.contentWindow.document,f=g.createElement("script");f.type=e.module?"module":"text/javascript",f.textContent=i,g.body.appendChild(f)},A.initialRender=!1,previousJavaScriptCode=i,!1;if(e.diffing||!t)return W(x.documentElement,y.documentElement),!1;l.setAttribute("srcdoc",c),l.onload=()=>{let g=l.contentDocument||l.contentWindow.document,f=g.createElement("script");f.type=e.module?"module":"text/javascript",f.textContent=i,g.body.appendChild(f)}}window.Modal=G;window.emptyStorage=re;window.addLibrary=ie;window.fetchSuggestions=ne;window.setPreprocessor=b;window.initializePreprocessors=Y;window.loadBeautifyLibraries=V;window.removeBeautifyLibraries=J;window.tidy=ae;window.generateId=le;window.resizeCanvas=ce;window.rotateCanvas=pe;window.defineScale=F;window.getIFrameClientSize=z;window.handleLogoChange=de;window.newProject=me;window.importProject=ge;window.downloadJSON=fe;window.downloadProject=be;window.share=ve;window.screenshot=we;window.renderPreview=w;function W(t,s){if(!t||!s||t.hasAttribute&&t.hasAttribute("data-ignore")||s.hasAttribute&&s.hasAttribute("data-ignore"))return;if(t.nodeName==="IFRAME"&&s.nodeName==="IFRAME"){["id","title","class","style","sandbox"].forEach(c=>{t.getAttribute(c)!==s.getAttribute(c)&&t.setAttribute(c,s.getAttribute(c))});let n=t.getAttribute("srcdoc"),a=s.getAttribute("srcdoc");return void 0}if(t.nodeName!==s.nodeName){t.replaceWith(s.cloneNode(!0));return}if(t.nodeType===Node.ELEMENT_NODE&&s.nodeType===Node.ELEMENT_NODE){let o=Array.from(t.attributes),n=Array.from(s.attributes);o.forEach(a=>{s.hasAttribute(a.name)||t.removeAttribute(a.name)}),n.forEach(a=>{t.getAttribute(a.name)!==a.value&&t.setAttribute(a.name,a.value)})}let r=Array.from(t.childNodes),i=Array.from(s.childNodes);r.forEach((o,n)=>{let a=i[n];if(!a){t.removeChild(o);return}t.tagName==="TITLE"||t.tagName==="STYLE"&&t.textContent!==s.textContent?t.textContent=s.textContent:o.nodeType===Node.TEXT_NODE&&o.nodeValue!==a.nodeValue&&(o.nodeValue=a.nodeValue),W(o,a)}),i.slice(r.length).forEach(o=>{t.appendChild(o.cloneNode(!0))})}document.addEventListener("DOMContentLoaded",function(){window.onload=()=>{A.render("#app"),initEditors(),Y(),z(),d.safeRender=!0,w(!0),localStorage.getItem("kodeWeave")&&setTimeout(function(){Q(JSON.parse(localStorage.getItem("kodeWeave")))},100)},window.onresize=()=>z()});})();
//# sourceMappingURL=App.js.map
