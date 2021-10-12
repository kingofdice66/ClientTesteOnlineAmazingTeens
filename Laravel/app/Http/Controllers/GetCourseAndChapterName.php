<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetCourseAndChapterName extends Controller
{
    private $data = NULL;
    private $courseID = NULL;
    private $chapterID = NULL;
    private $chapterName = NULL;
    private $courseName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->courseID = $this->data['courseID'];
        $this->chapterID = $this->data["chapterID"];
        $this->courseName = DB::table("courses")->where("id", $this->courseID)->value("name");
        $this->chapterName = DB::table("chapters")->where([["course_id", $this->courseID], ["id", $this->chapterID]])->value("name");
    }

    public function getData()
    {
        return [
            "courseName" => $this->courseName,
            "chapterName" => $this->chapterName,
            "courseID" => $this->courseID,
            "chapterID" => $this->chapterID,
        ];
    }
}
