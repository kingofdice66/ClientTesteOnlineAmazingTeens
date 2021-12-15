<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\DecodeLoginJWT;
use App\Helpers\CustomFunctions;
use Mews\Purifier\Facades\Purifier;
use Carbon\Carbon;

class SetReplyForumTopicComments extends Controller
{
    private $dateTime = NULL;

    public function __construct()
    {
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
    }

    public function setData(Request $request)
    {
        $decodedJWT = (new DecodeLoginJWT)->decodeJWT($request);

        // Check if everything was ok when JWT(JSON Web Token) was in the process of decoding.
        if ($decodedJWT["message"] !== "ok") {
            return $decodedJWT["message"];
        }

        $JWT_UserId   = $decodedJWT["userId"];
        $JWT_Username = $decodedJWT["username"];

        // Set forum topic comments.
        DB::table("forum_topic_comments")
            ->insert([
                "comment"    => Purifier::clean($request->comment),
                "username"   => $JWT_Username,
                "topic_id"   => $request->topicId,
                "user_id"    => $JWT_UserId,
                "created_at" => $this->dateTime,
            ]);
    }
}
