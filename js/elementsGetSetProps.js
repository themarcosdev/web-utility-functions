function getElementProperties(element) {
    const properties = {};

    const attributes = element.attributes;
    for (const attribute of attributes) {
        const attributeName = attribute.name;
        const attributeValue = attribute.value;
        properties[attributeName] = attributeValue;
    }

    return properties;
}

function setElementProperties(element, properties) {
    for (let propertyName in properties) {
        element.setAttribute(propertyName, properties[propertyName]);
    }
}
