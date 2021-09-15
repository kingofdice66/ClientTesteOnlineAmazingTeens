<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class MakeCourseData extends Controller
{
    private $data = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
    }

    public function getData()
    {
        $courseID = $this->data["courseID"];
        $chapterID = $this->data["chapterID"];

        $courseName = DB::table("courses")->where("id", $courseID)->value("name");
        $chapterName = DB::table("courses")->where("id", $chapterID)->value("name");

        return [
            "courseName" => $courseName,
            "chapterName" => $chapterName,
        ];
    }
}
