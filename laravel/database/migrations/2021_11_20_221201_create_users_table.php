<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->text("username")->unique();
            $table->text("email")->unique();
            $table->text("password");
            $table->boolean("avatar")->default(0); // 0 if user doesn’t have avatar and 1 if user does.
            $table->text("token")->unique(); // Verification token. The token will be sent to email in the link as a parameter.
            $table->timestamp("expiration_token", 6); // If the user doesn’t verify his email in a certain amount of time, he/she must resend email verification. This is for security purpose.
            $table->timestamps(6);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}