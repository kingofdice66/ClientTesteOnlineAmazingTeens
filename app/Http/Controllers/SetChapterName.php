<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetChapterName extends Controller
{
    private $data = NULL;
    private $dateTime = NULL;
    private $chapterName = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->chapterName = htmlspecialchars($this->data["chapterName"]);
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /** Set the name of the chapter. */
    public function setChapterName()
    {
        DB::table("chapters")->insert(
            [
                "name" => $this->chapterName,
                "created_at" => $this->dateTime->format($this->dateTimeFormat),
                "course_id" => $this->data["courseID"],
            ]
        );

        $chapterID = DB::table("chapters")->max("id"); // Get the id of the chapter just created.

        return [
            "courseID" => $this->data["courseID"],
            "chapterID" => $chapterID,
        ];
    }
}
