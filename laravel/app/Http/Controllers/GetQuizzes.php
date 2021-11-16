<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;


class GetQuizzes extends Controller
{
    private $data = NULL;
    private $quizForm = NULL;
    private $chapterId = NULL;
    private $subjectId = NULL;
    private $courseId = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->chapterId = $this->data["chapterId"];
        $this->subjectId = $this->data["subjectId"];
        $this->courseId = $this->data["courseId"];
    }

    public function getData()
    {
        $this->quizForm =
            DB::table("chapters")
            ->where([
                ["subject_id", $this->subjectId],
                ["course_id", $this->courseId],
                ["id", $this->chapterId],
            ])
            ->value("quiz_form");

        return  $this->quizForm;
    }
}
