<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class UpdateChapterName extends Controller
{
    private $data = NULL;
    private $courseID = NULL;
    private $chapterID = NULL;
    private $chapterName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->courseID = $this->data['courseID'];
        $this->chapterID = $this->data['chapterID'];
        $this->chapterName = $this->data['chapterName'];
    }

    public function updateData()
    {

        DB::table("chapters")->where([["course_id", $this->courseID], ["id", $this->chapterID]])->update(["name" => $this->chapterName]);

        return [
            "ChapterName" => "updated successfully",
            "courseID" => $this->courseID,
            "chapterID" => $this->chapterID
        ];
    }
}
