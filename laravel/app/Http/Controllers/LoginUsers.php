<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class LoginUsers extends Controller
{
    /** Set JWT(JSON Web Token) cookie httpOnly if user has successfully logged in for authorization. */
    public function getJWT(Request $request)
    {
        $expirationTime = 30;

        $DBUsername =
            DB::table("users")
            ->where("username", $request->username)
            ->exists();

        // First check if the username exists in database.
        if (!$DBUsername) {
            return ["message" => "incorrect"];
        }

        $DBPassword =
            DB::table("users")
            ->where("username", $request->username)
            ->value("password");

        // Password does not match. Incorrect password.
        if (!Hash::check($request->password, $DBPassword)) {
            return ["message" => "incorrect"];
        }

        $userId =
            DB::table("users")
            ->where("username", $request->username)
            ->value("id");

        // If everything is ok, then send JWT cookie.
        $issuer    = env("JWT_ISS");
        $issuedAt  = (new Carbon)->unix();
        $expireAt  = (new Carbon)->addMinutes($expirationTime)->unix();
        $algorithm = env("JWT_ALG");
        $key       = env("JWT_KEY");

        $payload = [
            "iss"      => $issuer,
            "iat"      => $issuedAt,
            "nbf"      => $issuedAt,
            "exp"      => $expireAt,
            "username" => $request->username,
            "userId"   => $userId,
        ];

        $jwt = JWT::encode($payload, $key, $algorithm);

        return response("jwt_login")->cookie("jwt_login", $jwt, $expirationTime);
    }
}
