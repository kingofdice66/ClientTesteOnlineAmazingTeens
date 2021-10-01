<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChaptersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->text("name")->nullable(); // To be set at a later time.
            $table->mediumText("content")->nullable(); // To be set at a later time.
            $table->text("quiz_form")->nullable(); // To be set at a later time.
            /**  
             * Option to show the respective chapter or not. For example, if the
             * chapter is not ready, the user choses to not show the chapter yet. 
             */
            $table->boolean("show")->default(false);
            // The count-down time for the quiz. If the time is up, the quiz finishes.
            $table->unsignedInteger("quiz_countdown_time")->default(0);
            $table->unsignedBigInteger("course_id");
            $table->foreign("course_id")->references("id")->on("courses")->onDelete("cascade")->onUpdate("cascade");
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
        Schema::dropIfExists('chapters');
    }
}
