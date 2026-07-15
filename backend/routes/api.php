<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpreendimentoController;

Route::get('/status', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString()
    ]);
});

Route::apiResource('empreendimentos', EmpreendimentoController::class);
