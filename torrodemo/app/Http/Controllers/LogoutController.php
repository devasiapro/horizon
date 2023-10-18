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
        $casinoUserId = auth()->user()->casino_user_id;
        auth()->user()->tokens()->delete();

        $hash = md5($casinoUserId . config('torro.secret_key')); 
        $payload = [
            'user_id' => $casinoUserId,
            'hash' => $hash,
        ];
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Content-Length' =>  strlen(json_encode($payload)),
            'X-Api-Key' => config('torro.api_key'),
        ])
        ->withOptions(['verify' => false])
        ->post(config('torro.api_url') . '/api/end-session', $payload);

        return response()->json([], 200);
    }
}

