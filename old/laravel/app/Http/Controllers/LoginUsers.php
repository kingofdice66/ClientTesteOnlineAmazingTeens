<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Firebase\JWT\JWT;

class LoginUsers extends Controller
{
    /** Set JWT(JSON Web Token) cookie httpOnly if user has successfully logged in for authorization. */
    public function getJWT(Request $request)
    {
        $expirationTime = 60 * 24; // In minutes. (60min * 24min = 24 hours)

        $DBUsername =
            DB::table("users")
            ->where("username", $request->username)
            ->exists();

        // First check if the username exists in database.
        if (!$DBUsername) {
            return [
                "message"  => "incorrect",
                "username" => "exists"
            ];
        }

        $EmailConfirmed =
            DB::table("users")
            ->where("username", $request->username)
            ->value("email_confirmed");

        // Check if the user has confirmed his email.
        if ($EmailConfirmed !== 1) {
            return ["message" => "email_not_confirmed"];
        }

        $DBPassword =
            DB::table("users")
            ->where("username", $request->username)
            ->value("password");

        // Password does not match. Incorrect password.
        if (!Hash::check($request->password, $DBPassword)) {
            return [
                "message"  => "incorrect",
                "password" => "does not match",
            ];
        }

        $userId =
            DB::table("users")
            ->where("username", $request->username)
            ->value("id");

        // If everything is ok, then send JWT(JSON Web Token) cookie.
        $issuer    = env("JWT_ISS");
        $expireAt  = (new Carbon)->addMinutes($expirationTime)->unix();
        $algorithm = env("JWT_ALG");
        $key       = env("JWT_KEY");

        $payload = [
            "issuer"   => $issuer,
            "expireAt" => $expireAt,
            "username" => $request->username,
            "userId"   => $userId,
        ];

        $jwt = JWT::encode($payload, $key, $algorithm);

        return response("jwt_login")->cookie("jwt_login", $jwt, $expirationTime);
    }
}
