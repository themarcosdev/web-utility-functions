function findIndexInJson(json, prop, search) {
    let jsonIndexs = [];

    for (let i = 0; i < json.length; i++) {
        if (json[i][prop] === search) {
            jsonIndexs.push(i);
        }
    }

    return jsonIndexs;
}
