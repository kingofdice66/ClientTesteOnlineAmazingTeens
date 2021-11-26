<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class UpdateCourses extends Controller
{
    private $dateTime = NULL;

    public function __construct()
    {
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
    }

    public function updateData(Request $request)
    {
        DB::table("courses")
            ->where([
                ["id", $request->courseId],
                ["subject_id", $request->subjectId],
            ])
            ->update([
                "name" => $request->courseName,
                "updated_at" => $this->dateTime,
            ]);
    }
}
