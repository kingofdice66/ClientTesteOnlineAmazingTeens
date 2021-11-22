<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Helpers\CustomFunctions;
use Carbon\Carbon;

class SetUsers extends Controller
{
    private $data = NULL;
    private $username = NULL;
    private $email = NULL;
    private $password = NULL;
    private $hashedPassword = NULL;
    private $token = NULL;
    private $dateTime = NULL;
    private $expiration = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
        $this->username = $this->data["username"];
        $this->email = $this->data["email"];
        $this->password = $this->data["password"];
        $this->hashedPassword = Hash::make($this->password);
        $this->token = Str::random(40); // Generates cryptographically secure pseudo-random bytes. Uses PHP 'random_bytes'
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
        $this->expiration = (new Carbon)->addMinutes(30)->format((new CustomFunctions)->dateTimeFormat()); // Token expires after 30 minutes.
    }

    public function setData()
    {
        DB::table("users")
            ->insert([
                "username" => $this->username,
                "email" => $this->email,
                "password" => $this->hashedPassword,
                "token" => $this->token,
                "created_at" => $this->dateTime,
                "expiration_token" => $this->expiration,
            ]);
    }
}
