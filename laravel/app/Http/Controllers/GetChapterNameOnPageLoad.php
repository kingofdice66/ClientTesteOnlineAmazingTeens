<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetChapterNameOnPageLoad extends Controller
{
    private $data = NULL;
    private $courseId = NULL;
    private $subjectId = NULL;
    private $chapterId = NULL;
    private $chapterName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->subjectId = $this->data["subjectId"];
        $this->courseId = $this->data["courseId"];
        $this->chapterId = $this->data["chapterId"];
    }

    public function getData()
    {
        $this->chapterName =
            DB::table("chapters")
            ->select("name")
            ->where([
                ["subject_id", $this->subjectId],
                ["course_id", $this->courseId],
                ["id", $this->chapterId],
            ])
            ->first();

        return $this->chapterName;
    }
}
