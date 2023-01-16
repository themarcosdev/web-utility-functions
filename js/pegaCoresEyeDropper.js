    /**
     * @description
     * Função responsável por criar um conta-gotas para pegar uma determinada cor e retornar a cor em hex ;
     * * REFERÊNCIA : https://whatwebcando.today/eye-dropper.html ;
     * @param {string} formaDeRetorno Define a forma como o conta-gotas irá retornar a cor em hex : 'console' || 'alerta' ;
     * @param {string} copiarParaTransferencia Define se área de transferência de cópias (Control+C) deve receber o valor da cor em hex : 'S' || 'N' ;
     * 
     * @example
     * * pegaCoresEyeDropper('alerta','n');
     * * pegaCoresEyeDropper('console','s');
     */
    function pegaCoresEyeDropper(formaDeRetorno, copiarParaTransferencia){
        /* Arrays para Validações */
        let opcoesDeRetorno = ['alerta','console'];
        let opcoesDeCopia = ['s','n'];

        /* Validações */

        /* Validando existência */
        if(!formaDeRetorno){
            formaDeRetorno = 'console';
        }

        if(!copiarParaTransferencia){
            copiarParaTransferencia = 'n';
        }

        /* Validando formaDeRetorno */
        formaDeRetorno = formaDeRetorno.toLowerCase();
        if(!opcoesDeRetorno.includes(formaDeRetorno)){
            formaDeRetorno = 'console';
        }

        /* Validando copiarParaTransferencia */
        formaDeRetorno = formaDeRetorno.toLowerCase();
        if(!opcoesDeCopia.includes(copiarParaTransferencia)){
            copiarParaTransferencia = 'n';
        }

        /* Criando o EyerDropper */
        if (typeof EyeDropper == 'function'){
            let eyeDropper = new EyeDropper();

            alert(`Ao clicar na página será criado um conta-gotas para seleção de cores.\nAo clicar novamente o valor da cor que está focada será exibido através do ${formaDeRetorno}`);
            
            let body = document.body
            
            /* Criando subfunção para inputar uma string na área de transferência de copia|cola */
            const copyToClipboard = string => {
                if (navigator && navigator.clipboard && navigator.clipboard.writeText){
                    return navigator.clipboard.writeText(string);
                } else {
                    return Promise.reject('Erro : Clipboard API não está disponível .');
                }
            };
            
            /* Criando listerner para toda vez que clicar no body da página exibir o conta gotas e retornar a cor em hex */
            body.addEventListener('click', e => {
                eyeDropper.open().then(colorSelectionResult => {
                    /* Tratamento para forma de retorno */
                    if(formaDeRetorno == 'console'){
                        console.log(colorSelectionResult.sRGBHex);
                    } else if (formaDeRetorno == 'alerta'){
                        alert(colorSelectionResult.sRGBHex);
                    }

                    /* Tratamento para copiar para área de transferência */
                    if(copiarParaTransferencia == 's'){
                        copyToClipboard(`${colorSelectionResult.sRGBHex}`);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            });
        } else {
            alert('Erro : Função EyeDropper não encontrada no navegador');
            return false;
        }
    }
