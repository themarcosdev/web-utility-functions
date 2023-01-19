  /** 
      Função que gera um array baseado em um placeholder

      @example
      preencheArrays(3,{abc:123});
      preencheArrays(5,'abc');
  */
  function geraArraysDePlaceholder(tamanho,item){
      if(!tamanho){
          return 'Informe o tamanho do array' ;
      }

      if(!item){
          return 'Informe o item que será retornado no array' ;
      }

      const tamanhoArray = tamanho;
      const arrayPreenchido = Array(tamanhoArray).fill(item);

      return arrayPreenchido;

  }
