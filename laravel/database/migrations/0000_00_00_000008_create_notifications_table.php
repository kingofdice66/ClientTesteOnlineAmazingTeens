<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger("notification_type"); // The types are represented by numbers. For example, number 1 represents emails, number 2 represents replies to a post.
            $table->tinyText("message")->nullable(); // "nullable" because the user can opt not to write a message when sending a chat request for example.
            $table->tinyText("username"); // Senders username.
            $table->unsignedBigInteger("user_id"); // Senders id.
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->boolean("status")->default(false); // "false" if the user hasn't read the notification.
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
        Schema::dropIfExists('notifications');
    }
}
