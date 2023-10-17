<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\MeController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);
Route::middleware('auth:sanctum')->post('/logout', LogoutController::class);
Route::middleware('auth:sanctum')->get('/me', MeController::class);
