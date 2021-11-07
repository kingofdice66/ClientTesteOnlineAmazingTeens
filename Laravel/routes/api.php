<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetSubjects;
use App\Http\Controllers\GetCourses;
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
/** Set subject. */
Route::post("setSubjects", [SetSubjects::class, "setData"]);

/** Get subjects. */
Route::get("getSubjects", [GetSubjects::class, "getData"]);

// ######################################################################
// #########                    COURSES                         #########
// ######################################################################

/** Set course. */
Route::post("setCourse", [SetCourses::class, "setData"]);

/** Get course. */
Route::post("getCourses", [GetCourses::class, "getData"]);
