function objectToQueryString(obj) {
    let queryString = '';

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString !== '') {
                queryString += '&';
            }
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
        }
    }

    return `?${queryString}`;
}
