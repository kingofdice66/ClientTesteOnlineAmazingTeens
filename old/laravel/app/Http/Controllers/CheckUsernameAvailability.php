<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckUsernameAvailability extends Controller
{
    public function getData(Request $request)
    {
        $exists =
            DB::table("users")
            ->where("username", $request->username)
            ->exists();

        return  ["exists" => $exists];
    }
}
