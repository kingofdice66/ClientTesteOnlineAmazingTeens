<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class RegisterUsers extends Controller
{
    /** Check if the data is valid, if not, don't upload it to database. */
    public function checkDataValidity(array $data): bool
    {
        $boolFlag = true;

        $username = $data["username"];
        $password = $data["password"];
        $email    = $data["email"];

        // ####################################################
        // #######        CHECK USERNAME FIELD          #######
        // ####################################################

        // Check for appropriate characters.
        if (!preg_match("/^[a-zA-Z0-9_-]*$/", $username)) {
            echo "Check for appropriate characters" . "<br>";
            $boolFlag = false;
        }
        // Check if the field is empty.
        else if (preg_match("/^[ ]*$/", $username)) {
            echo "Check if the field empty" . "<br>";
            $boolFlag = false;
        }
        // Username must be between 3 and 30 characters
        else if (!(strlen($username) >= 3 && strlen($username) <= 30)) {
            echo "Username must be between 3 and 30 characters" . "<br>";
            $boolFlag = false;
        }

        // ####################################################
        // #######           CHECK EMAIL FIELD          #######
        // ####################################################

        // Check if the field contains an '@' as all emails should.
        if (!preg_match("/@/", $email)) {
            echo "Check if the field contains an '@' as all emails should" . "<br>";
            $boolFlag = false;
        }

        // ####################################################
        // ####            VERIFY PASSWORD FIELD           ####
        // ####################################################

        // Password length must be between 8 and 30 characters long. Interval[8, 30]
        if (!(strlen($password) >= 8 && strlen($password) <= 30)) {
            echo "Password length must be between 8 and 30 character long. Interval[8, 30]" . "<br>";
            $boolFlag = false;
        }
        // ####################################################

        return $boolFlag;
    }



    private $dateTime = NULL;
    private $tokenExpiration = NULL;

    public function __construct()
    {
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
        $this->tokenExpiration = (new Carbon)->addMinutes(30)->format((new CustomFunctions)->dateTimeFormat());
    }

    public function setData(Request $request)
    {
        $username = trim($request->username);
        $email    = trim($request->email);
        $password = $request->password;

        $data = [
            "username" => $username,
            "email"    => $email,
            "password" => $password,
        ];

        if ($this->checkDataValidity($data)) {
            DB::table("users")
                ->insert([
                    "username"         => $username,
                    "email"            => $email,
                    "password"         => Hash::make($password),
                    "token"            => Str::random(60),
                    "token_expiration" => $this->tokenExpiration,
                    "created_at"       => $this->dateTime,
                ]);
        }
    }
}
