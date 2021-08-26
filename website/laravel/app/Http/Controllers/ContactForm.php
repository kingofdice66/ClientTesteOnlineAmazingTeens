<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactForm\Form;

class ContactForm extends Controller
{
    private $data = NULL;

    public function __construct()
    {
        $this->data = json_decode(file_get_contents("php://input"), true);
    }
    public function sendEmail()
    {
        Mail::to("example@example.com")->send(new Form($this->data));
    }
}
