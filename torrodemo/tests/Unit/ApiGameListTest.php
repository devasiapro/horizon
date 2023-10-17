<?php

namespace Tests\Unit;

use Tests\TestCase;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Game;

class ApiGameListTest extends TestCase
{
    use RefreshDatabase;

    public function test_fetch_game_list(): void
    {
        $this->seed();

        $games = Game::factory(3)->create();

        $response = $this->getJson('api/game');
        $response->assertStatus(200);
        $response->assertJson($games->toArray());
    }
}
