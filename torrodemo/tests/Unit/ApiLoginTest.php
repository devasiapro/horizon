<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Player;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_player_successfully_login(): void
    {
        $this->seed();

        $player = Player::factory()->create([
            'username' => 'player1',
            'password' => Hash::make('password'),
        ]);

        $response = $this->postJson('api/login', [
            'username' => $player->username,
            'password' => 'password',
        ]);

        $response->assertStatus(200);
    }

    public function test_username_is_required(): void
    {
        $this->seed();
        
        $response = $this->postJson('api/login', [
            'password' => 'password', 
        ]);

        $response->assertStatus(422);
    }
}
