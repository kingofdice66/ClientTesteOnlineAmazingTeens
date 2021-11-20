<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetSubjects extends Controller
{
    private $data = NULL;
    private $subjectName = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->subjectName = $this->data["subjectName"];
        $this->subjectName = trim($this->subjectName);
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    /** Set the name of the subject. */
    public function setData()
    {
        DB::table("subjects")
            ->insert([
                "name" => $this->subjectName,
                "created_at" => $this->dateTime->format($this->dateTimeFormat),
            ]);
    }
}
