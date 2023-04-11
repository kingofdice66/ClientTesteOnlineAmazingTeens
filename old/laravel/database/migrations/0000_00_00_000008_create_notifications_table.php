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
            $table->tinyText("message")->nullable(); // "nullable" because the user can opt not to write a message when sending a chat request for example. "tinyText" because only a small part of the message will be shown.
            $table->tinyText("type"); // The notification type, like, for example, chat notification, reply notification etc.
            $table->unsignedBigInteger("type_id"); // The id of the message type so we can refer to the original message.
            $table->tinyText("sender_username"); // Senders username.
            $table->unsignedBigInteger("sender_id"); // Senders id.
            $table->foreign("sender_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->unsignedBigInteger("receiver_id"); // The receivers id.
            $table->foreign("receiver_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->boolean("status")->default(false); // "false" if the user hasn't read the notification and "true" if user has read the notification
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
