<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player', function (Blueprint $table) {
            $table->id();
            $table->string('username', 128)->unique();
            $table->string('casino_user_id', 8)->unique();
            $table->string('password', 256);
            $table->boolean('is_added_to_torro')->default(false);
            $table->decimal('balance', 10, 2)->unsigned()->default(0.00);
            $table->string('currency', 45)->default('USD');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player');
    }
};
