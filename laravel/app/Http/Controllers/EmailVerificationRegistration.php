<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class EmailVerificationRegistration extends Controller
{
    public function getData(Request $request)
    {
        // Token from URL to be compared to the database one.
        $URLToken = $request->token;
        // Get current time for comparison with the one in 'token_expiration' database to see if the token has expired.
        $currentTime = (new Carbon)->unix();

        // Check if the respective email exists.
        $DBEmail =
            DB::table("users")
            ->where("email", $request->email)
            ->exists();

        // If email does not exist, possible cause, URL tampering.
        if (!$DBEmail) {
            return ["message" => "invalid_email"];
        }

        $DBToken =
            DB::table("users")
            ->where("email", $request->email)
            ->value("token");

        // Token is set to null in database once user is authenticated.
        if ($DBToken === NULL) {
            return ["message" => "already_verified"];
        }

        // Get the time for when the token expires.
        $DBTokenExpirationTime =
            DB::table("users")
            ->where("email", $request->email)
            ->value("token_expiration_time");

        // Check to see if the token has expired.
        if (!($currentTime <= $DBTokenExpirationTime)) {
            return ["message" => "token_expired"];
        }

        // Compare token from ULR to the one from database. If mismatch, then could be from URL tampering.
        if ($DBToken !== $URLToken) {
            return ["message" => "invalid_token"];
        }

        DB::table("users")
            ->where("email", $request->email)
            ->update([
                "email_confirmed" => 1,
                "token" => NULL,
                "token_expiration_time" => NULL,
            ]);

        return ["message" => "ok"];
    }
}
