<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class UpdateQuizzes extends Controller
{
    private $dateTime = NULL;

    public function __construct()
    {
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
    }

    public function updateData(Request $request)
    {
        DB::table("chapters")
            ->where([
                ["subject_id", $request->subjectId],
                ["course_id", $request->courseId],
                ["id", $request->chapterId],
            ])
            ->update([
                "quiz_form" => $request->quizForm,
                "updated_at" => $this->dateTime,
            ]);
    }
}
