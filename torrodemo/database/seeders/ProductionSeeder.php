<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Game;

class ProductionSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Game::factory()->create([
            'name' => 'Archer',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Games/Archer.jpg',
            'launch_code' => 'arc',
            'game_type' => 'slot',
        ]);
        Game::factory()->create([
            'name' => 'Dragon Champions',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Games/Dragon%20Champions.jpg',
            'launch_code' => 'drgch',
            'game_type' => 'slot',
        ]);
        Game::factory()->create([
            'name' => '28 Mansions',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Games/28%20Mansions.jpg',
            'launch_code' => 'gpas_28dman_pop',
            'game_type' => 'slot',
        ]);
        Game::factory()->create([
            'name' => 'Age of Egypt',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Games/Age%20of%20Egypt.jpg',
            'launch_code' => 'agoeg',
            'game_type' => 'slot',
        ]);
        Game::factory()->create([
            'name' => 'Bombs',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Games/Bombs%E2%84%A2.jpg',
            'launch_code' => 'gpas_bomaway_pop',
            'game_type' => 'slot',
        ]);

        Game::factory()->create([
            'name' => 'Dragon Tiger',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Live%20Games/Dragon%20Tiger.jpg',
            'launch_code' => 'dtl',
            'game_type' => 'live',
        ]);
        Game::factory()->create([
            'name' => 'Bet On Poker',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Live%20Games/Bet%20On%20Poker.jpg',
            'launch_code' => 'bs_pokl',
            'game_type' => 'live',
        ]);
        Game::factory()->create([
            'name' => 'Roulette',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Live%20Games/Roulette.jpg',
            'launch_code' => 'rol_loungerol',
            'game_type' => 'live',
        ]);
    }
}
