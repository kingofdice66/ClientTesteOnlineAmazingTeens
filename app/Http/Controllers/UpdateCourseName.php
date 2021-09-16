<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class UpdateCourseName extends Controller
{
    private $data = NULL;
    private $courseID = NULL;
    private $courseName = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->courseID = $this->data["courseID"];
        $this->courseName = $this->data["courseName"];
    }

    public function updateData()
    {
        DB::table("courses")->where("id", $this->courseID)->update(["name" => $this->courseName]);

        return ["CourseName" => "updated successfully", "courseID" => $this->courseID, "courseName" => $this->courseName];
    }
}
