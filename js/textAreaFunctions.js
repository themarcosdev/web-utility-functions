/**
 * Expands the height of a textarea element to fit its content.
 *
 * @param {HTMLTextAreaElement} textarea - The textarea element to expand.
 */
function expandTextarea(textarea) {
    textarea.style.height = 'auto'; 
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

/**
 * Retrieves information about the listeners attached to an element.
 *
 * @param {Element} element - The element to retrieve listeners from.
 * @return {Object} An object containing information about the listeners.
 */
function getListenersInfo(element) {
    let listeners = getEventListeners(element);

    let ret = {};
    for (let eventType in listeners) {
        for (let listener of listeners[eventType]) {
            ret.eventType = eventType;
            ret.listener  = listener.listener;
        };
    }

    return ret;
}

/**
 * Gets all the text areas on the page and expands them now or when they receive input.
 *
 * @param {Array} custumElements - an optional array of custom elements
 * @param {boolean} expandAllNow - a flag indicating whether to expand all text areas immediately
 * @param {boolean} expandOnInput - a flag indicating whether to expand text areas on input
 * @return {boolean} true if text areas were found and processed, false otherwise
 * 
 * @example getTextAreasAndExpand(null, true, true);
 */
function getTextAreasAndExpand(custumElements, expandAllNow, expandOnInput){
    let textAreas = null ;
    if (custumElements) {
        textAreas = custumElements;
    } else {
        textAreas = document.getElementsByTagName('textarea');
    }

    if (!textAreas || textAreas.length == 0) {
        return false ;
    }

    for (let item of textAreas) {
        if (expandAllNow == true) {
            expandTextarea(item);
        }

        if (expandOnInput == true) {
            item.addEventListener('input', ()=>{
                if (isScrollYVisible(item)){
                    expandTextarea(item);
                }
            });
        }
    }
}

/**
 * Checks if the scrollable element's vertical scrollbar is visible.
 *
 * @param {Object} scrollableElement - The element to be checked.
 * @return {boolean} Returns true if the vertical scrollbar is visible, false otherwise.
 * 
 * @example isScrollYVisible(document.getElementById('myTextAreaId'));
 */
function isScrollYVisible(scrollableElement) {
    return scrollableElement.scrollHeight > scrollableElement.clientHeight;
}
