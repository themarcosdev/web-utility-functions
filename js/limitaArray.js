    let meuArray = [10,20,30];

    /** 
        função para acrescentar um novo item a um array e limita-lo a um tamanho máximo ;
        @example : 
        limitaArray(meuArray,40,3) ;
        limitaArray(meuArray,50,3) ;
        limitaArray(meuArray,60,3) ;
    */
    function limitaArray(array,itemNovoNoArray,tamMaxArray){
        if(!array){
            return `Informe um array `;
        }

        if(!itemNovoNoArray){
            return `Informe um novo item para o array `;
        }

        if(!tamMaxArray){
            return `Informe o tamanho máximo no array `;
        }

        /* Adicionado novo item ao final do array */
        array.push(itemNovoNoArray) ;
        /* Removendo o primeiro item do array para respeitar o tamMaxArray */
        if(array.length > tamMaxArray ){
            array = array.shift();
        }

        return array ;
    }

