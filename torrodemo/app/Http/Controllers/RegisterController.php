<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Http\Requests\RegisterRequest;
use App\Models\Player;

class RegisterController extends Controller
{
    private Player $player;

    public function __construct(Player $player)
    {
        $this->player = $player;
    }

    public function __invoke(RegisterRequest $request): Player
    {
        $username = $request->get('username');
        $casinoUserId = Str::random(8);

        $this->player->username = $username;
        $this->player->password = Hash::make($request->get('password'));
        $this->player->casino_user_id = $casinoUserId;
        $this->player->is_added_to_torro = false;
        $this->player->currency = 'USD';
        $this->player->balance = 1000.00;
        $this->player->save();
        
        $hash = md5($casinoUserId . $username . config('torro.secret_key'));

        $payload = [
            'casino_user_id' => $casinoUserId,
            'username' => $username,
            'hash' => $hash,
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Content-Length' =>  strlen(json_encode($payload)),
            'X-Api-Key' => config('torro.api_key'),
        ])
        ->withOptions(['verify' => false])
        ->post(config('torro.api_url') . '/api/add/user', $payload);
        if ($response->successful()) {
            $this->player->is_added_to_torro = true;
            $this->player->save();
        } else {
            // TODO: Torrospin API fail action
        }

        return $this->player;
    }
}
