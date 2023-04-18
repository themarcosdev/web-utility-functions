  /*
    Função para criar um objeto com todas as chaves de um formulário ;
  */
  function serializaFormObjeto(form) {
    let obj = {};
    let formData = new FormData(form);
    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }
    return obj;
  }
