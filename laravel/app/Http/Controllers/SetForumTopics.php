<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use App\Helpers\DecodeLoginJWT;
use Mews\Purifier\Facades\Purifier;
use Carbon\Carbon;

class SetForumTopics extends Controller
{
    private $dateTime = NULL;

    public function __construct()
    {
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
    }

    public function setData(Request $request)
    {

        // ###########################################################
        // #######     DECODE AND GET INFORMATION FROM JWT     #######
        // ###########################################################

        $decodedJWT = (new DecodeLoginJWT)->decodeJWT($request);

        $JWT_UserId   = $decodedJWT["userId"];
        $JWT_Username = $decodedJWT["username"];

        // ###########################################################
        // ##########            SET FORUM TOPICS           ##########
        // ###########################################################

        // Set forum topics.
        DB::table("forum_topics")
            ->insert([
                "title"      => trim($request->title),
                "user_id"    => $JWT_UserId,
                "username"   => $JWT_Username,
                "created_at" => $this->dateTime,
            ]);

        // ###########################################################
        // ##########           GET FORUM TOPIC ID          ##########
        // ###########################################################

        // Get the topic id, the topic just created.
        $topicId =
            DB::table("forum_topics")
            ->where("user_id", $JWT_UserId)
            ->max("id");

        // ###########################################################
        // ##########        SET FORUM TOPIC COMMENT        ##########
        // ###########################################################

        // Set forum topic comments.
        DB::table("forum_topic_comments")
            ->insert([
                "comment"    => Purifier::clean($request->comment),
                "username"   => $JWT_Username,
                "topic_id"   => $topicId, // The topic id just created.
                "user_id"    => $JWT_UserId,
                "created_at" => $this->dateTime,
            ]);
        // ###########################################################
    }
}
