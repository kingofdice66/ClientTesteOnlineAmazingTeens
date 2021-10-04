<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetChapters extends Controller
{
    private $dataArray = NULL;
    private $courseID = NULL;

    public function __construct()
    {
        $this->courseID = (new CustomFunctions)->jsonDecode();
        $this->dataArray = DB::table("chapters")->select("name")->where("course_id", $this->courseID)->get();
    }

    public function getData()
    {
        return ["chapters" => $this->dataArray];
    }
}
