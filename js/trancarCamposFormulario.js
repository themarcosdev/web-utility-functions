    const meuForm = document.getElementById("filtro") ;
    /** Função para retornar um array com os nomes campos do Form */
    function getCamposForm(form) {
        let ret_array = [];
        let formData = new FormData(form);
        for (let key of formData.keys()) {
            ret_array.push(key);
        }
        return ret_array;
    }

    const camposForm = getCamposForm(meuForm);
    
    /** Função para travar ou destravar os campos do form */
    function travaDestravaForm(param, form, campos) {
        if (!param) {
            return 'Informe o parâmetro (travar) ou (destravar)';
        }
        let paramValidos = ['travar', 'destravar'];

        if (!paramValidos.includes(param.toLowerCase())) {
            return `O parâmetro ${param} é inválido ! `;
        }

        if (!form) {
            return 'Informe o formulário';
        }
        
        if (!campos) {
            return 'Informe os campos';
        }

        for (campo of campos) {
            if (document.getElementById(campo)) {
                if (param == 'travar') {
                    document.getElementById(campo).disabled = true;
                } else {
                    document.getElementById(campo).disabled = false;
                }
            } else if (document.getElementsByName(campo)) {
                if (param == 'travar') {
                    document.getElementsByName(campo).disabled = true;
                } else {
                    document.getElementsByName(campo).disabled = false;
                }
            }
        }
    }

    travaDestravaForm('travar', meuForm, camposForm) ;
    travaDestravaForm('destravar', meuForm, camposForm) ;
