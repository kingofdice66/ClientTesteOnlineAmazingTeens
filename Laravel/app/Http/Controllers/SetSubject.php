<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetSubject extends Controller
{
    private $subjectName = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->subjectName = (new CustomFunctions)->jsonDecode();
        $this->subjectName = trim($this->subjectName);
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /** Set the name of the subject. */
    public function setData()
    {
        DB::table("subjects")->insert([
            "name" => "test", // $this->subjectName,
            "created_at" => $this->dateTime->format($this->dateTimeFormat),
        ]);
    }
}
