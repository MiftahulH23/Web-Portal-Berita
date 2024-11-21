<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\news>
 */
class newsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(), // Judul berita
            'description' => fake()->paragraph(3, true), // Deskripsi berita
            'category' => fake()->word(), // Kategori berita
            'author' => fake()->name(), // Penulis berita
            'created_at' => now(), // Tanggal dibuat
            'updated_at' => now(), // Tanggal diperbarui
        ];
    }
}
