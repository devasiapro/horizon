<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;

use Log;
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
        $response->assertStatus(200);
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

    public function test_username_is_required(): void
    {
        $response = $this->postJson('api/register', [
            'password' => 'testpassword',
        ]);

        $response->assertStatus(422);
        $response->assertSee('The username field is required');
    }

    public function test_password_is_required(): void
    {
        $response = $this->postJson('api/register', [
            'username' => 'usero',
        ]);

        $response->assertStatus(422);
        $response->assertSee('The password field is required');
    }

    public function test_password_must_be_greater_than_8_characters(): void
    {
        $response = $this->postJson('api/register', [
            'username' => 'usero',
            'password' => '1234567',
        ]);

        $response->assertStatus(422);
        $response->assertSee('The password field must be at least 8 characters');
    }

    public function test_password_must_be_less_than_64_characters(): void
    {
        $password = '';

        for ($i = 0; $i < 65; $i++) {
            $password = $password . 'a';
        }

        $response = $this->postJson('api/register', [
            'username' => 'usero',
            'password' => $password,
        ]);

        $response->assertStatus(422);
    }
}
