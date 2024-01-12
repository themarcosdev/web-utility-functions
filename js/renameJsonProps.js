    /**
     * Generates a new array of JSON objects with renamed properties.
     *
     * @param {Array} jsonArray - The array of JSON objects to be modified.
     * @param {Array} renameArray - The array of objects containing the rename mappings.
     *
     * @return {Array} The modified array of JSON objects with renamed properties.
     * @example : 
        *  const jsonArray = [{ teste: 'marcos', pesox: 70 }, { teste: 'paulo', pesox: 79 }];
        *  const renameArray = [{ teste: 'nome' }, { pesox: 'peso' }];
     * @output : 
        [
            { nome: 'marcos', peso: 70 },
            { nome: 'paulo', peso: 79 }
        ]
     */
    function renameJsonProps (jsonArray, renameArray) {
        return jsonArray.map((jsonObj) => {
            return renameArray.reduce((acc, renameObj) => {
            const [propOnJson, newPropName] = Object.entries(renameObj)[0];
            acc[newPropName] = jsonObj[propOnJson];
            return acc;
            }, {});
        });
    }
