<?php

namespace Tests\Unit;

use Tests\TestCase;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Player;
use App\Models\Game;

class ApiGameLinkTest extends TestCase
{
    use RefreshDatabase;

    public function test_game_link(): void
    {
        $this->seed();
        Http::fake([
            config('torro.api_url') . '/api/request_link/real' => Http::response([], 201)
        ]);
        Http::withHeaders([])->post(config('torro.api_url') . '/api/request_link/real');

        $player = Player::factory()->create();
        Sanctum::actingAs($player);
        $game = Game::factory()->create();

        $response = $this->postJson('api/game-link', [
            'launch_code' => $game->launch_code,
            'device' => 'desktop', 
        ]);
        $response->assertStatus(200);
    }
}
