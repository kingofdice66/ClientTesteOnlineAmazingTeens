<?php

namespace App\Helpers;

class CustomFunctions
{
    public function dateTimeFormat()
    {
        return "Y-m-d H:i:s.u";
    }

    public function jsonDecode()
    {
        $jsonDecode = json_decode(file_get_contents("php://input"), true);
        return $jsonDecode;
    }
}
