<?php

namespace Tests\Unit;

use Tests\TestCase;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Player;

class ApiGameCloseTest extends TestCase
{
    use RefreshDatabase;

    public function test_game_close(): void
    {
        $this->seed();
        Http::fake([
            config('torro.api_url') . '/api/gameClosed' => Http::response([], 200)
        ]);
        Http::withHeaders([])->post(config('torro.api_url') . '/api/gameClosed');

        $response = $this->postJson('api/game-close', [
            'request_token' => 'thisismytoken',
        ]);

        $response->assertStatus(200);
    }
}
