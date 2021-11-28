<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CheckEmailAvailability extends Controller
{
    public function getData(Request $request)
    {
        $exist =
            DB::table("users")
            ->where("email", $request->email)
            ->exists();

        return ["exist" => $exist];
    }
}
