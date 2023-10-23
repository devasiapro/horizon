<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Game;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiGameList extends TestCase
{
    use RefreshDatabase;

    public function test_fetch_games(): void
    {
        $this->seed();
        $games = Game::factory()->create();
        $response = $this->getJson('api/game');
        $response->assertStatus(200);
    }
}
