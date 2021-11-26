<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegisterUsers extends Controller
{
    public function setData(Request $request)
    {
        // DB::table("users")
        //     ->insert([
        //         "username" => trim($request->username),
        //         "password" => Hash::make($request->password),
        //     ]);
        return [
            "username" => trim($request->username),
            "password" => $request->password,
        ];
    }
}
