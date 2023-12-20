<?php
declare(strict_types = 1);

namespace App\Traits;

trait RequestUtilities
{
    /**
     * Redirects to a specified route using a POST request.
     *
     * @param string $route The route to redirect to.
     * @param array  $data The data to be sent in the POST request.
     * @param string $postToken The token to be used in the POST request.
     * @return void
     * 
     * @example 
        *  class yourController
        *  {
        *      use RequestUtilities ;
        *      ... 
        *  
        *     public function yourMethod()
        *     {
        *          return RequestUtilities::redirectWithPOST('your-route', $request->input());
        *     }
        *  }
     */
    public static function redirectWithPOST($route, $data, $postToken)
    {
        $token  = session('_token') ?? $postToken;
        $inputs = '';
        if (isset($data)) {
            foreach ($data as $key => $value) {
                $inputs .= '<input type="hidden" name="' . $key . '" value="' . $value . '" >';
            }
        }
        $inputs .= '<input type="hidden" name="_token" value="' . $token . '">';
        $formRedirectHTML = "
            <form method='POST' action='" . $route . "' id='form_redirect_post'>
                $inputs
            </form>
            <script>
                document.getElementById('form_redirect_post').submit();
            </script>
        ";
        echo $formRedirectHTML ;
        exit;
    }
}
