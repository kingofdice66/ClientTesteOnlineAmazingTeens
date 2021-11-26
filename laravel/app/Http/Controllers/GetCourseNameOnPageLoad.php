<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetCourseNameOnPageLoad extends Controller
{
    public function getData(Request $request)
    {
        $courseName =
            DB::table("courses")
            ->select("name")
            ->where([
                ["subject_id", $request->subjectId],
                ["id", $request->courseId],
            ])
            ->first();

        return $courseName;
    }
}
