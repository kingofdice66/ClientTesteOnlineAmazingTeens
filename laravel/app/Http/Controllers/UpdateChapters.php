<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class UpdateChapters extends Controller
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
                ["course_id", $request->courseId],
                ["subject_id", $request->subjectId],
                ["id", $request->chapterId],
            ])
            ->update([
                "name" => $request->chapterName,
                "updated_at" => $this->dateTime,
            ]);
    }
}
