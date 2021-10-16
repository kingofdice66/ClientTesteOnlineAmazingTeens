<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetSubjects extends Controller
{
    private $subjects = NULL;

    public function __construct()
    {
    }

    public function getData()
    {
        return ["GetSubjects" => "success"];
    }
}
