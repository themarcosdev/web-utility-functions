/**
 * Function to receive a DOM element and traverse its children applying values to them based on a JSON
 * that relies on the ids of each found child;
 * @param {*} element 
 * @param {*} jsonParams 
 */
window.restoreFormFromJson = function(element, jsonParams) {
    const processElement = function(el) {
        if (el.id && jsonParams.hasOwnProperty(el.id)) {
            el.value = jsonParams[el.id];
        }

        let children = el.children;
        for (let i = 0; i < children.length; i++) {
            processElement(children[i]);
        }
    }

    if (element && jsonParams) {
        processElement(element);
    }
}

/**
 * Export as JSON the data from a form or div in the HTML that contains internal elements with id and value property;
 * @param {*} element 
 * @returns 
 */
window.saveFormAsJson = function(element) {
    const formData = {};

    const processElement = function(el) {
        if (el.id && el.value !== undefined) {
            formData[el.id] = el.value;
        }

        let children = el.children;
        for (let i = 0; i < children.length; i++) {
            processElement(children[i]);
        }
    }

    if (element) {
        processElement(element);
    }

    return formData;
}
