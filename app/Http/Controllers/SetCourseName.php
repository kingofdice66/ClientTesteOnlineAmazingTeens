<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetCourseName extends Controller
{
    private $data = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /* Set the name of the chapter. */
    public function setCourseName()
    {
        DB::table("courses")->insert([
            "name" => $this->data,
            "created_at" => $this->dateTime->format($this->dateTimeFormat),
        ]);

        $courseID = DB::table("courses")->max("id");

        return ["courseID" =>  $courseID];
    }
}