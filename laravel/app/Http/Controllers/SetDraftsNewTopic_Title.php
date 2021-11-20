<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetDraftsNewTopic_Title extends Controller
{
    private $data = NULL;
    private $title = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;



    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->title = $this->data["title"];
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    public function setData()
    {
        // DB::table("drafts_new_topic")->insert([
        //     "name" => $this->title,
        // ]);

        return ["SetDraftsNewTopic_Title" => $this->title];
    }
}
