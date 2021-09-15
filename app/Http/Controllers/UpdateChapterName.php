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

    public function update()
    {
        $courseID = $this->data["courseID"];
        $chapterName = $this->data["chapterName"];
        DB::table("chapters")->where("id", $courseID)->update(["name" => $chapterName]);

        return ["ChapterName" => "updated successfully"];
    }
}
