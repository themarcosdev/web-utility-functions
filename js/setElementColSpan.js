function setElementColSpan (element) {
    if (!element) {
        return 'use a DOM element';
    }

    let table = element.closest('table');
    let heads  = table.getElementsByTagName('th');

    element.setAttribute('colspan',  heads.length);
}
