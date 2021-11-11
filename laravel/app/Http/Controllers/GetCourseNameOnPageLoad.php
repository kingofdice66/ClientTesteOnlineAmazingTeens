<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetCourseNameOnPageLoad extends Controller
{
    private $data = NULL;
    private $courseId = NULL;
    private $subjectId = NULL;
    private $courseName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->subjectId = $this->data["subjectId"];
        $this->courseId = $this->data["courseId"];
    }

    public function getData()
    {
        $this->courseName =
            DB::table("courses")
            ->select("name")
            ->where([
                ["subject_id", $this->subjectId],
                ["id", $this->courseId],
            ])
            ->first();

        return $this->courseName;
    }
}
