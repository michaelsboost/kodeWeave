
# **kodeWeave**

_kodeWeave is your on-the-go coding playground!_

![kodeWeave](https://raw.githubusercontent.com/michaelsboost/kodeWeave/main/imgs/screenshot.png)

[![MIT License](https://img.shields.io/github/license/michaelsboost/kodeWeave)](LICENSE) [![GitHub Stars](https://img.shields.io/github/stars/michaelsboost/kodeWeave)](https://github.com/michaelsboost/kodeWeave/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/michaelsboost/kodeWeave)](https://github.com/michaelsboost/kodeWeave/issues)

----------

## **🚀 About kodeWeave**

kodeWeave is a **real-time coding playground** designed for developers, offering a feature-rich environment similar to **CodePen**, but with **built-in APIs**, **offline support**, and **PWA exportation**. It allows users to prototype apps, websites, and games quickly, whether on **mobile or desktop**, all without relying on external servers.

With **lightning-fast performance**, kodeWeave leverages **JavaScript Proxies, a custom Virtual DOM, and a diffing algorithm** to optimize speed and efficiency—delivering **Lighthouse scores unmatched by other coding playgrounds**.

----------

## **🌟 Features**

✅ **Live HTML, CSS, and JavaScript Editing** – Instant, real-time preview.  
✅ **Built-in APIs** – Easily import images, SVGs, and audio from Openverse and Iconify.  
✅ **Supports Popular Frameworks** – Start projects with React, Vue, Angular, TypeScript, Alpine, Solid, Preact, Mithril, Hyperapp, Aurelia, Lit, Knockout, Moon, Stimulus, and more.  
✅ **Client-Side Only** – No backend required; works entirely in the browser.  
✅ **Instant CSS Updates** – Changes in the CSS tab update the **style tag** directly in the preview without reloading the page, making styling interactive elements like modals seamless.  
✅ **PWA Export** – Convert your project into a fully functional **Progressive Web App (PWA)**.  
✅ **Offline-Ready** – Service workers ensure projects work offline.  
✅ **File Uploads to Base64** – Upload any file and instantly convert it to Base64.  
✅ **Virtual Device Preview** – View how your project looks on desktop and mobile.  
✅ **Code Tidy & Formatting** – Auto-format messy code with one click.  
✅ **Built-in Terminal** – See JavaScript errors in real-time.  
✅ **Light & Dark Mode** – Supports theme switching (also works in **PicoCSS** projects).  
✅ **JS, Babel, ES6 Support** – Work with modern JavaScript seamlessly.  
✅ **Emmet Integration** – Speed up HTML and CSS coding.  
✅ **Share to CodePen** – Export and share your project instantly.  
✅ **URL-Based Sharing** – Save and share projects via **Base64-encoded URLs**.  
✅ **Website Screenshot Tool** – Capture project previews with a single click.

----------

## **🛠️ Tech Stack**

kodeWeave uses a number of open-source projects to work properly:

-   **[CodeMirror v6](http://codemirror.net/)** – Powerful web-based text editor.
-   **[html2canvas](https://html2canvas.hertzen.com/)** – Capture screenshots in JavaScript.
-   **[JSZip](https://stuk.github.io/jszip/)** – Package ZIP files locally in JavaScript.
-   **[FileSaver.js](https://github.com/eligrey/FileSaver.js/)** – Allows local file saving in JavaScript (prebuilt with JSZip).
-   **[cdnjs](https://cdnjs.com/api)** – Enables easy addition of the latest libraries and frameworks via search.
-   **[Emmet](http://emmet.io/)** – CodeMirror plugin for Zen Coding.
-   **[Pico.css](https://picocss.com/)** and **[Tailwind CSS](https://tailwindcss.com/)** – Styles the application’s interface.
-   **[HeroIcons](https://heroicons.com/)** and **[Font Awesome](https://fontawesome.com/)** – Icon libraries used in the UI. _(Twitter logo icon was custom-designed.)_
-   **[Openverse API](https://docs.openverse.org/api/guides/documentation.html)** – Enables users to search for images and audio files for their weave.
-   **[Iconify API](https://iconify.design/docs/api/)** – Allows users to search and add vector graphics (SVGs) to their weave.

----------

## **📰 Featured On**

kodeWeave has been highlighted on several notable platforms:

- [**Web Designer Depot**](https://www.webdesignerdepot.com/5-essential-open-source-tools-for-web-designers/)  
- [**List Of Freeware**](https://listoffreeware.com/free-open-source-dreamweaver-alternative-software-windows/)  
- [**Bootstrap Dash**](https://www.bootstrapdash.com/blog/codepen-alternatives)  
- [**APTRON**](https://aptronnoida.in/blog/essential-open-source-tools-for-web-designers/)  
- [**Linux for Devices**](https://www.linuxfordevices.com/tutorials/linux/adobe-dreamweaver-alternatives)  

----------

## **📥 Installation & Setup**

kodeWeave is **fully web-based** – no installation needed. Try it now:  
➡️ [kodeWeave Online](https://michaelsboost.com/kodeWeave/go)

Or, to run locally:

### **Clone the Repository**

> git clone 
> https://github.com/michaelsboost/kodeWeave.git 
> cd kodeWeave` 

### **Start a Local Server**

To preview kodeWeave locally, use a simple Python server:

bash

> python3 -m http.server 8000` 

Then, open `http://localhost:8000` in your browser.

----------

## **📦 Exporting a PWA**

kodeWeave makes exporting a **Progressive Web App (PWA)** effortless.

### **Steps to Export a PWA:**

1.  Create your project in kodeWeave.
2.  Click **Export as PWA**.
3.  A ZIP file will be generated with:
    -   `index.html` (your project’s entry point)
    -   `sw.js` (service worker for offline support)
    -   `manifest.json` (PWA metadata)
    -   All necessary assets
4.  Extract and upload to your web server!

----------

## **⚡ Performance & Lighthouse Scores**

Unlike other coding playgrounds, kodeWeave achieves **top-tier performance** thanks to a custom **Virtual DOM & Diffing Algorithm** built with **JavaScript Proxies**.

### **Lighthouse Scores**

✅ **Performance:** `100`  
✅ **Accessibility:** `93`  
✅ **Best Practices:** `100`  
✅ **SEO:** `100`

![Lighthouse Scores](https://raw.githubusercontent.com/michaelsboost/kodeWeave/main/imgs/lighthouse.png)

----------

## **🎮 Projects Built with kodeWeave**

kodeWeave has been used to create powerful applications, including:

### **🎯 [Beacon Survival App](https://michaelsboost.com/Beacon)**

A **progressive survival application** designed to provide **offline survival knowledge**, built entirely with kodeWeave.

### 🏋️ [Rite Fitness Timer](https://michaelsboost.com/Rite)
A clean, minimalist fitness timer for interval training, workouts, stretching, and daily movement routines—adaptable to any fitness style.

### **📈 [Chart Dojo](https://michaelsboost.com/ChartDojo)**

Sharpen your **trader’s intuition** with this **interactive technical analysis dojo**, where **practice, consistency, and progression** forge real-world chart mastery.

[and many more...](https://michaelsboost.com/kodeWeave)

----------

## **📜 License**

kodeWeave is **open-source** under the **MIT License**.  
See the full license: [LICENSE](https://github.com/michaelsboost/kodeWeave/blob/main/LICENSE).

----------

## **💡 Want to Contribute?**

Awesome! kodeWeave is **free and open-source**, and contributions are always welcome.

### **How You Can Help:**

🔹 **Submit a Pull Request** – Found a bug? Have a feature idea? Let's build together!  
🔹 **Spread the Word** – Share kodeWeave with fellow developers & creators.  
🔹 **Fork & Experiment** – kodeWeave is yours to play with—have fun with it!

If kodeWeave has been helpful to you, here are some ways you can show support:

[![ko-fi](https://storage.ko-fi.com/cdn/useruploads/d666bcdd-8d38-47d4-b78b-018d4b726d48.png)](https://ko-fi.com/michaelsboost)

☕ **Buy me a coffee:** [ko-fi.com/michaelsboost](http://ko-fi.com/michaelsboost)  
🎨 **Grab some of my art prints:** [DeviantArt Store](https://deviantart.com/michaelsboost/prints)  
👕 **Get a kodeWeave T-shirt or gear:** [Merch Store](https://michaelsboost.com/gear)  
📚 **Check out my Graphic Design Course:** [Learn Design](https://michaelsboost.com/graphicdesign)  
🛒 **Register as a customer on my store:** [Visit Store](https://michaelsboost.com/store)  
💙 **Donate via PayPal:** [Support via PayPal](https://michaelsboost.com/donate)  
💸 **Donate via Cash App:** [Support via SquareCash](https://cash.me/$michaelsboost)

Your support helps keep kodeWeave free, open-source, and constantly improving. 🚀

----------

## **📧 Contact**

For questions, feature requests, or collaborations, reach out to:  
**Michael Schwartz** – [michaelsboost.com](https://michaelsboost.com/)
