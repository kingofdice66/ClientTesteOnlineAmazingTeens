<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetForumTopics extends Controller
{
    public function getData()
    {
        $topics = DB::table("forum_topics")
            ->select(
                "title",
                "comment",
                "user_id",
                "username"
            )
            ->get();

        return $topics;
    }
}
