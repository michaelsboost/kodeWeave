importJS = url => {
  let script = document.createElement("script");
  script.src = url;
  script.setAttribute("defer", "");
  document.head.appendChild(script);
};
importJS("js/libraries.js");
importJS("libraries/tailwind/tailwind.min.js");
// setTimeout(() => importJS("script.js"), 100);
setTimeout(() => importJS("bundle.js"), 100);