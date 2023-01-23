  /**
    Esta função recebe um JSON o e usa o itens do json como parâmetro ;
    Traz a vantagem de informar um parâmetro independente da ordem informada ;
    @example :
     * let json = {param1:'abc',param2:'123'}  ;
     * let json2 = {param2:'123',param1:'abc'} ;
     
     * recebeJson(json) ;
     * recebeJson(json2) ;
  */
  function recebeJson(params){
        if(!params){
            return 'informe os parâmetros para essa função';
        }

        if(!params.param1){
            return 'informe o parâmetro param1';
        }

        if(!params.param2){
            return 'informe o parâmetro param2';
        }
        
        return `Esta função recebeu o parametro 1 : ${params.param1}
                e o parametro 2 : ${params.param2}
        `
    }
