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

Route::get("Courses", function () {
    return view("Courses");
});
