<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetCourses extends Controller
{
    public function getData(Request $request)
    {

        $dataArray =
            DB::table("courses")
            ->select("name", "id")
            ->where("subject_id", $request->subjectId)
            ->orderBy("id", "asc")
            ->get();

        return $dataArray;
    }
}
