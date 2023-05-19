<?php
    function eUmDispositivoMobile() {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $mobile_pattern = "/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/";
        $retorno_e_mobile = preg_match($mobile_pattern, $user_agent);
        
        if ($retorno_e_mobile) {
            $msg = "SIM";
        } else {
            $msg = "NAO";
        }
        
        return $msg ;
    }
    
    echo eUmDispositivoMobile() ;

