<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class UpdateQuizForm extends Controller
{
    private $data = NULL;
    private $courseID = NULL;
    private $chapterID = NULL;
    private $quizForm = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->courseID = $this->data["courseID"];
        $this->chapterID = $this->data["chapterID"];
        $this->quizForm = $this->data["quizForm"];
    }

    public function setData()
    {
        DB::table("chapters")->where([["course_id", $this->courseID], ["id", $this->chapterID]])->update(["quiz_form" => $this->quizForm]);

        return [
            "updateQuizForm" => "success",
            "courseID" => $this->courseID,
            "chapterID" => $this->chapterID,
            "quizForm" => $this->quizForm,
        ];
    }
}
