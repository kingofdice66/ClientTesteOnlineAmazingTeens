<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetDraftsNewTopic_Comment extends Controller
{
    private $data = NULL;
    private $comment = NULL;
    private $dateTime = NULL;
    private $dateTimeFormat = NULL;



    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->comment = $this->data["comment"];
        $this->dateTime = new Carbon;
        $this->dateTimeFormat = (new CustomFunctions)->dateTimeFormat();
    }

    public function setData()
    {
        return ["SetDraftNewTopic" => $this->comment];
    }
}
