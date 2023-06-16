  /**
   * Função para escrever um número por extenso
   * @param {number} numero
   * @return {string}
   */
  function numPorExtenso(numero) {
    if (!isNaN(parseFloat(numero)) && !isFinite(numero)) {
      return "Informe um Nro válido";
    }
    var maxNro = "999999999999999999999"; // 999 quintilhões ;
    if (numero > maxNro) {
      return "Nro muito grande, limite de (" + maxNro + ") (999 quintilhões) !!! ";
    }
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze',
      'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const centenas = ['', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos',
      'oitocentos', 'novecentos'];
    const milhares = ['', 'mil', 'milhões', 'bilhões', 'trilhões', 'quatrilhões', 'quintilhões'];
    let extenso = '';
    if (numero == 0) {
      extenso = 'zero';
    } else {
      let milhar = 0;
      while (numero > 0) {
        const parte = numero % 1000;
        if (parte > 0) {
          let extensoParte = '';
          if (parte < 20) {
            extensoParte = unidades[parte];
          } else if (parte < 100) {
            extensoParte = dezenas[Math.trunc(parte / 10)];
            if (parte % 10 > 0) {
              extensoParte += ' e ' + unidades[parte % 10];
            }
          } else {
            extensoParte = centenas[Math.trunc(parte / 100)];
            if (parte % 100 == 0) {
              extensoParte += '';
            } else if (parte % 100 < 20) {
              extensoParte += ' e ' + unidades[parte % 100];
            } else {
              extensoParte += ' e ' + dezenas[Math.trunc((parte % 100) / 10)];
              if (parte % 10 > 0) {
                extensoParte += ' e ' + unidades[parte % 10];
              }
            }
          }
          if (milhar > 0) {
            extensoParte += ' ' + milhares[milhar];
          }
          if (extenso != '') {
            extenso = ', ' + extenso;
          }
          extenso = extensoParte + extenso;
        }
        numero = Math.trunc(numero / 1000);
        milhar++;
      }
    }

    /* Correções em cem/cento, milhões, bilhões, trilhões, quadrilhões ... */
    /* Correções aplicada em qualquer parte do texto */
    extenso = extenso.replace("cem e", "cento e");
    extenso = extenso.replace("um mil", "mil");
    extenso = extenso.replace("um milhões", "um milhão");
    extenso = extenso.replace("um bilhões", "um bilhão");
    extenso = extenso.replace("um trilhões", "um trilhão");
    extenso = extenso.replace("um quatrilhões", "um quatrilhão");
    extenso = extenso.replace("um quintilhões", "um quintilhão");
    extenso = extenso.replace("um sextilhões", "um sextilhão");
    extenso = extenso.replace("um septilhões", "um septilhão");
    extenso = extenso.replace("um octilhões", "um octilhão");
    extenso = extenso.replace("um nonilhões", "um nonilhão");
    extenso = extenso.replace("um decilhões", "um decilhão");

    return extenso;
  }
