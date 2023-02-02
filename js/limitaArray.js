function limitaArray(array,novoItem,tamMaxArray){
    if(!array){
        return 'informe o array';
    }
    if(!novoItem){
        return 'informe o novo item';
    }
    if(!tamMaxArray){
        return 'informe o tamanho máx. do array';
    }

    array = array.push(novoItem);
    if(array.length > tamMaxArray){
        array.shift();
    }

    return array;

}
