<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SchedulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('schedules')->insert(
            collect(range(1, 10))->map(function () {
                return [
                    'doctor_id' => fake()->numberBetween(1, 10),
                    'day' => fake()->randomElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
                    'start_time' => fake()->time('H:i:s', '08:00:00'),
                    'end_time' => fake()->time('H:i:s', '16:00:00'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );
    }
}
