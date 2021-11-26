<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetSubjects extends Controller
{
    public function getData()
    {
        $dataArray =
            DB::table("subjects")
            ->select("name", "id")
            ->orderBy("id", "desc")
            ->get();
        return $dataArray;
    }
}
