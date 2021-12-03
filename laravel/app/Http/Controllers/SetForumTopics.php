<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Mews\Purifier\Facades\Purifier;
use Carbon\Carbon;
use Exception;

class SetForumTopics extends Controller
{
    private $dateTime    = NULL;
    private $currentTime = NULL;

    public function __construct()
    {
        $this->dateTime    = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
        $this->currentTime = (new Carbon)->unix();
    }

    public function setData(Request $request)
    {
        $key       = env("JWT_KEY");
        $algorithm = env("JWT_ALG");
        $jwt_login = $request->cookie("jwt_login");

        // Cookie does not exist.
        if ($jwt_login === NULL) {
            return ["message" => "cookie_not_exist"];
        }

        try {
            $JWT_Decoded = (array) JWT::decode($jwt_login, new Key($key, $algorithm));
        } catch (Exception $e) {
            return ["message" => $e->getMessage()];
        }

        $JWT_Issuer   = $JWT_Decoded["issuer"];
        $JWT_ExpireAt = $JWT_Decoded["expireAt"];
        $JWT_UserId   = $JWT_Decoded["userId"];
        $JWT_Username = $JWT_Decoded["username"];

        // The issuer is not correct.
        if ($JWT_Issuer !== "localhost") {
            return ["message" => "issuer_not_correct"];
        }

        // The cookie has expired.
        if (!($JWT_ExpireAt >= $this->currentTime)) {
            return ["message" => "cookie_expired"];
        }

        // ###########################################################
        // ##########            SET FORUM TOPICS           ##########
        // ###########################################################

        // Set forum topics.
        DB::table("forum_topics")
            ->insert([
                "title"      => htmlspecialchars(trim($request->title)),
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
                "comment"  => Purifier::clean($request->comment),
                "username" => $JWT_Username,
                "topic_id" => $topicId, // The topic id just created.
                "user_id"  => $JWT_UserId,
            ]);
        // ###########################################################

    }
}
