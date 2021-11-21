<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetUsers extends Controller
{
    private $data = NULL;
    private $username = NULL;
    private $email = NULL;
    private $token = NULL;
    private $expiration = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->username = $this->data["username"];
        $this->email = $this->data["email"];
        $this->token = Str::random(40); // Generates cryptographically secure pseudo-random bytes. Uses PHP 'random_bytes'
        $this->expiration = (new Carbon)->addMinutes(30)->format((new CustomFunctions)->dateTimeFormat()); // Token expires after 30 minutes.
    }

    public function setData()
    {
        // DB::table("users")
        //     ->insert([
        //         "username" => $this->username,
        //         "email" => $this->email,
        //         "token" => $this->token,
        //         "expiration" => $this->expiration,
        //     ]);

        return [
            "SetUsers" => "success",
            "username" => $this->username,
            "email" => $this->email,
            "token" => $this->token,
            "expiration" => $this->expiration,
        ];
    }
}
