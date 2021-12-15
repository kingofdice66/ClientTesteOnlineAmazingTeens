<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\ForumRegexFunctions;
use Carbon\Carbon;

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

        foreach ($topicComments as $value) {
            $value->comment =  (new ForumRegexFunctions)->quoteSubstitution($value->comment);
            // $value->created_at = $value->created_at->format("d-m-Y");
            $value->created_at =  Carbon::createFromFormat("Y-m-d H:i:s.u", $value->created_at)->toDateTimeLocalString();
        }

        return $topicComments;
    }
}
