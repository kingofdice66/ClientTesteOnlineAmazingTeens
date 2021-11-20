<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetCourses extends Controller
{
    private $data = NULL;
    private $courseName = NULL;
    private $subjectId = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->courseName = $this->data["courseName"];
        $this->courseName = trim($this->courseName);
        $this->subjectId = $this->data["subjectId"];
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /* Set the name of the chapter. */
    public function setData()
    {

        DB::table("courses")
            ->insert([
                "name" => $this->courseName,
                "subject_id" => $this->subjectId,
                "created_at" => $this->dateTime->format($this->dateTimeFormat),
            ]);

        /** Get the courses id, the one just created. */
        $courseId =
            DB::table("courses")
            ->where("subject_id", $this->subjectId)
            ->max("id");

        return ["courseId" =>  $courseId];
    }
}
