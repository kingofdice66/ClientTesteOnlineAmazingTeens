<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetSubjects extends Controller
{
    private $dataArray = NULL;

    public function __construct()
    {
        //
    }

    public function getData()
    {
        $this->dataArray = DB::table("subjects")->select("name", "id")->orderBy("id", "desc")->get();
        return $this->dataArray;
    }
}
