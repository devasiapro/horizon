<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $arr = ['slot', 'live'];
        shuffle($arr);
        return [
            'name' => fake()->word() . ' ' . fake()->word(),
            'thumbnail_url' => fake()->imageUrl(),
            'launch_code' => fake()->word(),
            'game_type' => $arr[0],
        ];
    }
}
