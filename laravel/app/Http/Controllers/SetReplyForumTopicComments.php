<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\DecodeLoginJWT;

class SetReplyForumTopicComments extends Controller
{
    public function setData(Request $request)
    {
        return [
            "SetReplyForumTopicComments" => "success",
            "comment"                    => $request->comment,
            "topicId"                    => $request->topicId,
        ];
    }
}
