<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DoctorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('doctors')->insert(
            collect(range(1, 10))->map(function () {
                return [
                    'name' => fake()->name(),
                    'specialization' => fake()->randomElement(['General', 'Cardiology', 'Dermatology', 'Neurology']),
                    'phone_number' => fake()->numerify(str_repeat('#', random_int(10, 16))),
                    'email' => fake()->unique()->safeEmail(),
                    'password' => bcrypt('password'), // Default password
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );
    }
}
