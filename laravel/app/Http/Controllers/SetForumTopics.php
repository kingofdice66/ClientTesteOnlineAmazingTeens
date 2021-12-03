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
    private $dateTime = NULL;

    public function __construct()
    {
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
    }

    public function setData(Request $request)
    {
        $key       = env("JWT_KEY");
        $algorithm = env("JWT_ALG");
        $jwt_login = $request->cookie("jwt_login");

        try {
            $JWTDecoded = (array) JWT::decode($jwt_login, new Key($key, $algorithm));
        } catch (Exception $e) {
            return ["message" => $e->getMessage()];
        }

        // DB::table("forum_topics")
        //     ->insert([
        //         "title"      => htmlspecialchars($request->title),
        //         "comment"    => Purifier::clean($request->comment),
        //         "user_id"    => $JWTDecoded["userId"],
        //         "username"   => $JWTDecoded["username"],
        //         "created_at" => $this->dateTime,
        //     ]);

        return ["SetForumTopics" =>  Purifier::clean($request->comment)];
    }
}
