<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\ForumRegexFunctions;

class GetForumTopicCommentsForReply extends Controller
{
    public function getData(Request $request)
    {
        $comment =
            DB::table("forum_topic_comments")
            ->where([
                ["id", $request->commentId],
                ["topic_id", $request->topicId],
                ["user_id", $request->userId]
            ])
            ->value("comment");

        $comment = (new ForumRegexFunctions)->extractCommentsReply($comment);

        $comment = (new ForumRegexFunctions)->removePTags($comment);

        $comment = (new ForumRegexFunctions)->wrapCommentInBlockquote($comment, $request->username, $request->commentId, $request->userId);

        // $comment = <<<REPLY
        // <p>[QUOTE="username:{$request->username},post:{$request->commentId},member:{$request->userId}"]</p>
        //     $comment
        // <p>[/QUOTE]</p>
        // REPLY;

        return $comment;
    }
}
