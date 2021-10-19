<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetCourses extends Controller
{
    private $dataArray = NULL;
    private $subjectID = NULL;

    public function __construct()
    {
        $this->subjectID = (new CustomFunctions)->jsonDecode();
        $this->dataArray = DB::table("courses")->select("name", "id")->where("subject_id", $this->subjectID)->get();
    }

    public function getData()
    {
        return [
            "courses" => $this->dataArray,
        ];
    }
}
