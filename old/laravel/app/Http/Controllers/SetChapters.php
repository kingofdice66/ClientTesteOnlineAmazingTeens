<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;


class SetChapters extends Controller
{
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /** Set the name of the chapter. */
    public function setData(Request $request)
    {
        DB::table("chapters")
            ->insert(
                [
                    "name" => $request->chapterName,
                    "created_at" => $this->dateTime->format($this->dateTimeFormat),
                    "subject_id" => $request->subjectId,
                    "course_id" => $request->courseId,
                ]
            );

        // Get the id of the chapter just created.
        $this->chapterId = DB::table("chapters")->max("id");

        return ["chapterId" => $this->chapterId];
    }
}
