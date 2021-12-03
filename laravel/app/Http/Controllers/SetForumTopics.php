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
            $JWTDecoded = (array) JWT::decode($jwt_login, new Key($key, $algorithm));
        } catch (Exception $e) {
            return ["message" => $e->getMessage()];
        }

        $issuer   = $JWTDecoded["issuer"];
        $expireAt = $JWTDecoded["expireAt"];

        // The issuer is not correct.
        if ($issuer !== "localhost") {
            return ["message" => "issuer_not_correct"];
        }

        // The cookie has expired.
        if (!($expireAt >= $this->currentTime)) {
            return ["message" => "cookie_expired"];
        }

        DB::table("forum_topics")
            ->insert([
                "title"      => htmlspecialchars($request->title),
                "comment"    => Purifier::clean($request->comment),
                "user_id"    => $JWTDecoded["userId"],
                "username"   => $JWTDecoded["username"],
                "created_at" => $this->dateTime,
            ]);
    }
}
