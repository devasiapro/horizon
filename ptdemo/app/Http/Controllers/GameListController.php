<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GameListController extends Controller
{
    private Game $game;

    public function __construct(Game $game)
    {
        $this->game = $game;    
    }

    public function __invoke(Request $request)
    {
        $games = $this->game->all();
        return $games;
    }
}
