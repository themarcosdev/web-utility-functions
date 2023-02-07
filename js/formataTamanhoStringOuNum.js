	/** Função para formatar, reduzir uma string para um determinado tamanho ou número para um valor de casas informado,
	 *  importante considerar o '.' no números 
	 * 	@example 
	 * 		let texto = 'Apenas um teste 123 abc ';
	 * 		formataTamanhoStringOuNum(texto,15);
			r: 'Apenas um teste'
	 * 		let num = 4.1545645465456 ;
	 * 		formataTamanhoStringOuNum(num,4,'s') ; 
			r: 4.15 ; 
	 * */
	function formataTamanhoStringOuNum(stringOuNum, totalDeCasas, retornarComoNumero){
		possibilidadesRetornarComoNro = ['S','N'];

		if(!stringOuNum){
			return 'Informe uma string ou número para ser formatado ';
		}

		if(!totalDeCasas){
			return 'Informe o tamanho total de casas a formatar a string ou número ';
		}

		if(!retornarComoNumero){
			retornarComoNumero = 'N';
		}

		retornarComoNumero = retornarComoNumero.toLocaleUpperCase();

		if(!possibilidadesRetornarComoNro.includes(retornarComoNumero)){
			return 'Informe uma possibilidade válida de retorno como número, "S" ou "N" ';
		}

		stringOuNum = stringOuNum.toString();
		stringOuNum = stringOuNum.split('');
		stringOuNum.length = totalDeCasas ;
		stringOuNum = stringOuNum.join(''); 

		if(retornarComoNumero == 'S'){
			return +stringOuNum ;
		} else { 
			return stringOuNum ;
		}
	}
