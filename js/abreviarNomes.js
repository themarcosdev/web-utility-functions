/**
 * Função para abreviar um nome
 * @author Marcos T. de L. Coelho ;
 * @param {*} nome nome a ser abreviado ;
 * @param {*} tamanhoMax  tamanho máximo que é esperado que o nome seja abreviado ;
 * @param {*} reducaoAoTamMax parâmetro para forçar um nome a ser abreviado (S | N) ;
 * @see https://github.com/themarcosdev/funcoes-utilidades-web/blob/main/js/abreviarNomes.js
 * @returns
 */
function abreviarNomes(nome, tamanhoMax, reducaoAoTamMax) {
    /* Declarações e validações */
    let nomeAbreviado   = null;
    let nomesAbreviados = [];
    let nomes           = [];

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
        let posNome                  = 0;
        nomes                        = nome.split(' ');
        nomeAbreviado                = nomes[0];
        let nomesAbreviadosIgnorados = ["DA", "DAS", "DE", "DO", "DOS", "E", "&"];
        let totalNomes               = nomes.length - 1;
        for (nome of nomes) {
            if (posNome > 0 && posNome < totalNomes) {
                if (!nomesAbreviadosIgnorados.includes(nome)) {
                    if (!(+nome.match(/\d+/g))) {
                        nomeAbreviado += ' ' + nome.charAt(0) + '.';
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
                    nomeAbreviado = nomeAbreviado.replace(/nomesAbreviados[i]/g, (i => m => !i++ ? m : '')(0));
                }
            }
        }
        nomeAbreviado = nomeAbreviado.replace(/\s+/g, ' ').trim();
    }

    let nomeFinal = nomeAbreviado ?? nome;
    if (nomeAbreviado && reducaoAoTamMax && nomeAbreviado.length > tamanhoMax && reducaoAoTamMax == 'S') {
        return nomeFinal.substring(0, tamanhoMax);
    } else {
        return nomeFinal;
    }
}
