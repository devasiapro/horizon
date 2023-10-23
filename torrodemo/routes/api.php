<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\MeController;
use App\Http\Controllers\GameListController;
use App\Http\Controllers\GameLinkController;
use App\Http\Controllers\GameCloseController;
use App\Http\Controllers\WalletController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);

Route::middleware('auth:sanctum')->post('/logout', LogoutController::class);
Route::middleware('auth:sanctum')->get('/me', MeController::class);

Route::get('game', GameListController::class);
Route::middleware('auth:sanctum')->post('game-link', GameLinkController::class);
Route::post('game-close', GameCloseController::class);

Route::post('wallet/torrospin', WalletController::class);
