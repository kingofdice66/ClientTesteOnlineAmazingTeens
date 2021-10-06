<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('Main');
});

Route::get("ContactForm", function () {
    return view("ContactForm");
});

Route::get("MakeCourse", function () {
    return view("MakeCourse");
});

Route::get("UsersAccount", function () {
    return view("UsersAccount");
});


// ######################################################
// #******           For React Router             ******#
// ######################################################

// ######################################
// #****          Courses           ****#
// ######################################
Route::get("Courses", function () {
    return view("Courses");
});

Route::get("Chapters", function () {
    return view("Courses");
});

Route::get("CourseDescription", function () {
    return view("Courses");
});

Route::get("ChapterDescription", function () {
    return view("Courses");
});

// ######################################################
