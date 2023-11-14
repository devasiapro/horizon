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

    public function ignore_test_request_balance()
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

    public function ignore_test_update_balance()
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

    public function test_refund_balance()
    {
        $this->seed();
        $player = Player::factory()->create([
            "balance" => 100,
        ]);
        $game = Game::factory()->create();

        $hash = md5(
            'refund_balance' .
            $player->casino_user_id .
            10 .
            $game->brand .
            'trx_id' .
            'someToken' .
            'session_id' .
            'game server error' .
            config('torro.secret_key')
        );

        $response = $this->postJson('api/wallet/torrospin', [
            'action' => 'refund_balance',
            'user_id' => $player->casino_user_id,
            'refund' => 10,
            'game_name' => $game->brand,
            'transaction_id' => 'trx_id',
            'token' => 'someToken',
            'session_id' => 'session_id',
            'reason' => 'game server error',
            'hash' => $hash,
        ]);

        $this->assertDatabaseHas('player', [
            'balance' => 110,
            'casino_user_id' => $player->casino_user_id,
        ]);

        $hash = md5(
            true .
            110 .
            'someToken' .
            config('torro.secret_key')
        );

        $response->assertJson([
            'success' => true,
            'balance' => 110,
            'token' => 'someToken',
            'hash' => $hash,
        ]);
    }
}
