<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetSubjects;
use App\Http\Controllers\GetCourses;
use App\Http\Controllers\GetChapters;
use App\Http\Controllers\SetChapters;
use App\Http\Controllers\SetSubjects;
use App\Http\Controllers\SetCourses;


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




// ######################################################################
// #########                    SUBJECTS                        #########
// ######################################################################

/** Set subjects. */
Route::post("setSubjects", [SetSubjects::class, "setData"]);

/** Get subjects. */
Route::get("getSubjects", [GetSubjects::class, "getData"]);

// ######################################################################
// #########                    COURSES                         #########
// ######################################################################

/** Set courses. */
Route::post("setCourses", [SetCourses::class, "setData"]);

/** Get courses. */
Route::post("getCourses", [GetCourses::class, "getData"]);

// ######################################################################
// #########                    CHAPTERS                        #########
// ######################################################################

/** Set chapters. */
Route::post("setChapters", [SetChapters::class, "setData"]);

/** Get chapters. */
Route::get("getChapters", [GetChapters::class, "getData"]);
