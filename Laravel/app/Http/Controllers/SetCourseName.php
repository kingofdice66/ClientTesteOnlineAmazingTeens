<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetCourseName extends Controller
{
    private $data = NULL;
    private $courseName = NULL;
    private $subjectID = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->courseName = $this->data["courseName"];
        $this->courseName = trim($this->courseName);
        $this->subjectID = $this->data["subjectID"];
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /* Set the name of the chapter. */
    public function setData()
    {

        DB::table("courses")->insert([
            "name" => $this->courseName,
            "subject_id" => $this->subjectID,
            "created_at" => $this->dateTime->format($this->dateTimeFormat),
        ]);

        /** Get the courses id, the one just created. */
        $courseID = DB::table("courses")->max("id");

        return ["courseID" =>  $courseID];
    }
}
