<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class UpdateCourses extends Controller
{
    private $data = NULL;
    private $dateTime = NULL;
    private $courseId = NULL;
    private $subjectId = NULL;
    private $courseName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
        $this->courseId = $this->data["courseId"];
        $this->subjectId = $this->data["subjectId"];
        $this->courseName = $this->data["courseName"];
    }

    public function updateData()
    {
        DB::table("courses")
            ->where([
                ["id", $this->courseId],
                ["subject_id", $this->subjectId],
            ])
            ->update([
                "name" => $this->courseName,
                "updated_at" => $this->dateTime,
            ]);
    }
}