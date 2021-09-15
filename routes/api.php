<?php

use App\Http\Controllers\MakeCourseData;
use App\Http\Controllers\SetChapterName;
use App\Http\Controllers\SetCourseName;
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

/** Set the name of the chapter into the database.*/
Route::post("setChapterName", [SetChapterName::class, "setChapterName"]);

/** Get the data from the database like the name of the chapter, quizform etc. for the 'MakeCourse' page.*/
Route::post("getMakeCourseData", [MakeCourseData::class, "getData"]);
