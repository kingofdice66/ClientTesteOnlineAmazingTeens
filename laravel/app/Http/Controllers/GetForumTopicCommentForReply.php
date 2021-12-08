<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetForumTopicCommentForReply extends Controller
{
    public function getData(Request $request)
    {
        $comment =
            DB::table("forum_topic_comments")
            ->where([
                ["topic_id", $request->topicId],
                ["user_id", $request->userId]
            ])
            ->value("comment");

        return $comment;

        // return [
        //     "GetForumTopicCommentForReply" => "success",
        //     "topicId" => $request->topicId,
        //     "userId" => $request->userId,
        //     "comment" => $comment,
        // ];
    }
}
