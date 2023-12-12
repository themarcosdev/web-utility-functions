/**
  @example : findElementsWithCSSProperty('color', 'red');
*/
function findElementsWithCSSProperty(property, value) {
  const elements = document.querySelectorAll('*');
  const elementsWithCSSProperty = [];

  elements.forEach((element) => {
    const style = getComputedStyle(element);
    if (style[property] === value) {
      elementsWithCSSProperty.push(element);
    }
  });

  return elementsWithCSSProperty;
}
