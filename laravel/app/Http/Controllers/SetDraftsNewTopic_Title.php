<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetDraftsNewTopic_Title extends Controller
{
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;

    public function __construct()
    {
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    public function setData(Request $request)
    {
        // DB::table("drafts_new_topic")->insert([
        //     "name" => $this->title,
        // ]);

        return ["SetDraftsNewTopic_Title" => $request->title];
    }
}
