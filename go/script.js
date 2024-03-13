let project = {
  settings: {
    console: false,
  },
  title: "An attractive title",
  description: "The most attractive description ever!",
  meta: ``,
  markdown: ``,
  html: `<div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-8">
<img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
<div class="px-6 py-4">
<div class="font-bold text-xl mb-2">The Coldest Sunset</div>
<p class="text-gray-600 text-base">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
</p>
</div>
<div class="px-6 py-4">
<span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#photography</span>
<span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#travel</span>
<span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">#winter</span>
</div>
</div>`,
  css: ``,
  javascript: ``
};

const app = {
  appName: "kodeWeave",
  appVersion: "1.1.43",
  appUrl: "https://github.com/michaelsboost/kodeWeave/tree/main",
  appLicense: "https://github.com/michaelsboost/kodeWeave/blob/main/LICENSE",
  libraries: [],

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
        app.libraries.push(url);
        // Clear the suggestions list
        suggestionsList.innerHTML = "";
        // Display the libraries display
        app.displayLibrariesArray();
        searchBox.value = "";
      };
      suggestionsList.appendChild(listItem);
    });
  },
  displayLibrariesArray: () => {
    const librariesArray = app.libraries;
    let sortLibrariesContainer = document.getElementById("sortLibraries");
    sortLibrariesContainer.innerHTML = "";
    const embedArray = (result, index) => {
      const newNav = document.createElement("nav");
      newNav.className = "flex justify-between py-2";
      newNav.setAttribute("data-index", index);

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
      };

      const deleteButton = document.createElement("button");
      deleteButton.className =
        // "delete-button p-3 bg-red-400 rounded-md rounded-l-none";
        "delete-button p-3 bg-gray-800 rounded-md rounded-l-none";
      deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
      deleteButton.onclick = () => {
        // Remove the library from the array by its index
        app.libraries.splice(index, 1);
        // Re-render the libraries array
        app.displayLibrariesArray();
      };

      newNav.appendChild(newInput);
      newNav.appendChild(deleteButton);
      sortLibrariesContainer.appendChild(newNav);
    };

    // Embed each library into a new input field and delete button
    librariesArray.forEach((input, index) => {
      embedArray(librariesArray[index], index);
    });

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
	},

  // toggle top nav
  toggleTopNav: e => {
    const inactiveClass = "capitalize border-0 mx-2 px-2 py-2 bg-transparent border-solid border-white border-0";
    const activeClass = "capitalize border-0 mx-2 px-2 py-2 bg-transparent border-solid border-blue-500 border-b text-blue-500";

    const hideDivs = () => {
      document.querySelectorAll('[data-topNavContent]').forEach(elm => {
        elm.classList.add('hidden');
      });
      document.querySelectorAll(`[data-openTop]`).forEach(btn => {
        btn.className = inactiveClass;
      });
    };
  
    const openTopNav = element => {
      hideDivs();
      element.className = activeClass;
      document.querySelector(`[data-topNavContent=${e}]`).classList.remove('hidden');
    };
  
    // Only shows main side navigation
    document.querySelectorAll(`[data-openTop=${e}]`).forEach((btn, i) => {
      btn.onclick = () => {
        openTopNav(document.querySelectorAll(`[data-openTop=${e}]`)[i]);
        if (e === "iframe") {
          iframenav.classList.remove('hidden');
        } else {
          iframenav.classList.add('hidden');
        }
      };
    });
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

  // toggle settings
  initSettings: () => {
    document.getElementById("projectTitle").value = project.title;
    document.getElementById("projectDesc").value  = project.description;
    document.getElementById("projectMeta").value  = project.meta;
  },
  
  // Function to update previews
  updatePreview: () => {
    const generateHtmlCode = () => {
      const tailwindStyle =
        ".wrapper_yOR7u {left: 0!important; width: 100%!important; border-radius: 15px 15px 0 0!important; z-index: 99999999;} .btn_yOR7u { cursor: pointer; background: inherit; padding: 0 0.5rem; margin: inherit; margin-right: 0px; border: inherit; color: #fff!important; } .nav_yOR7u {padding-bottom: 14px!important;} .line_yOR7u {background: inherit!important;}";
      const consoleStyle = `<style>${tailwindStyle}</style>`;
      const addConsoleCSS = project.settings.console ? consoleStyle : "";
      const showConsole = project.settings.console
        ? `<script type="module" src="js/dom-console.js" defer></script>`
        : "";

      // render html
      return `<!DOCTYPE html>
<html>
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${project.description}">
    ${addConsoleCSS}
    ${showConsole}
  </head>
  <body>
    ${project.html}
    
    <script>
      setTimeout(() => console.log('hello 👋'), 100);
    </script>
  </body>
</html>`;
    };

    // Clear existing content in the preview element
    previewElm.innerHTML = "";

    // Create iframe and set attributes
    const frame = document.createElement("iframe");
    frame.className = "w-full h-full";
    frame.setAttribute("id", "preview");
    frame.setAttribute("title", "test");
    frame.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups"
    );

    // Append iframe to the preview element
    previewElm.appendChild(frame);

    // Get the content document of the iframe
    const previewFrame = document.getElementById("preview");
    const previewDoc =
      previewFrame.contentDocument || previewFrame.contentWindow.document;

    // Open, write HTML code, and close the content document
    previewDoc.open();
    previewDoc.write(generateHtmlCode());
    previewDoc.close();
  },
  
  // Exports zip file
  exportZip: () => {
    let zip = new JSZip();
    
    // Iterate over each library
    app.libraries.forEach(library => {
      app.getFile(library, data => {
        // Get the name of the library file from its URL
        let parts = library.split("/");
        let name = parts[parts.length - 1];
  
        // Add the downloaded file to the zip archive
        zip.file(name, data);
  
        // Check if all files are added, then generate and download the zip file
        if (Object.keys(zip.files).length === app.libraries.length) {
          let content = zip.generate({ type: "blob" });
          saveAs(content, `libraries-${new Date().getFullYear()}.zip`);
        }
      });
    });
  },

  // Initiate function
  init: () => {
    // Place app name and version
    document.getElementById("appName").textContent = app.appName;
    document.getElementById("appVersion").textContent = app.appVersion;
    document.getElementById("appUrl").href = app.appUrl;
    document.getElementById("appLicense").href = app.appLicense;
    
    // Place project meta data
    document.getElementById("projectTitle").value = project.title;
    document.getElementById("projectDesc").value = project.description;
    document.getElementById("projectMeta").value = project.meta;
    app.initSettings();

    // init toggle top navigation
    app.toggleTopNav('iframe');
    document.querySelector("[data-openTop=iframe]").onclick();

    // init toggle settings for side nav
    app.toggleSideNav('settings');

    // toggle menu
    menu.onchange = () => {
      document.querySelector('label[for=menu]').classList.toggle('text-blue-500');
      sidenav.classList.toggle('hidden');
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
    
    // init live preview
    app.updatePreview();
    
    // init zooming and panning
    app.initZoomPan();
    
    // toggle console
    toggleconsole.onchange = () => {
      project.settings.console = toggleconsole.checked;
      app.updatePreview();
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
  }
};

// check if FileReader API is available
if (!window.FileReader) {
  alert("File API & FileReader API not supported!");
}

app.init();