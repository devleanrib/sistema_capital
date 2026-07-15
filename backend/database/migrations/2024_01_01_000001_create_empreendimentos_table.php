<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empreendimentos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cidade');
            $table->string('estado', 2);
            $table->decimal('valor_total', 15, 2);
            $table->integer('quantidade_unidades');
            $table->decimal('valor_unidade', 15, 2);
            $table->string('status', 20);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('empreendimentos');
    }
};
