<?php

namespace Tests\Unit;

use Tests\TestCase;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Player;

class ApiLogoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_player_successfully_logout(): void
    {
        $this->seed();
        Http::fake([
            config('torro.api_url') . '/api/end-session' => Http::response([], 200)
        ]);
        Http::withHeaders([])->post(config('torro.api_url') . '/api/end-session');
        $player = Player::factory()->create();
        Sanctum::actingAs($player);
        $response = $this->postJson('api/logout');
        $response->assertStatus(200);
    }
}
