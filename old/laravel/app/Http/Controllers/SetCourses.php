<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetCourses extends Controller
{
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /* Set the name of the chapter. */
    public function setData(Request $request)
    {
        DB::table("courses")
            ->insert([
                "name" => trim($request->courseName),
                "subject_id" => $request->subjectId,
                "created_at" => $this->dateTime->format($this->dateTimeFormat),
            ]);

        /** Get the courses id, the one just created. */
        $courseId =
            DB::table("courses")
            ->where("subject_id", $request->subjectId)
            ->max("id");

        return ["courseId" =>  $courseId];
    }
}
