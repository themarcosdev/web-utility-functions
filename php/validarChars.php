<?php
  $validadores = array(
   "ã"=>"a",
   "á"=>"a",
   "à"=>"a",
   "â"=>"a",
   "é"=>"e",
   "è"=>"e",
   "ê"=>"e",
   "í"=>"i",
   "ì"=>"i",
   "î"=>"i",
   "õ"=>"o",
   "ó"=>"o",
   "ô"=>"o",
   "ò"=>"o",
   "ú"=>"u",
   "û"=>"u",
   "ù"=>"u",
   "ç"=>"c",
   "Ã"=>"A",
   "Á"=>"A",
   "À"=>"A",
   "Â"=>"A",
   "É"=>"E",
   "È"=>"E",
   "Ê"=>"E",
   "Í"=>"I",
   "Ì"=>"I",
   "Î"=>"I",
   "Õ"=>"O",
   "Ó"=>"O",
   "Ô"=>"O",
   "Ò"=>"O",
   "Ú"=>"U",
   "Û"=>"U",
   "Ù"=>"U",
   "Ç"=>"C"  
  );

  $frase = "É apenas um teste da função para validar uma frase em português" ;

  /**
   *  Criando uma função para validar/trocar de caracteres inválidos por outros ;
   * */
  function validarChars($string, $validadores){
      foreach (array_keys($validadores) as $i => $val){
          $string = str_replace($val, $validadores[$val], $string);
      }
      return $string ;
  }

  /* Testando */
  echo validarChars($frase, $validadores);
?>
