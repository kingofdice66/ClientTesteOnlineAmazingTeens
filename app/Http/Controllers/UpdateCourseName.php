<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class UpdateCourseName extends Controller
{
    private $data = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
    }

    public function update()
    {
        $courseID = $this->data["courseID"];
        $courseName = $this->data["courseName"];
        DB::table("courses")->where("id", $courseID)->update(["name" => $courseName]);

        return ["CourseName" => "updated successfully"];
    }
}
