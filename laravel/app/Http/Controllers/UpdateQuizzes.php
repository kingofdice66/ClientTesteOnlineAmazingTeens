<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class UpdateQuizzes extends Controller
{
    private $data = NULL;
    private $quizForm = NULL;
    private $subjectId = NULL;
    private $courseId = NULL;
    private $chapterId = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->subjectId = $this->data["subjectId"];
        $this->courseId = $this->data["courseId"];
        $this->chapterId = $this->data["chapterId"];
        $this->quizForm = $this->data["quiz"];
    }

    public function setData()
    {
        // DB::table("chapters")
        //     ->where([
        //         ["subject_id" => $this->subjectId],
        //         ["course_id" => $this->courseId],
        //         ["id" => $this->chapterId],
        //     ])
        //     ->update(["quiz_form" => $this->quizForm]);

        return ["UpdateQuizzes" => "success"];
    }
}
