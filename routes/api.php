<?php

use App\Http\Controllers\GetCourseAndChapterName;
use App\Http\Controllers\GetCorrectAnswersQuiz;
use App\Http\Controllers\GetQuizForm;
use App\Http\Controllers\GetCourses;
use App\Http\Controllers\SetChapterName;
use App\Http\Controllers\SetCourseName;
use App\Http\Controllers\UpdateCourseName;
use App\Http\controllers\UpdateChapterName;
use App\Http\Controllers\UpdateCorrectAnswersQuiz;
use App\Http\Controllers\UpdateQuizForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/** Set the name of the course into the database. */
Route::post("setCourseName", [SetCourseName::class, "setCourseName"]);

/** Set the name of the chapter into the database. */
Route::post("setChapterName", [SetChapterName::class, "setChapterName"]);

/** Get the course and chapter name from the database. */
Route::post("getCourseAndChapterName", [GetCourseAndChapterName::class, "getData"]);

/** Update the name of the course in the database. */
Route::post("updateCourseName", [UpdateCourseName::class, "updateData"]);

/** Update the name of the chapter in the database. */
Route::post("updateChapterName", [UpdateChapterName::class, "updateData"]);

/** Get the quiz form from the database. */
Route::post("getQuizForm", [GetQuizForm::class, "getData"]);

/** Update the quiz form in the database. */
Route::post("updateQuizForm", [UpdateQuizForm::class, "setData"]);

/** Update the correct answers for the quiz. */
Route::post("updateCorrectAnswersQuiz", [UpdateCorrectAnswersQuiz::class, "updateData"]);


/** Get the correct answers for the quiz. */
Route::post("getCorrectAnswersQuiz", [GetCorrectAnswersQuiz::class, "getData"]);

/** Get courses. */
Route::get("getCourses", [GetCourses::class, "getData"]);
