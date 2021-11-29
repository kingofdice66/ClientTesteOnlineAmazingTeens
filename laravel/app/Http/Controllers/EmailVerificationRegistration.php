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
        // Token from database to be compared to the URL one. To be set bellow.
        $DBToken = NULL;
        // Token from URL to be compared to the database one.
        $URLToken = $request->token;
        // Get current time for comparison with the one in 'token_expiration' database to see if the token has expired.
        $currentTime = (new Carbon)->unix();

        // Check if the respective email exists.
        $emailExists =
            DB::table("users")
            ->where("email", $request->email)
            ->exists();

        // If respective email exists, get the token from database corresponding to this email. 
        // If not, possible cause, malformed URL.
        if ($emailExists) {
            $DBToken =
                DB::table("users")
                ->where("email", $request->email)
                ->value("token");
        } else {
            return ["message" => "invalid_email"];
        }

        // Get the time for when the token expires.
        $tokenExpiration =
            DB::table("users")
            ->where("email", $request->email)
            ->value("token_expiration_time");

        if ($tokenExpiration === NULL) {
            return ["message" => "already_verified"];
        }

        // Check to see if the token has expired.
        if (!($currentTime <= $tokenExpiration)) {
            return ["message" => "token_expired"];
        }

        // Compare token from ULR to the one from database.
        // If not, possible cause, malformed URL.
        if ($DBToken === $URLToken) {
            DB::table("users")
                ->where("email", $request->email)
                ->update([
                    "email_confirmed" => 1,
                    "token" => NULL,
                    "token_expiration_time" => NULL,
                ]);
            return ["message" => "ok"];
        } else {
            return ["message" => "invalid_token"];
        }
    }
}
