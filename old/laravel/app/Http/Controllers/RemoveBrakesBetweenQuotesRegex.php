<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\ForumRegexFunctions;

class RemoveBrakesBetweenQuotesRegex extends Controller
{
    public function getData(Request $request)
    {
        $comment = (new ForumRegexFunctions)->removeBrakesBetweenQuotes($request->comment);

        return $comment;
    }
}
