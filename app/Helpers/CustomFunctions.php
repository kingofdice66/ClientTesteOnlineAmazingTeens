<?php

namespace App\Helpers;

class CustomFunctions
{
    /** Specifies the date and time format: 'Y-m-d H:i:s.u'. */
    public function dateTimeFormat()
    {
        return "Y-m-d H:i:s.u";
    }

    /** Decode json data that is received from the client side: 'json_decode(file_get_contents("php://input"), true)'. */
    public function jsonDecode()
    {
        $jsonDecode = json_decode(file_get_contents("php://input"), true);
        return $jsonDecode;
    }
}
