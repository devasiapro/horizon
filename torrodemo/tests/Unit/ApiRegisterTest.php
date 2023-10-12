<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;
use App\Models\Player;
use Illuminate\Support\Facades\Http;

class ApiRegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_player_sucessfully_register(): void
    {
        $this->seed();
        Http::fake([
            config('torro.api_url') . '/api/add/user' => Http::response([], 201)
        ]);
        Http::withHeaders([])->post(config('torro.api_url') . '/api/add/user');

        $player = (new Player())
            ->where('username', '=', 'TestPlayer')
            ->first();

        $this->assertDatabaseMissing('player', [
            'username' => 'TestPlayer',
        ]);

        $response = $this->postJson('api/register', [
            'username' => 'TestPlayer',
            'password' => 'testpassword',
        ]);

        $this->assertDatabaseHas('player', [
            'username' => 'TestPlayer',
        ]);
        $response->assertStatus(201);
    }

    public function test_username_must_be_unique(): void
    {
        $this->seed();
        Http::fake([
            config('torro.api_url') . '/api/add/user' => Http::response([], 201)
        ]);
        Http::withHeaders([])->post(config('torro.api_url') . '/api/add/user');

        $first_player = Player::factory()->create();
        $this->assertDatabaseCount('player', 1); 

         $response = $this->postJson('api/register', [
            'username' => $first_player->username,
            'password' => 'testpassword',
         ]);

        $this->assertDatabaseCount('player', 1);
        $response->assertStatus(422);
    }
}
