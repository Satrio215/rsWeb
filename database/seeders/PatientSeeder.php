<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('patients')->insert(
            collect(range(1, 10))->map(function () {
                return [
                    'name' => fake()->name(),       
                    'birth_date' => fake()->date('Y-m-d', '-18 years'),
                    'gender' => fake()->randomElement(['Male', 'Female']),
                    'address' => fake()->address(),
                    'phone_number' => fake()->phoneNumber(),
                    'email' => fake()->unique()->safeEmail(),
                    'password' => bcrypt('password'), 
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );
    }
}
