<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\CustomFunctions;

class GetDatabaseData extends Controller
{
    private $data = NULL;

    public function __construct()
    {
        $this->data = (new CustomFunctions)->jsonDecode();
    }

    public function getCourseAndChapterName()
    {
    }

    public function getRichTextEditorContent()
    {
    }

    public function getQuizForm()
    {
    }

    public function getData()
    {
        if ($this->data["chapterAndName"]) {
            $this->getCourseAndChapterName();
        } else if ($this->data["richTextEditor"]) {
            $this->getRichTextEditorContent();
        } else if ($this->data["quizForm"]) {
            $this->getQuizForm();
        }
    }
}
