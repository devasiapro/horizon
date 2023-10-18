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
        ]);
        Game::factory()->create([
            'name' => 'Dragon Champions',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Games/Dragon%20Champions.jpg',
            'launch_code' => 'drgch',
        ]);
        Game::factory()->create([
            'name' => 'Absolutely Mammoth',
            'thumbnail_url' => 'https://demo.horizon88.com/Resized%20Games/Absolutely%20Mammoth!%E2%84%A2.jpg',
            'launch_code' => 'gpas_amammoth_pop',
        ]);
    }
}
