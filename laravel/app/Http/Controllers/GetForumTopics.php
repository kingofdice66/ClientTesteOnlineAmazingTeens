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
                "id",
                "title",
                "username",
                "user_id",
                "created_at"
            )
            ->get();

        return $topics;
    }
}
