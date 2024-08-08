document.addEventListener('DOMContentLoaded', function() {
    // Select all script tags with type="text/typescript"
    const tsScripts = document.querySelectorAll('script[type="text/typescript"]');
  
    tsScripts.forEach(script => {
      let tsCode = '';
      if (script.src) {
        // If the script has a src attribute, fetch the TypeScript code
        fetch(script.src)
          .then(response => response.text())
          .then(data => {
            tsCode = data;
            compileAndExecute(tsCode);
          })
          .catch(error => console.error('Error fetching TypeScript file:', error));
      } else {
        // Otherwise, use the inline TypeScript code
        tsCode = script.textContent;
        compileAndExecute(tsCode);
      }
    });
  
    function compileAndExecute(tsCode) {
      // Detect if the TypeScript code uses modules
      const usesModules = tsCode.includes('import ') || tsCode.includes('export ');
  
      // Compile the TypeScript code to JavaScript
      const jsCode = ts.transpile(tsCode, {
        compilerOptions: {
          module: usesModules ? ts.ModuleKind.ESNext : ts.ModuleKind.None,
        }
      });
  
      // Create a new script element and add the compiled JavaScript code
      const jsScript = document.createElement('script');
      jsScript.type = 'text/javascript';
      jsScript.textContent = jsCode;
      document.body.appendChild(jsScript);
    }
  });