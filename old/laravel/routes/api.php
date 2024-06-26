<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UpdateCourses;
use App\Http\Controllers\UpdateChapters;
use App\Http\Controllers\UpdateQuizzes;
use App\Http\Controllers\GetSubjects;
use App\Http\Controllers\GetDraftsNewTopic_Title;
use App\Http\Controllers\GetDraftsNewTopic_Comment;
use App\Http\Controllers\GetCourseNameOnPageLoad;
use App\Http\Controllers\GetChapterNameOnPageLoad;
use App\Http\Controllers\GetForumTopicComments;
use App\Http\Controllers\GetForumTopicCommentsForReply;
use App\Http\Controllers\GetNotifications;
use App\Http\Controllers\GetCourses;
use App\Http\Controllers\GetChapters;
use App\Http\Controllers\GetQuizzes;
use App\Http\Controllers\GetForumTopics;
use App\Http\Controllers\GetChatRequests;
use App\Http\Controllers\SetDraftsNewTopic_Title;
use App\Http\Controllers\SetDraftsNewTopic_Comment;
use App\Http\Controllers\SetReplyForumTopicComments;
use App\Http\Controllers\SetChapters;
use App\Http\Controllers\SetSubjects;
use App\Http\Controllers\SetCourses;
use App\Http\Controllers\SetForumTopics;
use App\Http\Controllers\SetNotifications;
use App\Http\Controllers\SetChatRequests;
use App\Http\Controllers\RegisterUsers;
use App\Http\Controllers\CheckUsernameAvailability;
use App\Http\Controllers\CheckEmailAvailability;
use App\Http\Controllers\EmailVerificationRegistration;
use App\Http\Controllers\LoginUsers;
use App\Http\Controllers\PreviewTopicComments;
use App\Http\Controllers\RemoveBrakesBetweenQuotesRegex;

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

/** Update courses. */
Route::post("updateCourses", [UpdateCourses::class, "updateData"]);

/** Download the name of the course when the appropriate page loads. */
Route::post("getCourseName", [GetCourseNameOnPageLoad::class, "getData"]);

// ######################################################################
// #########                    CHAPTERS                        #########
// ######################################################################

/** Set chapters. */
Route::post("setChapters", [SetChapters::class, "setData"]);

/** Get chapters. */
Route::get("getChapters", [GetChapters::class, "getData"]);

/** Update chapters. */
Route::post("updateChapters", [UpdateChapters::class, "updateData"]);

/** Download the name of the chapter when the appropriate page loads. */
Route::post("getChapterName", [GetChapterNameOnPageLoad::class, "getData"]);

// ######################################################################
// #########                      QUIZZES                       #########
// ######################################################################

/** Get quizzes. */
Route::post("getQuizzes", [GetQuizzes::class, "getData"]);

/** Update quizzes. */
Route::post("updateQuizzes", [UpdateQuizzes::class, "updateData"]);

// ######################################################################
// #########                 DRAFTS NEW TOPIC                   #########
// ######################################################################

/** Set drafts for new topic for the title. */
Route::post("setDraftsNewTopic_Title", [SetDraftsNewTopic_Title::class, "setData"]);

/** Set drafts for new topic for the comment. */
Route::post("setDraftsNewTopic_Comment", [SetDraftsNewTopic_Comment::class, "setData"]);

/** Get drafts for the new topic for the title. */
Route::post("getDraftsNewTopic_Title", [GetDraftsNewTopic_Title::class, "getData"]);

/** Get drafts for the new topic the comment. */
Route::post("getDraftsNewTopic_Comment", [GetDraftsNewTopic_Comment::class, "getData"]);

// ######################################################################
// #########                   REGISTER USERS                   #########
// ######################################################################

/** Register users. */
Route::post("registerUsers", [RegisterUsers::class, "setData"]);

// ######################################################################
// #########                    LOGIN USERS                     #########
// ######################################################################

/** Login users and give a JWT(JSON Web Token) cookie httpOnly for authorization. */
Route::post("loginUsers", [LoginUsers::class, "getJWT"]);

// ######################################################################
// #########             CHECK USERNAME AVAILABILITY            #########
// ######################################################################

/** Check if the username exists in database. */
Route::post("checkUsernameAvailability", [CheckUsernameAvailability::class, "getData"]);

// ######################################################################
// #########              CHECK EMAIL AVAILABILITY              #########
// ######################################################################

/** Check if the email exists in database. */
Route::post("checkEmailAvailability", [CheckEmailAvailability::class, "getData"]);

// ######################################################################
// #########              CHECK IF EMAIL IS VALID               #########
// ######################################################################

/** A token is sent via email to check the users email. That token is verified here. */
Route::post("verifyEmail", [EmailVerificationRegistration::class, "getData"]);

// ######################################################################
// #########                      FORUM                         #########
// ######################################################################

/** Set forum topics. */
Route::post("setForumTopics", [SetForumTopics::class, "setData"]);

/** Get forum topics. */
Route::get("getForumTopics", [GetForumTopics::class, "getData"]);

/** Get forum topic comments. */
Route::post("getForumTopicComments", [GetForumTopicComments::class, "getData"]);

/** Get forum topic comment for replying. */
Route::post("getForumTopicCommentsForRely", [GetForumTopicCommentsForReply::class, "getData"]);

/** Set replied comments.. */
Route::post("setReplyForumTopicComments", [SetReplyForumTopicComments::class, "setData"]);

/** Preview topic comment. */
Route::post("previewTopicComments", [PreviewTopicComments::class, "getData"]);

/** Remove brakes in between 'blockquote' tag. */
Route::post("removeBrakesBetweenQuotesRegex", [RemoveBrakesBetweenQuotesRegex::class, "getData"]);

// ######################################################################
// #########                   NOTIFICATIONS                    #########
// ######################################################################

/** Set notifications. */
Route::post("setNotifications", [SetNotifications::class, "setData"]);

/** Get notifications. */
Route::get("getNotifications", [GetNotifications::class, "getData"]);

// ######################################################################
// #########                   CHAT REQUESTS                    #########
// ######################################################################

/** Set chat requests. */
Route::post("setChatRequests", [SetChatRequests::class, "setData"]);

/** Get chat requests. */
Route::get("getChatRequests", [GetChatRequests::class, "getData"]);
