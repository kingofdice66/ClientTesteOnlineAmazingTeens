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
                "id AS comment_id",
                "comment",
                "username",
                "created_at",
                "topic_id",
                "user_id",
            )
            ->where("topic_id", $request->topicId)
            ->get();

        return $topicComments;
    }
}
