/**
 * @example : addScrollToTopButton(document.querySelector('#modald .modal-body'));
*/
function addScrollToTopButton (element) {
    // Create the button
    const scrollToTopButton          = document.createElement('button');
    scrollToTopButton.innerHTML      = '↑';
    scrollToTopButton.style.zIndex   = '999999999';
    scrollToTopButton.style.position = 'fixed';
    scrollToTopButton.style.right    = '25px';
    scrollToTopButton.style.display  = 'none';
    scrollToTopButton.style.top      = `${window.screen.availHeight * 0.82}px`;
    /*
    For Bootstrap button customization :
    scrollToTopButton.classList.add('btn');
    scrollToTopButton.classList.add('rounded-5');
    scrollToTopButton.classList.add('bg-light');
    scrollToTopButton.classList.add('text-primary');
    */
    scrollToTopButton.title = 'Return to top';

    // Add the button to the element
    element.appendChild(scrollToTopButton);

    // Add a listener to scroll to the top when the button is clicked
    scrollToTopButton.addEventListener('click', () => {
        console.log('Clicked on the scroll to top button!');
        element.scrollTo({
        top: 0,
        behavior: 'smooth' // For smooth scrolling if supported by the browser
        });
    });

    // Add a listener to show or hide the button based on scroll
    element.addEventListener('scroll', () => {
        const percentScrolled = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;

        if (percentScrolled > 5 && document.getElementById('divOutputDados').getBoundingClientRect().width > 100) {
            scrollToTopButton.style.display = '';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
}
