<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use App\Models\Player;
use App\Models\Game;

class GameLinkController extends Controller
{
    private Game $game;

    public function __construct(Game $game)
    {
        $this->game = $game;    
    }

    public function __invoke(Request $request)
    {
        $player = auth()->user();
        $token = $player->tokens()->first() ? $player->tokens()->first()->token : '';
        $hash = md5($token .
            $request->get('launch_code') .
            $player->casino_user_id .
            config('torro.bank_id') .
            $player->currency .
            config('torro.quit_link') .
            $request->get('device') .
            'en' .
            0 .
            config('torro.secret_key')
        );

        $payload = [
            'token' => $token,
            'game_name' => $request->get('launch_code'),
            'user_id' => $player->casino_user_id,
            'bank_id' => config('torro.bank_id'),
            'currency' => $player->currency,
            'quit_link' => config('torro.quit_link'),
            'device' => $request->get('device'),
            'lang' => 'en',
            'free_spin' => 0,
            'hash' => $hash,
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Content-Length' =>  strlen(json_encode($payload)),
            'X-Api-Key' => config('torro.api_key'),
        ])
        ->withOptions(['verify' => false])
        ->post(config('torro.api_url') . '/api/request_link/real', $payload);

        if ($response->successful()) {
            return response()->json(json_decode($response->body()));
        } else {
            // TODO: Torrospin API fail action
            return response()->json([
                'message' => $response->body(),
                'status' => $response->status(),
            ]);
        }
    }
}
