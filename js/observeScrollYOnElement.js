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
