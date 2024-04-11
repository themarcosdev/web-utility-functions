      /**
        examples : 
        alterCSS(document.getElementById('myStyleCss'), '#myId', 'padding', '8px');
        alterCSS(document.getElementById('myStyleCss'), '.tag', 'padding', '10px');
        alterCSS(document.getElementById('myStyleCss'), 'body', 'background-color', 'red');
      */
      function alterCSS(styleCssElement, itemQuery, prop, value) {
          let time = performance.now();
          const styleTag = styleCssElement;

          if (styleTag && styleTag != 'createElementStyle' && typeof styleTag == 'object') {
              let cssContent = styleTag.innerHTML;

              // Regex to find a css prop on itemQuery :
              const regex = new RegExp(`(${itemQuery}\\s*\\{[^}]*${prop}\\s*:\\s*)([^;}]+)([^}]*\\})`);

              // Verify if prop css exists into itemQuery :
              if (cssContent.match(regex)) {
                  // Change the value from prop css
                  cssContent = cssContent.replace(regex, `$1${value}$3`);
              } else {
                  // Add a prop css to itemQuery
                  cssContent += `${itemQuery} { ${prop}: ${value}; }`;
              }

              styleTag.innerHTML = cssContent;
          } else if (styleCssElement == 'createElementStyle') {
              styleCssElement = document.createElement('style');
              styleCssElement.setAttribute('type', 'text/css');
              styleCssElement.setAttribute('id', 'css' + new Date().getTime());

              let cssContent = null ;
              cssContent = `${itemQuery} { ${prop}: ${value}; }`;
              styleCssElement.innerHTML = cssContent;

              document.body.appendChild(styleCssElement);

          } else {
              return 'Element css not found';
          }

          console.log('time to alterCss : ' + (performance.now() - time));
      }

      /**
        exportCSSElementToJson(document.getElementsByTagName('style')[0]);
      */
      function exportCSSElementToJson(styleElement) {
          const cssText = styleElement.textContent;
          const rules = cssText.split("}");
      
          const cssJson = [];
          
          rules.forEach(rule => {
              if (rule.trim().length === 0) return;
              
              const parts = rule.split("{");
              const itemQuery = parts[0].trim();
              const props = parts[1].split(";");
      
              props.forEach(prop => {
                  if (prop.trim().length === 0) return;
      
                  const propParts = prop.split(":");
                  const property = propParts[0].trim();
                  const value = propParts[1].trim();
                  
                  cssJson.push({
                      styleCssOrigin : styleElement,
                      itemQuery,
                      prop: property,
                      value
                  });
              });
          });
      
          return cssJson;
      }
