function toggleAccordion (accordionId, action) {
    if (!accordionId) {
        return false;
    }

    if (!['show', 'hide', 'toggle'].includes(action)) {
        return 'Invalid action';
    }

    const accordionButton = document.querySelector(`#${accordionId} button.accordion-button`);
    const accordionCollapse = document.querySelector(`#${accordionId} div.accordion-collapse`);

    if (accordionButton && accordionCollapse) {
        if (action === 'show') {
            accordionButton.setAttribute('aria-expanded', 'true');
            accordionCollapse.classList.add('show');
        } else if (action === 'hide') {
            accordionButton.setAttribute('aria-expanded', 'false');
            accordionCollapse.classList.remove('show');
        } else {
            const isCollapsed = accordionButton.getAttribute('aria-expanded') === 'false';
            accordionButton.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
            accordionCollapse.classList.toggle('show', isCollapsed);
        }
    }
}
