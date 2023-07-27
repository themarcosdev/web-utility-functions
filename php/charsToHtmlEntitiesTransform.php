<?php
        /**
         * Função responsável por fazer codificação ou decoficação de entidades html em uma string ;
         *
         * @ [string] $string
         * @ [string] $tipo : (codificar, decodificar)
         * @return [string] $string
         */
        function especialCharsReplace($string, $tipo) {
            $tiposValidos = array("codificar", "decodificar");
            
            if(!in_array($tipo, $tiposValidos)) {
                $tipo = "decodificar";
            }

            $charsReplace = array(
                /* --- a --- */
                array("á","&aacute;"),
                array("à","&agrave;"),
                array("â","&acirc;"),
                array("ã","&atilde;"),

                /* --- A --- */
                array("Á","&Aacute;"),
                array("À","&Agrave;"),
                array("Â","&Acirc;"),
                array("Ã","&Atilde;"),
                
                /* --- e --- */
                array("é","&eacute;"),
                array("è","&egrave;"),
                array("ê","&ecirc;"),

                /* --- E --- */
                array("É","&Eacute;"),
                array("È","&Egrave;"),
                array("Ê","&Ecirc;"),
                
                /* --- i --- */
                array("í","&iacute;"),
                array("ì","&igrave;"),
                array("î","&icirc;"),

                /* --- I --- */
                array("Í","&Iacute;"),
                array("Ì","&Igrave;"),
                array("Î","&Icirc;"),
                
                /* --- o --- */
                array("ó","&oacute;"),
                array("ò","&ograve;"),
                array("ô","&ocirc;"),
                array("õ","&otilde;"),

                /* --- O --- */
                array("Ó","&Oacute;"),
                array("Ò","&Ograve;"),
                array("Ô","&Ocirc;"),
                array("Õ","&Otilde;"),
                
                /* --- u --- */
                array("ú","&uacute;"),
                array("ù","&ugrave;"),
                array("û","&ucirc;"),

                /* --- U --- */
                array("Ú","&Uacute;"),
                array("Ù","&Ugrave;"),
                array("Û","&Ucirc;"),
                
                /* --- ç --- */
                array("ç","&ccedil;"),

                /* --- Ç --- */
                array("Ç","&Ccedil;"),
            );
            
            foreach ($charsReplace as $chars) {
                $chave = $chars[0];
                $valor = $chars[1];
                
                if ($tipo == "codificar") {
                    $string = str_replace($chave, $valor, $string) ;
                } else {
                    $string = str_replace($valor, $chave, $string) ;
                }
            }
            
            return $string;
        }
