	/**
		@exemple : 
		imprimirElementoHTML(document.body,'impressao_teste') ;
		imprimirElementoHTML(document.getElementById('minhaDivComUmaTabela'),'impressao_teste') ;
	*/
	function imprimirElementoHTML(elemento, tituloDocumento) {
		if (!elemento) {
			return 'Infome o elemento a ser impresso';
		}

		if (!tituloDocumento) {
			return 'Infome o título do documento a ser impresso';
		}

		// Tamanhos do popup da minhaNovaJanela para impressão ;
		let h = screen.availHeight / 2;
		let w = screen.availWidth / 2;
		let left = (screen.width / 2) - (w / 2);
		let top = (screen.height / 2) - (h / 2);

		let minhaNovaJanela = window.open('', 'impressão', 'height=' + h + ',width=' + w + ',top=' + top + ', left=' + left);
		minhaNovaJanela.document.write(`<html>
						<head>
							<title>${tituloDocumento}</title>`);
		// Incluindo bootstrap e css na minhaNovaJanela ;
		// Copiando todos os stylesheets atuais da minha página para a nova ;
		let links = document.getElementsByTagName('link');
		let stylesheets = '';

		for (let i = 0; i < links.length; i++) {
			let link = links[i];
			if (link.rel === 'stylesheet') {
				stylesheets += (link.outerHTML);
			}
		}
		minhaNovaJanela.document.write(`
				${stylesheets}
		`);

		minhaNovaJanela.document.write(` </head>
						<body class="p-2">`);
		minhaNovaJanela.document.write(elemento.innerHTML);
		minhaNovaJanela.document.write(` </body>
						</html>
		`);
		minhaNovaJanela.document.close();

		setTimeout(() => {
			// Solicitando impressão obrigatória ao abrir minhaNovaJanela  ;
			minhaNovaJanela.print();
			//Fechando a janela automaticamente, após interação do user ;
			minhaNovaJanela.close();
		}, 1000);

	}
