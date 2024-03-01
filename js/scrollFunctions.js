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

/**
 * Observes the scroll position on the given element and logs the scroll Y position and
 * percentage as the user scrolls.
 *
 * @param {type} element - the element to observe the scroll position on
 * @return {type} undefined
 * @example (document.querySelector('#modalId .modal-body'))
 */
function observeScrollYOnElement(element) {
    let lastScrollPosition = 0;

    const handleScroll = function() {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;

        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

        console.clear(); // clear console;

        console.log(`Scroll Y: ${scrollTop}`);
        console.log(`Scroll Percentage: ${scrollPercentage.toFixed(2)}%`);

        if (scrollPercentage >= 100) {
            console.log('End of page !');
            // Your validations at end of page ;
        }
    }

    element.addEventListener('scroll', handleScroll);
}
