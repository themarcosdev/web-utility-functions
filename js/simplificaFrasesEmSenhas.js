  /**
    Função para minimizar uma frase pegando apenas suas iniciais para usa-las como um password ;
  */
  function simplificaFraseSenha(frase){
      if (!frase){
          return 'Informe uma frase';
      }
  
      frase = frase.split(' ');
  
      let retorno = [] ;
      for (let palavra of frase){
          retorno.push(palavra.charAt(0));
      }
  
      return retorno.join('');
  }
  
  simplificaFraseSenha('Apenas um teste do sistema de simplificação de senhas baseado em frase. Testando as features do sitema')
