<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetChapters extends Controller
{
    public function getData()
    {
        $dataArray =
            DB::table("subjects")
            ->select("name", "id")
            ->get();

        return [
            "subjects" => $dataArray,
        ];
    }
}
