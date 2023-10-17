<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class MeController extends Controller
{
    public function __invoke()
    {
        $player = Auth::user();
        return response()->json([
            'player' => $player,
            'token' => $player->tokens->first()->token,
        ]);
    }
}
