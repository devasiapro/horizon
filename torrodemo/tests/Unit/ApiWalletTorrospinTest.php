<?php

namespace Tests\Unit;

use Tests\TestCase;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Player;
use App\Models\Game;

class ApiWalletTorrospinTest extends TestCase
{
    use RefreshDatabase;

    public function test_request_balance()
    {
        $this->seed();
        $player = Player::factory()->create();
        $hash = md5(
            'request_balance' . 
            $player->casino_user_id . 
            'TOKENTOKENTOKEN' . 
            config('torro.secret_key')
        );
        $response = $this->postJson('api/wallet/torrospin', [
            'action' => 'request_balance',
            'user_id' => $player->casino_user_id,
            'token' => 'TOKENTOKENTOKEN',
            'hash' => $hash
        ]);
        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'balance' => $player->balance,
            'user_id' => $player->casino_user_id,
            'token' => 'TOKENTOKENTOKEN',
        ]);
    }

    public function test_update_balance()
    {
        $this->seed();
        $game = Game::factory()->create();
        $player = Player::factory()->create();
        $hash = md5(
            'update_balance' .
            $player->casino_user_id .
            0.10 .
            0.00 .
            $game->launch_code .
            'transactionid' .
            'sessionid' .
            'roundid' .
            'tokentoken' .
            config('torro.secret_key')
        );

        $response = $this->postJson('api/wallet/torrospin', [
            'action' => 'update_balance',
            'user_id' => $player->casino_user_id,
            'bet' => 0.10,
            'win' => 0.00,
            'is_jackpot' => false,
            'game_name' => $game->launch_code,
            'Free_spin' => [
                'win' => 10,
                'played' => 5,
                'remained' => 15,
            ],
            'transaction_id' => 'transactionid',
            'session_id' => 'sessionid',
            'round_id' => 'roundid',
            'token' => 'tokentoken',
            'hash' => $hash,
        ]);

        $response->assertJson([
            'success' => true, 
            'balance' => $player->balance + (0.00 - 0.10),
            'token' => 'tokentoken',
        ]);
        $response->assertStatus(200);
    }
}
