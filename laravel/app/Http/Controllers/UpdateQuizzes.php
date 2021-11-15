<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class UpdateQuizzes extends Controller
{
    private $data = NULL;
    private $dateTime = NULL;
    private $quizForm = NULL;
    private $subjectId = NULL;
    private $courseId = NULL;
    private $chapterId = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
        $this->subjectId = $this->data["subjectId"];
        $this->courseId = $this->data["courseId"];
        $this->chapterId = $this->data["chapterId"];
        $this->quizForm = $this->data["quizStringified"];
    }

    public function updateData()
    {
        DB::table("chapters")
            ->where([
                ["subject_id", $this->subjectId],
                ["course_id", $this->courseId],
                ["id", $this->chapterId],
            ])
            ->update([
                "quiz_form" => $this->quizForm,
                "updated_at" => $this->dateTime,
            ]);
    }
}
