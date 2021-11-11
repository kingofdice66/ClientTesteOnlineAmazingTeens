<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class UpdateChapters extends Controller
{
    private $data = NULL;
    private $courseId = NULL;
    private $subjectId = NULL;
    private $chapterId = NULL;
    private $chapterName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
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
            ->update(["name" => $this->chapterName]);
    }
}
