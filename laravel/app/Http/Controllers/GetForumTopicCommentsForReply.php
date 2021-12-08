<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetForumTopicCommentsForReply extends Controller
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

        // TODO: Make sure to use forum regex functions here later!

        $comment = <<<REPLY
        <p>[QUOTE="username:{$request->username},post:{$request->commentId},member:{$request->userId}"]</p>
            $comment
        <p>[/QUOTE]</p> 
        REPLY;

        return $comment;
    }
}
