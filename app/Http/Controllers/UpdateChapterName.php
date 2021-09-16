<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class UpdateChapterName extends Controller
{
    private $data = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
    }

    public function updateData()
    {
        $courseID = $this->data["courseID"];
        $chapterID = $this->data["chapterID"];
        $chapterName = $this->data["chapterName"];
        DB::table("chapters")->where([["course_id", $courseID], ["id", $chapterID]])->update(["name" => $chapterName]);

        return [
            "ChapterName" => "updated successfully",
            "courseID" => $courseID,
            "chapterID" => $chapterID
        ];
    }
}
