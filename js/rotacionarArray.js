  let meuArray = [1,2,3,4,5] ;
  /**
    @example : rotacionarArray(meuArray,'direita');
  */
  function rotacionarArray(array, sentido) {
    if (sentido == 'direita') { 
        const ultimoElemento = array.pop();
        array.unshift(ultimoElemento);
        return array;
    } else if (sentido == 'esquerda') {
        const primeiroElemento = array.shift();
        array.push(primeiroElemento);
        return array;
    } else {
        return 'Sentido inválido informe, direita ou esquerda' ;
    }
  }
