<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetSubjects extends Controller
{
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /** Set the name of the subject. */
    public function setData(Request $request)
    {
        DB::table("subjects")
            ->insert([
                "name" => trim($request->subjectName),
                "created_at" => $this->dateTime->format($this->dateTimeFormat),
            ]);
    }
}
