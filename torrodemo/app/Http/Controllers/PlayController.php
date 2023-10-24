<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Models\Player;
use App\Models\Game;

class PlayController extends Controller
{
    public function __construct()
    {
    }

    public function __invoke(Request $request)
    {
        return view('game', [
            'token' => $request->get('token'), 
            'game_url' => $request->get('game_url'),
        ]);
    }
}
