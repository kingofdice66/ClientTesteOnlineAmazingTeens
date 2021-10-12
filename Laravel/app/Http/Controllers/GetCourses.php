<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetCourses extends Controller
{
    private $dataArray = NULL;

    public function __construct()
    {
        //
    }

    public function getData()
    {
        $this->dataArray = DB::table("courses")->select("name", "id")->get();

        return [
            "GetCourses" => "success",
            "courses" => $this->dataArray,
        ];
    }
}
