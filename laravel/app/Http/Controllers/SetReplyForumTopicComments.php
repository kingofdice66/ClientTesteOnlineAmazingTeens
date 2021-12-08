<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SetReplyForumTopicComments extends Controller
{
    public function setData(Request $request)
    {
        return ["SetReplyForumTopicComments" => "success"];
    }
}
