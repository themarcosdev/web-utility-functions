  function verifCookieSessaoPHP() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf('PHPSESSID=') === 0) {
        return true;
      }
    }
    return false;
  }
  
  function criaOuAtualizaCookieSessaoPHP(valor) {
    if (verifCookieSessaoPHP()) {
      /* Atualizar */
      document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setTimeout(()=>{
        document.cookie = `PHPSESSID=${valor};  path=/;`;
      }, 100);
      console.log("atualizar");
    } else {
      /* Criar */
      document.cookie = `PHPSESSID=${valor};  path=/;`;
      console.log("criar");
    }
  }
