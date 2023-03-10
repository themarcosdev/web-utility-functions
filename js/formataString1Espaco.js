  /**
    Esta função corta todos os espaços desnecessários entre uma string ;
    @example : 
    let stringTeste = 'Este   é   apenas um teste    da função' ;
    formata1espaco(stringTeste);
  */
  function formataString1Espaco(string){
        if(!string){
            return 'Informe uma string';
        }

        let retorno = [];

        string = string.split(" ");
        for(let i = 0 ; i < string.length ; i++){
            if(string[i] !== ''){
                string[i] = string[i].trim();
                retorno.push(string[i]);
            }
        }

        retorno = retorno.join(' ');

        return retorno
    }

  /**
     Função que remove todos os espaços excedentes entre palavras , mantendo apenas 1 único espaço entre palavras (usando regex)
     @example :
     let texto = 'Este   é   apenas um teste    da função' ;
    espacoUnico(texto);
  */
  function espacoUnico(texto){
      return  texto.replace(/\s+/g, ' ');
  }
