	/**
	 * Função para encriptar ou decriptar uma string usando um token ;
	 * @param string string a ser encriptada ou decriptada ;
	 * @param token  token usado para encriptar ou decriptar uma string ;
	 * @param operacao encriptar || desencriptar ;
	 * @returns resultado ;
	 */
	function encriptaDesencriptaString(string, token, operacao) {
		const tokenArray = token.split('');
		let resultado = '';

		for (let i = 0; i < string.length; i++) {
			const char = string.charAt(i);
			const tokenChar = tokenArray[i % tokenArray.length];

			let novoChar;
			if (operacao === 'encriptar') {
				novoChar = String.fromCharCode(char.charCodeAt(0) + tokenChar.charCodeAt(0));
			} else if (operacao === 'desencriptar') {
				novoChar = String.fromCharCode(char.charCodeAt(0) - tokenChar.charCodeAt(0));
			} else {
				return 'Operação inválida';
			}

			resultado += novoChar;
		}

		return resultado;
	}
