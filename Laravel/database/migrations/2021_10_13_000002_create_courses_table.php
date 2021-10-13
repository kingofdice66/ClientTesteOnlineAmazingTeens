<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->text("name");
            $table->mediumText("description")->nullable(); // To be set at a later time.
            // Option to show the respective course to the users or not.
            $table->boolean("show")->default(false);
            $table->unsignedBigInteger("subject_id");
            $table->foreign("subject_id")->references("id")->on("subjects")->onDelete("cascade")->onUpdate("cascade");
            
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
        Schema::dropIfExists('courses');
    }
}
