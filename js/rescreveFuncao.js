/** Função para rescrever outra função em uma página 
    nomeDaFuncaoASerReescrita = nome da função que será rescrita ;
    novaDeclaracaoDaFuncao = objeto com os itens da funcao. 
     - ex : novaDeclaracaoDaFuncao.parametros = 'parametro1';
     - ex : novaDeclaracaoDaFuncao.corpo = 'console.log(`Parametro : ${parametro1}`)';
*/
	function funcaoDeReEscrita(nomeDaFuncaoASerReescrita, novaDeclaracaoDaFuncao) {
		/* caiu na msg de erro e não devolveu um objeto */
		if(typeof novaDeclaracaoDaFuncao === "string"){
			console.log(novaDeclaracaoDaFuncao)
			return novaDeclaracaoDaFuncao;
		}

		let parametros = novaDeclaracaoDaFuncao.parametros;
		let corpo = novaDeclaracaoDaFuncao.corpo;

		if(parametros.includes(",")){
			parametros = parametros.split(',');
		}

		if(!parametros && !corpo){
			return 'Erro !';
		}

		window[nomeDaFuncaoASerReescrita] = new Function(parametros, corpo);
	}
