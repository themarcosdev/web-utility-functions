<?php

  /**
   * Função para escrever um número por extenso
   * @param [number] $numero
   * @return string
   * */
  function numPorExtenso($numero)
  {
    if (is_numeric(preg_replace("/\D/", "", $numero)))
    {
      $numero = preg_replace("/\D/", "", $numero);
    } else {
      return "Informe um Nro válido";
    }

    $maxNro = 999999999999999999999999999999999999; // 999 decilhões ;
    if ($numero > $maxNro) {
      return "Nro muito grande, limite de ($maxNro) (999 decilhões) !!! ";
    }

    $unidades = array('', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze',
      'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove');
    $dezenas = array('', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa');
    $centenas = array('', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos',
      'oitocentos', 'novecentos');
    $milhares = array('', 'mil', 'milhões', 'bilhões', 'trilhões','quatrilhões','quintilhões', 'sextilhões',
      'septilhões', 'octilhões', 'nonilhões','decilhões');

    $extenso = '';

    if ($numero == 0) {
      $extenso = 'zero';
    } else {
      $milhar = 0;
      while ($numero > 0) {
        $parte = $numero % 1000;
        if ($parte > 0) {
          $extensoParte = '';
          if ($parte < 20) {
            $extensoParte = $unidades[$parte];
          } elseif ($parte < 100) {
            $extensoParte = $dezenas[floor($parte / 10)];
            if ($parte % 10 > 0) {
              $extensoParte .= ' e ' . $unidades[$parte % 10];
            }
          } else {
            $extensoParte = $centenas[floor($parte / 100)];
            if ($parte % 100 == 0) {
              $extensoParte .= '';
            } elseif ($parte % 100 < 20) {
              $extensoParte .= ' e ' . $unidades[$parte % 100];
            } else {
              $extensoParte .= ' e ' . $dezenas[floor(($parte % 100) / 10)];
              if ($parte % 10 > 0) {
                $extensoParte .= ' e ' . $unidades[$parte % 10];
              }
            }
          }
          if ($milhar > 0) {
            $extensoParte .= ' ' . $milhares[$milhar];
          }
          if ($extenso != '') {
            $extenso = ', ' . $extenso;
          }
          $extenso = $extensoParte . $extenso;
        }
        $numero = floor($numero / 1000);
        $milhar++;
      }
    }

    /* Correções em cem/cento, milhões, bilhões, trilhões, quadrilhões ... */
    /* Correções aplicada em qualquer parte do texto */
    $extenso = str_replace("cem e", 		 "cento e", 	   $extenso);
    $extenso = str_replace("um mil", 		 "mil", 	  	   $extenso);
    $extenso = str_replace("um milhões", 	 "um milhão", 	   $extenso);
    $extenso = str_replace("um bilhões", 	 "um bilhão", 	   $extenso);
    $extenso = str_replace("um trilhões", 	 "um trilhão", 	   $extenso);
    $extenso = str_replace("um quatrilhões", "um quatrilhão",  $extenso);
    $extenso = str_replace("um quintilhões", "um quintilhão",  $extenso);
    $extenso = str_replace("um sextilhões",  "um sextilhão",   $extenso);
    $extenso = str_replace("um septilhões",  "um septilhão",   $extenso);
    $extenso = str_replace("um octilhões",   "um octilhão",    $extenso);
    $extenso = str_replace("um nonilhões",   "um nonilhão",    $extenso);
    $extenso = str_replace("um decilhões",   "um decilhão",    $extenso);

    return $extenso;
  }

  /* ex  :
    ./numero-por-extenso.php?nro=999012345678999998 */

  $numero = $_GET['nro'];
  echo $numero;
  echo "<br>";
  echo numPorExtenso($numero);

  /*novecentos e noventa e nove quatrilhões, doze trilhões, trezentos e quarenta ecinco bilhões, seiscentos e setenta e
  oito milhões, novecentos e noventa e nove mil, novecentos e noventa e oito */
