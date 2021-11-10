<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;


class SetChapters extends Controller
{
    private $data = NULL;
    private $courseId = NULL;
    private $subjectId = NULL;
    private $chapterName = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->courseId = $this->data["courseId"];
        $this->subjectId = $this->data["subjectId"];
        $this->chapterName = $this->data["chapterName"];
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /** Set the name of the chapter. */
    public function setData()
    {
        DB::table("chapters")->insert(
            [
                "name" => $this->chapterName,
                "created_at" => $this->dateTime->format($this->dateTimeFormat),
                "subject_id" => $this->subjectId,
                "course_id" => $this->courseId,
            ]
        );

        // Get the id of the chapter just created.
        $this->chapterId = DB::table("chapters")->max("id");

        return ["chapterId" => $this->chapterId];
    }
}
