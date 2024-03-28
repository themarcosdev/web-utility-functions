function findItemJsonPer(field, valueSearched, jsonData) {
    return jsonData.find(item => item[field] === valueSearched);
}

function updateJsonPer(field, valueSearched, json, newJson) {
    const index = json.findIndex(item => item[field] === valueSearched);
    if (index !== -1) {
        json[index] = Object.assign({}, json[index], newJson);
        return true;
    }
    return false;
}

function deleteJsonItemPer(field, searchedValue, json) {
    const index = json.findIndex(item => item[field] === searchedValue);
    if (index !== -1) {
        json.splice(index, 1);
        return true;
    }
    return false;
}
