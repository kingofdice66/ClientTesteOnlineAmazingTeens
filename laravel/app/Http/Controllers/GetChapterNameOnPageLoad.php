<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetChapterNameOnPageLoad extends Controller
{
    public function getData(Request $request)
    {
        $chapterName =
            DB::table("chapters")
            ->select("name")
            ->where([
                ["subject_id", $request->subjectId],
                ["course_id", $request->courseId],
                ["id", $request->chapterId],
            ])
            ->first();

        return $chapterName;
    }
}
