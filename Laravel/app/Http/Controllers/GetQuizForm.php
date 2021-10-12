<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetQuizForm extends Controller
{
    private $data = NULL;
    private $chapterID = NULL;
    private $courseID = NULL;
    private $quizForm = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->chapterID = $this->data["chapterID"];
        $this->courseID = $this->data["courseID"];
        $this->quizForm = DB::table("chapters")->where([["course_id", $this->courseID], ["id", $this->chapterID]])->value("quiz_form");
    }

    public function getData()
    {
        return [
            "quizForm" => $this->quizForm,
            "chapterID" => $this->chapterID,
            "courseID" => $this->courseID,
        ];
    }
}
