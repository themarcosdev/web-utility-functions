class TabelaJSON {
    /**
     * Função para criar um tabela HTML que comporte um json regular ou irregular ;
     * @param {*} objeto JSON selecionado ;
     * @param {*} orientacao horizontal | vertical ;
     * @returns {*} tabela : string ;
     */
    criarTabela(objeto, orientacao) {
        // Verifica a orientação
        if (orientacao === 'horizontal') {
            return this.criarTabelaHorizontal(objeto);
        } else if (orientacao === 'vertical') {
            return this.criarTabelaVertical(objeto);
        }
        return 'Informe um orientação válida, vertical ou horizontal';
    }

    /**
     * Função para criar um tabela em que seus ths são ordenados verticalmente ;
     * @param {*} objeto JSON selecionado ;
     * @returns {*} tabela : string ;
     */
    criarTabelaVertical(objeto) {
        let tabela = '<table class="table border p-1">';

        for (let chave in objeto) {
            tabela += '<tr>';

            tabela += '<th class="border p-1">' + chave + '</th>';

            if (typeof objeto[chave] === 'object') {
                let tabelaInterna = this.criarTabelaVertical(objeto[chave]);

                tabela += '<td class="border p-1">' + tabelaInterna + '</td>';
            } else {
                tabela += '<td class="border p-1">' + objeto[chave] + '</td>';
            }

            tabela += '</tr>';
        }

        tabela += '</table>';

        return tabela;
    }

    /**
     * Função para criar um tabela em que seus ths são ordenados horizontalmente ;
     * @param {*} objeto JSON selecionado ;
     * @returns {*} tabela : string ;
     */
    criarTabelaHorizontal(objeto) {
        let tabela = '<table class="table border p-1">';

        tabela += '<tr>';

        for (let chave in objeto) {
            tabela += '<th class="border p-1">' + chave + '</th>';
        }

        tabela += '</tr>';

        tabela += '<tr>';

        for (let chave in objeto) {
            if (typeof objeto[chave] === 'object') {
                let tabelaInterna = this.criarTabelaHorizontal(objeto[chave]);

                tabela += '<td class="border p-1">' + tabelaInterna + '</td>';
            } else {
                tabela += '<td class="border p-1">' + objeto[chave] + '</td>';
            }
        }

        tabela += '</tr>';

        tabela += '</table>';

        return tabela;
    }

}

/** ex : Criando Instância da classe TabelaJSON, escolhendo uma div pai que seu html interno vai receber a tabela */
let tabJson = new TabelaJSON();
document.getElementById('divPaiDaTabela').innerHTML = tabJson.criarTabela(meuJson,'horizontal');
