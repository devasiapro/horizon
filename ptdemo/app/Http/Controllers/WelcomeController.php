<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class WelcomeController extends Controller
{
    private Game $game;

    public function __construct(Game $game)
    {
        $this->game = $game;    
    }

    public function __invoke(Request $request)
    {
        $games = $this->game->all();
        $grouped = [];
        foreach ($games as $index => $game) {
            $grouped[floor($index / 6)][] = $game;
        }
        return view('welcome', [
            'games' => $grouped,
        ]);
    }
}
