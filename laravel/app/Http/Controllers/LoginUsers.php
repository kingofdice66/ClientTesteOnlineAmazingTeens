<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomFunctions;


class LoginUsers extends Controller
{
    private $data = NULL;
    private $username = NULL;
    private $password = NULL;
    // private $email = NULL; <-- Disabled, for now.

    public function __construct()
    {
        $this->username = $this->data["username"];
        $this->email = $this->data["email"];
        $this->password = $this->data["password"];
    }

    public function checkData()
    {
        // 
    }
}
