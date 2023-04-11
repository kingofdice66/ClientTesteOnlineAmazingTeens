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
    private $token = NULL;
    private $dateTime = NULL;
    private $expiration = NULL;

    public function __construct()
    {
        $this->token = Str::random(40); // Generates cryptographically secure pseudo-random bytes. Uses PHP 'random_bytes'
        $this->dateTime = (new Carbon)->format((new CustomFunctions)->dateTimeFormat());
        $this->expiration = (new Carbon)->addMinutes(30)->format((new CustomFunctions)->dateTimeFormat()); // Token expires after 30 minutes.
    }

    public function setData(Request $request)
    {
        DB::table("users")
            ->insert([
                "username" => trim($request->username),
                "email" => trim($request->email),
                "password" => Hash::make($request->password),
                "token" => $this->token,
                "token_expiration" => $this->expiration,
                "created_at" => $this->dateTime,
            ]);
    }
}
