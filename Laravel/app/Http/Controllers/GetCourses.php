<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;

class GetCourses extends Controller
{
    // private $dataArray = NULL;
    private $data = NULL;
    private $subjectId = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->subjectId = $this->data["subjectId"];
    }

    public function getData()
    {
        $this->dataArray = DB::table("courses")->select("name", "id")->where("subject_id", $this->subjectId)->get();

        return $this->dataArray;
    }
}
