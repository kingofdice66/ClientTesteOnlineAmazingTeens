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
                "username",
                "user_id",
            )
            ->get();

        return $topics;
    }
}
