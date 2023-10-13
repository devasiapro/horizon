<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use App\Http\Requests\LoginRequest;
use App\Models\Player;

class LoginController extends Controller
{
    private Player $player;

    public function __construct(Player $player)
    {
        $this->player = $player;
    }

    public function __invoke(LoginRequest $request): JsonResponse
    {
        $username = $request->get('username');
        $password = $request->get('password');

        if (Auth::attempt(['username' => $username, 'password' => $password])) {
            $player = $this->player->where('username', '=', $username)->first();
            return response()->json([
                'player' => Auth::user(),
                'token' => $player->createToken('')->plainTextToken,
            ], 200);
        }
        return response()->json([], 401);
    }
}
