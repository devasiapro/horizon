<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use App\Models\Player;

class LogoutController extends Controller
{
    private Player $player;

    public function __construct(Player $player)
    {
        $this->player = $player;
    }

    public function __invoke(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json([], 200);
    }
}

