<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\ForumRegexFunctions;

class PreviewTopicComments extends Controller
{
    public function getData(Request $request)
    {
        $request->comment = (new ForumRegexFunctions)->quoteSubstitution($request->comment);

        return $request->comment;
    }
}
