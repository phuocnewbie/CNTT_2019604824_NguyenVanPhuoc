<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string("full_name");
            $table->string("address");
            $table->string("email");
            $table->string("phone");
            $table->string("gender")->nullable()->default(null);
            $table->string("date_of_birth")->nullable()->default(null);
            $table->string("avatar")->default('images/a986302c6bb2e21c396a98aebf115ffe.png');
            $table->string("username")->nullable()->default(null);
            $table->string("password");
            $table->timestamps();

            $table->string('role_id')->default('r2');
            $table->foreign('role_id')->references('role_id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
};