<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\LoginController;

Route::get('/', WelcomeController::class);
Route::post('/web-api/login', LoginController::class);
