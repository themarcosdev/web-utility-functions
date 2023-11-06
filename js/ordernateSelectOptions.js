function ordernateSelectOptions(selectElement, order, attribute) {
    if (!['asc', 'desc'].includes(order)) {
        return false;
    }
    const options = Array.from(selectElement.options);

    if (attribute == 'value') {
        options.sort((a, b) => {
            if (order === 'asc') {
                return a.value.localeCompare(b.value);
            } else if (order === 'desc') {
                return b.value.localeCompare(a.value);
            }
        });

    } else if (attribute == 'textContent') {
        options.sort((a, b) => {
            if (order === 'asc') {
                return a.textContent.localeCompare(b.textContent);
            } else if (order === 'desc') {
                return b.textContent.localeCompare(a.textContent);
            }
        });

    } else {
        options.sort((a, b) => {
            if (order === 'asc') {
                return a.getAttribute(attribute).localeCompare(b.getAttribute(attribute));
            } else if (order === 'desc') {
                return b.getAttribute(attribute).localeCompare(a.getAttribute(attribute));
            }
        });

    }

    options.forEach(option => selectElement.appendChild(option));
}
