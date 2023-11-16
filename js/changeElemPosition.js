function changeElemPosition(elem1, elem2) {
    if (!elem1 || !elem2 || elem1.tagName != elem2.tagName) {
        return false;
    }

    properties1 = elem1.innerHTML;
    properties2 = elem2.innerHTML;

    elem2.innerHTML = properties1;
    elem1.innerHTML = properties2;
}
