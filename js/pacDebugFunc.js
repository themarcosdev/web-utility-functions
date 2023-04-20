  /** PACOTE DE FUNÇÕES EM JS QUE AJUDAM A DEBUGAR OUTRAS FUNÇÕES */	

  /** Função para obter todos os nomes de funções da janela */
	function obterNomesDeFuncoes() {
		const nomesDeFuncoes = [];
		const propriedades = Object.getOwnPropertyNames(window);
		for (let i = 0; i < propriedades.length; i++) {
			const propriedade = propriedades[i];
			if (typeof window[propriedade] === 'function') {
				nomesDeFuncoes.push(propriedade);
			}
		}
		return nomesDeFuncoes;
	}

	/** Função para retornar um array com todas as funções customizadas da janela */
	function pegarFuncoesCustomizadas() {
		const todasPropDaJanela = Object.getOwnPropertyNames(window);
		const funcoesCustomizadas = todasPropDaJanela.filter(property => {
			const eFuncao = typeof window[property] === 'function';
			const eNativa = /\{\s*\[native code\]\s*\}/.test(String(window[property]));
			return eFuncao && !eNativa
		});
		return funcoesCustomizadas;
	}

	/** 
	 * Recebe um array com nomes de funções como parâmetro rescreve e debugar funções,
	 * sempre que uma função do array for chamada será informado quem chamou a função,
	 *  */
	function informeDebugFuncJS(arrayDeFuncoes) {
		arrayDeFuncoes.forEach(function (funcao) {
			if (window[funcao]) {
				var funcaoOriginal = window[funcao];
				window[funcao] = function () {
					let nomeInvocador = '';
					if (arguments.callee.caller) {
						nomeInvocador = arguments.callee.caller.name;
					} else {
						nomeInvocador = 'instância direta';
					}
					let nomeOrig = funcaoOriginal.name || funcao;
					console.warn("informeDebugFuncJS : " + nomeOrig + "() foi chamada por " + nomeInvocador);
					return funcaoOriginal.apply(this, arguments);
				};
			}
		});
	}
