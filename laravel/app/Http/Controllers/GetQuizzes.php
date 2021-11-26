<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;


class GetQuizzes extends Controller
{
    public function getData(Request $request)
    {
        $quizForm =
            DB::table("chapters")
            ->where([
                ["subject_id", $request->subjectId],
                ["course_id", $request->courseId],
                ["id", $request->chapterId],
            ])
            ->value("quiz_form");

        return  $quizForm;
    }
}
