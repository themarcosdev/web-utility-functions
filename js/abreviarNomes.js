	/**
	 * Função para abreviar um nome
	 * @author Marcos T. de L. Coelho ;
	 * @param {*} nome nome a ser abreviado ; 
	 * @param {*} tamanhoMax  tamanho máximo que é esperado que o nome seja abreviado ;
	 * @param {*} reducaoAoTamMax parâmetro para forçar um nome a ser abreviado (S | N) ;
	 * @returns 
	 */
	function abreviarNomes(nome, tamanhoMax, reducaoAoTamMax) {
		/* Declarações e validações */
		let nomeAbreviado = null;
		let nomesAbreviados = [];
		let nomes = [];

		if (!nome) {
			return 'Informe um nome !';
		}

		if (!tamanhoMax) {
			tamanhoMax = 30;
		}

		if (!reducaoAoTamMax || reducaoAoTamMax != "S") {
			reducaoAoTamMax = 'N';
		}

		nome = nome.trim();

		nome = nome.toLocaleUpperCase();

		/* Abreviando o nome, pode ocorrer do nome e sobrenome serem muito grandes e passarem o tamanhoMax*/
		if (nome.length >= tamanhoMax) {
			let posNome = 0;
			nomes = nome.split(' ');
			nomeAbreviado = nomes[0];
			let nomesAbreviadosIgnorados = ["DA", "DAS", "DE","DO", "DOS", "E", "&"];
			let totalNomes = nomes.length - 1;
			for (nome of nomes) {
				if (posNome > 0 && posNome < totalNomes) {
					if (!nomesAbreviadosIgnorados.includes(nome)) {
						if (!(+nome.match(/\d+/g))) {
							nomeAbreviado += ' ' + nome.split('')[0] + '.';
						}
					}
				}

				posNome++;
			}

			nomeAbreviado += ' ' + nomes[totalNomes];

		}

		/* Forçando redução do nome ao tamanho solicitado */
		if (nomeAbreviado && reducaoAoTamMax == 'S') {
			nomesAbreviados = nomeAbreviado.split(' ');
			let tnomesabrev = nomesAbreviados.length;

			for (let i = 0; i < tamanhoMax; i++) {
				if (i > 0 && i < tnomesabrev) {
					if (nomeAbreviado.length > tamanhoMax) {
						nomeAbreviado = nomeAbreviado.replace(new RegExp(nomesAbreviados[i], 'g'), '');
					}
				}
			}

			nomeAbreviado = nomeAbreviado.replace(/\s+/g, ' ').trim();

		}

		/* Retornando nome abreviado ou falha */
		if (nomeAbreviado && reducaoAoTamMax && nomeAbreviado.length > tamanhoMax && reducaoAoTamMax == 'S') {
			return 'Falha: não foi possível reduzir o nome';
		} else {
			return nomeAbreviado ?? nome ;
		}
	}
