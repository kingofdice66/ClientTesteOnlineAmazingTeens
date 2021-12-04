<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetForumTopicComments extends Controller
{
    public function getData(Request $request)
    {
        $topicComments =
            DB::table("forum_topic_comments")
            ->select(
                "comment",
                "username",
                "created_at",
                "topic_id",
                "user_id",
            )
            ->where("id", $request->id)
            ->get();

        return $topicComments;
    }
}
