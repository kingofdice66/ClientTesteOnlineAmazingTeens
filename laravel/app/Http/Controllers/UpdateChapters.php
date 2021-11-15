<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class UpdateChapters extends Controller
{
    private $data = NULL;
    private $dateTime = NULL;
    private $courseId = NULL;
    private $subjectId = NULL;
    private $chapterId = NULL;
    private $chapterName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
        $this->courseId = $this->data['courseId'];
        $this->chapterId = $this->data['chapterId'];
        $this->subjectId = $this->data["subjectId"];
        $this->chapterName = $this->data['chapterName'];
    }

    public function updateData()
    {

        DB::table("chapters")
            ->where([
                ["course_id", $this->courseId],
                ["subject_id", $this->subjectId],
                ["id", $this->chapterId],
            ])
            ->update([
                "name" => $this->chapterName,
                "updated_at" => $this->dateTime,
            ]);
    }
}
