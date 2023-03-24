/**
  Função para adicionar rows e cols em um text-area aproveitando o espaço do elemento pai ;
*/
function expandeTextArea(elem_text_area){
    if(elem_text_area.nodeName != 'TEXTAREA'){
        return 'O elemento não é um text area';
    }

    let elemPai = elem_text_area.parentElement ; 

    let elemPai_largura = elemPai.getBoundingClientRect().width ;
    let elemPai_altura  = elemPai.getBoundingClientRect().height ;

    let textarea_largura = elem_text_area.getBoundingClientRect().width ;
    let textarea_altura  = elem_text_area.getBoundingClientRect().height ;

    let podeCallBack = 'N';

    if((textarea_largura) < elemPai_largura - 20 ){
        elem_text_area.cols += 1 ;
        podeCallBack = 'S';
    }

    if((textarea_altura ) < elemPai_altura - 20 ){
        elem_text_area.rows += 1 ;
        podeCallBack = 'S';
    }

    if(podeCallBack == 'S'){
        expandeTextArea(elem_text_area);
    }
}
    
