<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetCourseName extends Controller
{
    private $data = NULL;

    public function __construct()
    {
        $this->data = json_decode(file_get_contents("php://input"), true);
    }

    public function setCourseName()
    {
        $dateTime = new Carbon;
        $dateTimeFormat = (new CustomFunctions)->dateTimeFormat();

        DB::table("courses")->insert([
            "name" => $this->data,
            "created_at" => $dateTime->format($dateTimeFormat),
        ]);

        $courseID = DB::table("courses")->max("id");

        return ["id" =>  $courseID];
    }
}
