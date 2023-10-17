<?php

namespace App\Http\Controllers;

use App\Models\Game;

class GameListController extends Controller
{
    private Game $game;

    public function __construct(Game $game)
    {
        $this->game = $game;
    }

    public function __invoke()
    {
        $games = $this->game->all();

        return response()->json($games->toArray());
    }
}
